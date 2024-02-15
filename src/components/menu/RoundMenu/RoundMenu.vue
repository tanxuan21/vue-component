<template>
  <div class="round-menu-container" :style="stylePos" :class="{ show, init }">
    <div class="point"></div>
    {{ ChoosedIndex }}
    <MenuItem v-for="item in posArr" :key="item" :pos="item"></MenuItem>
  </div>
</template>
<script>
import { computed, onMounted, ref, inject } from "vue";
import CalcPageGeo from "./CalcCirclePos";
import MenuItem from "./MenuItem.vue";
export default {
  setup(props, context) {
    const stylePos = computed(() => {
      return {
        top: props.pos.y + "px",
        left: props.pos.x + "px",
      };
    });
    const posArr = CalcPageGeo(5, 100, 1.3);
    const mousePos = inject("MenuArea:mousePos");
    const ChoosedIndex = computed(() => {
      const angle = Math.atan2(
        -mousePos.y + props.pos.y,
        mousePos.x - props.pos.x
      );
      let index = 123;
      return index;
    });
    let init = ref(true);
    onMounted(() => {
      init.value = false;
    });
    return {
      posArr,
      stylePos,
      init,
      ChoosedIndex,
    };
  },
  name: "RoundMenu",
  components: {
    MenuItem,
  },
  props: {
    // 数据,元素是对象
    menuData: {
      type: Array,
      required: true,
    },
    // 菜单层级.
    level: {
      default: 1,
      type: Number,
    },
    // 传递一个向量
    pos: {
      type: Object,
      default: function () {
        return {
          x: -1,
          y: -1,
        };
      },
    },
    mousePos: {
      type: Object,
      default: function () {
        return {
          x: -1,
          y: -1,
        };
      },
    },
    // 控制显示的.不能使用v-show.我要显式的设置为block
    show: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="less" scoped>
@import url(~@/assets/color.less);
.round-menu-container {
  position: absolute;
  width: 0;
  height: 0;
  display: none;
  .point {
    position: absolute;
    left: -5px;
    top: -5px;
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background: @gray;
  }
  &.show {
    display: block;
  }
  &.init {
    display: block;
  }
  .menu-item-container {
    position: absolute;
  }
}
</style>