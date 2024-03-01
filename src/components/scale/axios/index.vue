<template>
  <canvas
    class="axios-container"
    :style="style"
    v-resize="handleResize"
    ref="axiosContainer"
  ></canvas>
</template>
<script>
import { onMounted, provide, ref } from "vue";
import renderPointMap from "./renderPointMap";
import resize from "@/directive/resize";
const canvasInit = (canvas) => {
  const geo = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  const context = canvas.getContext("2d");
  canvas.width = geo.width * ratio;
  canvas.height = geo.height * ratio;
  context.scale(ratio, ratio);
};
// 坐标系统
export default {
  setup(props) {
    const style = ref({});
    const axiosContainer = ref(null);
    let context = ref(null);
    onMounted(() => {
      context.value = axiosContainer.value.getContext("2d");
      handleResize(axiosContainer.value);
    });
    const handleResize = (el) => {
      canvasInit(el);
      render();
    };
    const render = () => {
      renderPointMap(axiosContainer, props.transform, props.option);
    };
    return {
      style,
      axiosContainer,
      render,
      handleResize,
    };
  },
  props: {
    transform: {
      type: Object,
      default: () => {
        return {
          scale: 1,
          translate: {
            x: 0,
            y: 0,
          },
        };
      },
      required: true,
    },
    geo: {
      type: Object,
      default: () => {
        return {
          width: 0,
          height: 0,
        };
      },
      required: true,
    },
    option: {
      type: Object,
      default: () => {
        return {
          space: 50,
          color: "#eee",
          size: 2,
          displayCenter: true,
          centerColor: "#888",
          centerSize: 4,
        };
      },
    },
  },
  name: "AxiosContainer",
  directives: {
    resize,
  },
};
</script>

<style lang="less" scoped>
@import url(~@/assets/global.less);
@import url(~@/assets/color.less);

.axios-container {
  .full();
  position: absolute;
  @point-size: 5px;
  top: 0;
  left: 0;
}
</style>./renderPointMap