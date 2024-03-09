<template>
  <div class="drop-down-menu">
    <span class="content" @click="handleClick">
      {{ activeItem }}
      <icon :type="'zhankai3'"></icon>
    </span>
    <div class="menu-page" v-show="IsChoosing">
      <menuItem
        v-for="(item, i) in itemArry"
        :key="i"
        :content="item"
        :isChoose="item === activeItem ? true : false"
        @choose="handleChoose"
      ></menuItem>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import menuItem from "./menuItem.vue";
import icon from "@/components/icon";
export default {
  name: "DrapDownMenu",
  setup(props, content) {
    const IsChoosing = ref(false);
    const activeItem = ref(props.defaultItem);
    const handleClick = function () {
      IsChoosing.value = !IsChoosing.value;
    };
    const handleChoose = (content) => {
      activeItem.value = content;
      IsChoosing.value = false;
    };
    return {
      IsChoosing,
      handleClick,
      handleChoose,
      activeItem,
    };
  },
  components: {
    menuItem,
    icon,
  },
  props: {
    itemArry: {
      type: Array,
      required: true,
    },
    defaultItem: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
@import url(~@/assets/color.less);
.drop-down-menu {
  position: relative;
  color: @font-black;
  @height: 30px;
  @width: 150px;
  @border-width: 2px;
  .content {
    display: inline-block;
    box-shadow: 0 2px 5px 0 darken(@gray, 5%);
    height: @height;
    border: @border-width solid darken(@gray, 10%);
    box-sizing: border-box;
    padding-left: 20px;
    padding-right: 20px;
    line-height: calc(@height - 2 * @border-width);
    border-radius: 7px;
    text-align: center;
    width: auto;
    font-size: 16px;
  }
  .menu-page {
    position: absolute;
    padding: 5px;
    border-radius: 5px;
    background: lighten(@gray, 5%);
    border: 1px solid @gray;
    width: @width;
  }
}
</style>