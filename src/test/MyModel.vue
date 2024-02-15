<template>
  <div class="my-model-container">
    <MyComponent>
      <!-- <div class="box"></div> -->
    </MyComponent>
  </div>
</template>
<script>
import textComponents from "./textComponents";

export default {
  setup() {
    return {};
  },
  components: {
    MyComponent: textComponents.ListMenu,
  },
};
</script>

<style lang="less" scoped>
@import url(~@/assets/color.less);
.my-model-container {
  position: relative;
  height: 80vh;
  width: 80vw;
  box-shadow: 0px 0px 15px 0px #4443;
  // background: #c33838;
  margin-left: 10vw;
  margin-top: 10vh;
  .icon-container {
    font-size: 50px;
    color: #444;
  }
  .box {
    width: 200px;
    height: 120px;
    background: @gray;
    border-radius: 10px;
  }
}
</style>