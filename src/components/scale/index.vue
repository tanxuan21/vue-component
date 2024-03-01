<template>
  <div
    class="scale-container"
    @mousewheel="handleMouseWheel"
    v-resize="handleResize"
    ref="container"
  >
    <!-- 虚拟容器没有宽高,永远居中于容器.坐标比较友好 -->
    <div class="virtual-container" :style="stylePos" ref="vContainer">
      <slot></slot>
    </div>
    <axios :transform="transform" :geo="containerGeo" ref="axiosCanvas"></axios>
    <!-- <div
      class="center-point"
      :style="{ top: stylePos.top, left: stylePos.left }"
    ></div> -->
  </div>
</template>
  <script>
import { computed, onMounted, reactive, ref } from "vue";
import { limit_MAX, limit_MIN, map, ratio } from "./scale";
import { resize, drag } from "@/directive";
import { handleMove } from "./handleMove";
import axios from "./axios";
export default {
  setup() {
    let mouseWheelRecord = 0;
    const scale = ref(1);
    const translate = ref({
      x: 0,
      y: 0,
    });
    // 滚动的控制函数
    const handleScroll = (event) => {
      // 获取滚轮滚动的距离
      const delta = event.deltaY || event.detail || event.wheelDelta;
      if (delta > 0) {
        // 放大
        if (mouseWheelRecord + delta > limit_MAX) {
          // 不能再放大了
          mouseWheelRecord = limit_MAX;
        } else {
          mouseWheelRecord += delta;
          scale.value = map(mouseWheelRecord);
        }
      } else {
        // 缩小
        if (mouseWheelRecord + delta < limit_MIN) {
          // 不能再缩小了
          mouseWheelRecord = limit_MIN;
        } else {
          mouseWheelRecord += delta;
          scale.value = map(mouseWheelRecord);
        }
      }
      axiosCanvas.value.render();
    };
    const handleMouseWheel = (event) => {
      handleScroll(event);
    };
    const stylePos = computed(() => {
      const s = {
        transform: `translate(${translate.value.x}px,${translate.value.y}px) scale(${scale.value})`,
        left: `${containerGeo.value.width / 2}px`,
        top: `${containerGeo.value.height / 2}px`,
      };
      return s;
    });
    const containerGeo = ref({
      width: 0,
      height: 0,
    });
    const axiosCanvas = ref(null);
    const handleResize = (el) => {
      const g = el.getBoundingClientRect();
      containerGeo.value = g;
    };
    const container = ref(null);
    const vContainer = ref(null);
    onMounted(() => {
      handleResize(container.value);
      handleMove(container.value, vContainer.value, translate);
    });

    const transform = {
      scale,
      translate,
    };
    console.log(transform);
    return {
      handleMouseWheel,
      stylePos,
      handleResize,
      containerGeo,
      handleMove,
      container,
      vContainer,
      scale,
      axiosCanvas,
      transform,
    };
  },
  name: "ScaleArea",
  directives: {
    resize,
    drag,
  },
  components: {
    axios,
  },
};
</script>
  <style lang="less" scoped>
@import url(~@/assets/global.less);
@import url(~@/assets/color.less);
.scale-container {
  overflow: hidden;
  .full();
  position: relative;
  .virtual-container {
    width: 0;
    height: 0;
    overflow: visible;
    position: relative;
  }
  @center-point-size: 7px;
  .center-point {
    height: @center-point-size;
    width: @center-point-size;
    border-radius: 20px;
    background-color: @gray-darker;
    position: absolute;
    top: calc(-@center-point-size / 2);
    left: calc(-@center-point-size / 2);
  }
}
</style>··