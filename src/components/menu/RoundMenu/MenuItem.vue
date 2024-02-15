<template>
  <div
    class="menu-item-container"
    @click="handleClick"
    :style="stylePos"
    ref="item"
  >
    <icon :type="itemData.icon"></icon>
    {{ itemData.name }}
  </div>
</template>
<script>
import icon from "@/components/icon";
import { computed, onMounted, reactive, ref } from "vue";
export default {
  setup(props, context) {
    const handleClick = () => {};
    const CalcItemGeo = function () {
      return {};
    };
    let ItemGeo = ref({
      width: 0,
      height: 0,
    });
    const item = ref(null);
    onMounted(() => {
      ItemGeo.value = item.value.getBoundingClientRect();
    });
    const stylePos = computed(() => {
      const s = {
        top: -props.pos.y - ItemGeo.value.height / 2 + "px",
        left: props.pos.x - ItemGeo.value.width / 2 + "px",
      };
      return s;
    });
    return { handleClick, stylePos, item };
  },
  components: {
    icon,
  },
  props: {
    itemData: {
      type: Object,
      default: () => {
        return {
          name: "设置",
          icon: "shezhi",
          event: () => {},
          submenu: null,
        };
      },
    },
    //
    pos: {
      type: Object,
      default: () => {
        return {
          x: 100,
          y: 100,
        };
      },
    },
  },
};
</script>

<style lang="less" scoped>
@import url(~@/assets/color.less);
@import url(~@/assets/global.less);

.menu-item-container {
  @height: 37px;
  @padding-l-r: 17px;
  display: inline-block;
  font-size: @font-size;
  color: aliceblue;
  min-width: 50px;
  max-width: 200px;
  user-select: none;
  background: @gray-darker;
  height: @height;
  line-height: @height;
  border-radius: 7px;
  padding-left: @padding-l-r;
  padding-right: @padding-l-r;
  &:hover {
    background: @active-blue;
  }
  .overflow-ellipsis();
}
</style>