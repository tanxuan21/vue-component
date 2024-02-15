<template>
  <div
    class="menu-page-container"
    :class="{ show, 'root-page': level == 1, init }"
    ref="page"
    :style="stylePos"
    @finish="$emit('finish')"
  >
    <MenuItem
      v-for="item in menuData"
      :key="item.name"
      :itemData="item"
      @mouseenter="mouseenterHandle"
      @finish="$emit('finish')"
    >
      <MenuPage
        v-if="item.submenu"
        :menuData="item.submenu"
        :level="level + 1"
        :pos="subPos"
        @finish="$emit('finish')"
      ></MenuPage>
    </MenuItem>
  </div>
</template>
<script>
import {
  computed,
  defineComponent,
  ref,
  inject,
  onMounted,
  reactive,
} from "vue";
import MenuItem from "./MenuItem";
export default defineComponent({
  setup(props) {
    const ConstData = {
      itemHeight: 25,
    };
    function CalcSubPos() {
      const subPos = reactive({
        x: 12345,
        y: 54321,
      });
      const mouseenterHandle = (e) => {
        const g = e.target.getBoundingClientRect();
        subPos.x = g.x + g.width - containerGeo.value.x;
        subPos.y = g.y + g.height - containerGeo.value.y;
      };
      return { subPos, mouseenterHandle };
    }
    function CalcPageGeo() {
      // 这就是一个常量不需要响应式.

      let pageGeo = ref({
        width: 210,
        height: (props.menuData.length + 1) * ConstData.itemHeight,
      });
      const page = ref(null);
      let init = ref(true);
      onMounted(() => {
        pageGeo.value = page.value.getBoundingClientRect();
        init.value = false;
      });
      return {
        page,
        pageGeo,
        init,
      };
    }

    // 菜单几何限制,依赖于父container传递进来的Rect对象
    const containerGeo = inject("MenuArea:containerGeo");

    const { mouseenterHandle, subPos } = CalcSubPos();
    const { pageGeo, page, init } = CalcPageGeo();
    // 计算得到这个page的限制.
    const limit = computed(() => {
      const lmt = {
        x: containerGeo.value.width - pageGeo.value.width,
        y: containerGeo.value.height - pageGeo.value.height,
      };
      return lmt;
    });

    const stylePos = computed(() => {
      // 一级菜单
      if (props.level === 1) {
        const s = {
          translate: `0 0`,
          top: props.pos.y + "px",
          left: props.pos.x + "px",
        };
        if (props.pos.x > limit.value.x) {
          s.left = limit.value.x + "px";
        }
        if (props.pos.y > limit.value.y) {
          s.top = limit.value.y + "px";
        }
        return s;
      }
      // 其他级别的菜单
      else {
        const translateValue = {
          x: pageGeo.value.width - 25,
          y: -ConstData.itemHeight,
        };
        // 横向的,
        // 超过就甩到左边
        if (props.pos.x > limit.value.x) {
          translateValue.x = -pageGeo.value.width - 5;
        }
        // 超过就保证底部贴紧容器下边缘
        if (props.pos.y > limit.value.y) {
          translateValue.y = -(
            pageGeo.value.height -
            (containerGeo.value.height - props.pos.y)
          );
        }
        return {
          transform: `translate(${translateValue.x}px, ${translateValue.y}px)`,
        };
      }
    });

    return {
      stylePos,
      limit,
      pageGeo,
      page,
      init,
      subPos,
      mouseenterHandle,
    };
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
    // 控制显示的.不能使用v-show.我要显式的设置为block
    show: {
      type: Boolean,
      default: false,
    },
  },
  name: "MenuPage",
  components: {
    MenuItem,
  },
});
</script>
<style lang="less" scoped>
@import url(./style.less);
@import url(@/assets/color.less);
@import url(@/assets/global.less);
.menu-page-container {
  width: @page-width;
  background: @gray;
  min-height: @item-height;
  border-radius: 5px;
  padding: @menu-page-padding-top-down;
  padding-left: @menu-page-padding-left-right;
  padding-right: @menu-page-padding-left-right;
  display: none;
  //   translate: @translate-x-right @translate-y-top;
  position: absolute;
  z-index: @infinite;
  box-shadow: 1px 1px 8px 0px #4446;
  .menu-item-container:hover > :last-child {
    display: block;
  }
  &.show {
    display: block;
  }
  // 单纯是为了获取几何属性的
  &.init {
    display: block;
  }
}
</style>