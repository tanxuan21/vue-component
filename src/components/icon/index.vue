<template>
  <span
    v-if="type !== '_null_'"
    class="icon-container iconfont"
    :class="calcClassList()"
  ></span>
</template>

<script>
export default {
  setup(props) {
    const calcClassList = () => {
      if (!props.type || props.type === "block") {
        return {
          'block': true,
          "icon-qita": true,
        };
      }
      const className =  `icon-${props.type}`;
      return className;
    };
    return { calcClassList };
  },
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  name: "IconFont",
};
</script>

<style lang="less" scoped>
@import url(./icon-ALiBaBa/iconfont.css);
.icon-container {
  font-size: inherit;
  color: inherit;
  &.block {
    opacity: 0;
  }
}
</style>