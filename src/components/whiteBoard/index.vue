<template>
  <div class="white-board-container">
    <ImageLooker
      :srcData="'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fcc161dee-9b86-43bd-aeb5-7400f8f02b68%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1709555165&t=0d261f1e204077a3d59c346d364c93d8'"
    />
    <canvas class="hand-write-buffer"></canvas>
  </div>
</template>
<script>
import ImageLooker from "./ImageLooker.vue";
import { onMounted, ref } from "vue";
import abs from "./pen";
// 引入pressure库
const Pressure = require("pressure");
export default {
  setup() {
    const name = "pressure-container";
    const msg = ref("我的组件");
    onMounted(() => {
      console.log(Pressure);
      console.log(abs);
    });
    return {
      name,
      msg,
    };
  },
  components: {
    ImageLooker,
  },
  name: "pressure-container",
};
</script>
<style lang="less" scoped>
.white-board-container {
  width: 100%;
  height: 100%;
  position: relative;
  .image-looker-container {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
  .hand-write-buffer {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }
}
</style>