<template>
  <div
    class="drag-area-container"
    ref="dragContainer"
    name="DragAreaContainer"
    @keydown="handleKeyDown"
    @dblclick="handleCreateItem"
    tabindex="0"
  >
    <div class="scale-layer-container" name="ScaleLayerContainer">
      <DragItem
        v-for="item in itemList"
        :key="item.key"
        :initPos="item.initPos"
      ></DragItem>
    </div>
  </div>
</template>
<script>
import DragItem from "../DragItem";
import { onMounted, ref } from "vue";
import { Geometry, Random } from "@/lib";
export default {
  setup() {
    const dragContainer = ref(null);
    onMounted(() => {
      dragContainer.value.focus();
    });
    const handleKeyDown = (event) => {
      if (event.key === "Tab") {
        event.preventDefault();
      }
    };

    const handleCreateItem = (event) => {
      // 创建一个item.
      const initPos = Geometry.mouseToScreenPosition(
        event,
        dragContainer.value
      );
      itemList.value.push({
        key: Random.randomKey(20),
        initPos,
      });
    };
    const itemList = ref([]);
    return {
      dragContainer,
      handleKeyDown,
      itemList,
      handleCreateItem,
    };
  },
  name: "DragArea",
  components: {
    DragItem,
  },
};
</script>

<style lang="less" scoped>
@import url(~@/assets/color.less);
@import url(~@/assets/global.less);
.drag-area-container {
  overflow: hidden;
  outline: none;
  .full();
  position: relative;
  .drag-item-container {
    position: absolute;
  }
}
</style>