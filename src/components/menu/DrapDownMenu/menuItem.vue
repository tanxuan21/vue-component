<template>
  <div class="menu-item-container" @click="handleClick">
    <icon type="zhankai" v-show="isChoose"></icon>
    {{ content }}
  </div>
</template>
<script>
import icon from "@/components/icon";
export default {
  setup(props, context) {
    const handleClick = () => {
        context.emit("choose",props.content);
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
.menu-item-container{
    .icon-container{
        font-size: 8px;
    }
}
</style>