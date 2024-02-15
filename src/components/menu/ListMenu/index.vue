<template>
  <div
    class="menu-area-container"
    @contextmenu="showMenu"
    ref="container"
    @click="hideMenu"
    v-resize="resizehandle"
  >
    <MenuPage
      :menuData="menuData"
      :pos="pos"
      :show="show"
      ref="page"
      @finish="show = false"
    ></MenuPage>
  </div>
</template>
<script>
import MenuPage from "./MenuPage.vue";
import menuData from "@/components/menu/menu-data";
import { Geometry } from "@/lib";
import { onMounted, provide, reactive, ref, watchEffect } from "vue";
import { resize } from "@/directive";
export default {
  setup() {
    const Container = function () {
      const pos = reactive({
        x: 0,
        y: 0,
      });

      const container = ref(null); // 获取dom

      // 鼠标位置的限制.不能大于这个限制.大于它菜单就显示到限制.
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
    const ShowHideMenu = function () {
      const show = ref(false);
      const showMenu = function (e) {
        e.preventDefault();
        show.value = !show.value;
        const p = Geometry.mouseToScreenPosition(e, container.value);
        pos.x = p.x;
        pos.y = p.y;
      };
      const hideMenu = function () {
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
    };
  },
  name: "MenuArea",
  components: {
    MenuPage,
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
}
</style>