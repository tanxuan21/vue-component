<template>
  <div class="menu-item-container" @click="handleClick">
    <icon type="tijiaoqueren" :style="{ opacity: isChoose ? 1 : 0 }"></icon>
    <span class="content">{{ content }}</span>
  </div>
</template>
<script>
import icon from "@/components/icon";
export default {
  setup(props, context) {
    const handleClick = () => {
      context.emit("choose", props.content);
    };
    return {
      handleClick,
    };
  },
  name: "menuItem",
  props: {
    content: {
      type: String,
      required: true,
    },
    isChoose: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  components: {
    icon,
  },
};
</script>
<style lang="less" scoped>
@import url(~@/assets/color.less);
.menu-item-container {

  font-size: 14px;
  padding: 2px;
  padding-left: 7px;
  .icon-container {
    font-size: 12px;
  }
  &:hover {
    background: @ui-blue;
    border-radius: 3px;
    color: aliceblue;
  }
  .content {
    margin-left: 5px;
  }
}
</style>