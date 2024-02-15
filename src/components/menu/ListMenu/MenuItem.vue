<template>
  <div
    class="menu-item-container"
    @click="handleClick"
  >
    <icon :type="itemData.icon" ></icon>
    {{ itemData.name }}
    <icon
      :type="itemData.submenu ? 'zhankai' : '-'"
      class="zhankai"
    ></icon>
    <slot></slot>
  </div>
</template>

<script>
import icon from "@/components/icon";
export default {
  setup(props, context) {
    const handleClick = (event) => {
      event.stopPropagation();
      // 没有子菜单,叶子item才允许调用方法.防止乱传参数.
      if (!props.itemData.submenu) {
        props.itemData.event();
        context.emit("finish");
      }
    };
    return {
      handleClick,
    };
  },
  components: {
    icon,
  },
  props: {
    itemData: {
      type: Object,
      default: () => {
        return {
          name: "",
          icon: "",
          event: () => {},
          submenu: null,
        };
      },
    },
  },
};
</script>

<style lang="less" scoped>
@import url(./style);
@import url(@/assets/color.less);
.menu-item-container {
  user-select: none;
  font-size: @font-size;
  height: @item-height;
  color: @font-black;
  border-radius: 4px;
  padding-left: 5px;
  padding-right: 5px;
  line-height: @item-height;
  box-sizing: border-box;
  &:hover {
    color: aliceblue;
    background: @active-blue;
  }
  .icon-container{
    margin-right: 4px;
  }
  .zhankai {
    font-size: @font-size - 6;
    float: right;
    margin-right: 0;
    // color: @font-black;
  }
}
</style>