<template>
  <div
    class="menu-area-container"
    @contextmenu="showMenu"
    ref="container"
    @mouseup="hideMenu"
    @mousemove="mouseMoveHandle"
    v-resize="resizehandle"
  >
    <RoundMenu
      :menuData="menuData"
      :pos="pos"
      :show="show"
      :mousePos="mousePos"
      ref="page"
      @finish="show = false"
    ></RoundMenu>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="geo.width"
      :height="geo.height"
      :class="{ hide: !show }"
    >
      <line
        :x1="pos.x"
        :y1="pos.y"
        :x2="mousePos.x"
        :y2="mousePos.y"
        stroke="#888"
        stroke-width="4"
      />
    </svg>
  </div>
</template>
<script>
import RoundMenu from "./RoundMenu";
import menuData from "@/components/menu/menu-data";
import { Geometry } from "@/lib";
import { computed, onMounted, provide, reactive, ref } from "vue";
import { resize } from "@/directive";

export default {
  setup() {
    const Container = function () {
      const container = ref(null); // 获取dom
      const pos = reactive({
        x: 0,
        y: 0,
      });
      const page = ref(null);
      let geo = ref({ x: 123, y: 456 });
      const resizehandle = (el) => {
        geo.value = el.getBoundingClientRect();
      };
      // 提供给子page使用
      provide("MenuArea:containerGeo", geo);
      onMounted(() => {
        resizehandle(container.value);
      });
      return { container, pos, page, geo, resizehandle };
    };

    const { container, pos, page, geo, resizehandle } = Container();
    const Mouse = function () {
      const mousePos = reactive({
        x: 0,
        y: 0,
      });
      provide("MenuArea:mousePos",mousePos);
      const allowMove = ref(true);
      const mouseMoveHandle = function (event) {
        if (allowMove.value) {
          const p = Geometry.mouseToScreenPosition(event, container.value);
          mousePos.x = p.x;
          mousePos.y = p.y;
        }
      };
      return {mouseMoveHandle, allowMove, mousePos };
    };
    const {mouseMoveHandle, allowMove, mousePos } = Mouse();
    const ShowHideMenu = function () {
      const show = ref(false);
      const showMenu = function (e) {
        e.preventDefault();
        allowMove.value = true;
        show.value = !show.value;
        const p = Geometry.mouseToScreenPosition(e, container.value);
        pos.x = p.x;
        pos.y = p.y;
      };
      const hideMenu = function () {
        allowMove.value = false;
        show.value = false;
      };
      return {
        show,
        showMenu,
        hideMenu,
      };
    };
    const { show, showMenu, hideMenu } = ShowHideMenu();

    return {

      menuData,
      showMenu,
      show,
      pos,
      container,
      hideMenu,
      resizehandle,
      geo,
      page,
      mouseMoveHandle,
      allowMove,
      mousePos,
    };
  },
  name: "MenuArea",
  components: {
    // ListMenu,
    RoundMenu,
  },
  directives: {
    resize,
  },
};
</script>

<style lang="less" scoped>
.menu-area-container {
  width: 100%;
  height: 100%;
  position: relative;
  .hide {
    display: none;
  }
}
</style>