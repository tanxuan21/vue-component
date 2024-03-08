<template>
  <div class="container">
    <DrapDownMenu
      :itemArry="menuArry"
      :defaultItem="menuArry[4]"
    ></DrapDownMenu>
  </div>
</template>
<script>
import DrapDownMenu from "./";
export default {
  setup(props) {
    const menuArry = [
      "item1",
      "item2",
      "item3",
      "item4",
      "item5",
      "item6",
      "item7",
    ];
    return {
      menuArry,
    };
  },
  name: "TextContainer",
  components: {
    DrapDownMenu,
  },
};
</script>

<style lang="less" scoped>
@import url(~@/assets/global.less);
@import url(~@/assets/color.less);
.container {
  .full();
}
</style>