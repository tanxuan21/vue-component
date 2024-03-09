<template>
  <div class="container">
    <DrawerMenu>
      <div style="padding: 10px">
        <Switch></Switch>
        <Switch></Switch>
        <DrapDownMenu
          :itemArry="['item1', 'item2', 'item3', 'item4']"
          :defaultItem="'item1'"
        ></DrapDownMenu>
        <SliderBar :content="'菜单'"></SliderBar>
        <SliderBar :content="'菜单'"></SliderBar>
        <SliderBar :content="'菜单'"></SliderBar>
        <SliderBar :content="'菜单'"></SliderBar>
      </div>
    </DrawerMenu>
    <DrawerMenu>
      <div style="padding: 10px; height: 200px">
        <Switch></Switch>
        <Switch></Switch>
        <SliderBar :content="'菜单'"></SliderBar>
      </div>
      <DrawerMenu>
        <DrawerMenu>
          <div style="padding: 10px; height: 100px">
            <SliderBar :content="'菜单'"></SliderBar>
            <SliderBar :content="'菜单'"></SliderBar>
          </div>
        </DrawerMenu>
        <div style="padding: 10px; height: 100px"></div>
      </DrawerMenu>
      <div style="padding: 10px; height: 100px"></div>
    </DrawerMenu>
    <DrawerMenu>
      <div style="padding: 10px; height: 100px"></div>
    </DrawerMenu>
    <DrawerMenu>
      <div style="padding: 10px; height: 100px"></div>
    </DrawerMenu>
  </div>
</template>

<script>
import DrawerMenu from "./";
import DrapDownMenu from "@/components/menu/DrapDownMenu";
import Switch from "@/components/switch";
import SliderBar from "@/components/SliderBar";
export default {
  setup(props) {
    return {};
  },
  components: {
    DrawerMenu,
    SliderBar,
    Switch,
    DrapDownMenu,
  },
  name: "textContainer",
};
</script>

<style lang="less" scoped>
@import url(~@/assets/global.less);
@import url(~@/assets/color.less);
.container {
  .full();
}
</style>
