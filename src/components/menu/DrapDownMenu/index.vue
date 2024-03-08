<template>
  <div class="drop-down-menu">
    <div class="content" @click="handleClick">
      {{ activeItem }}
    </div>
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
  @height: 30px;
  .content {
    height: @height;
  }
  .menu-page{
    border: 1px solid;
    border-radius: 5px;
    background: @gray;
  }
}
</style>