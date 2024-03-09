<template>
  <div class="my-model-container">
    <MyComponent></MyComponent>
  </div>
</template>
<script>
import textComponents from "./textComponents";

export default {
  setup() {
    const addHeight = (h) => {
      console.log(h);
    };
    return { addHeight };
  },
  components: {
    MyComponent: textComponents.DrawerMenu,
  },
};
</script>

<style lang="less" scoped>
@import url(~@/assets/color.less);
.my-model-container {
  position: relative;
  padding: 30px;
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