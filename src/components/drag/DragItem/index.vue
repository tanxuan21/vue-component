<template>
  <div
    class="drag-item-container"
    v-drag="handleDrag"
    v-drag-resize="handleDragResize"
    :style="{ top: initPos.y - 60 + 'px', left: initPos.x - 100 + 'px' }"
  ></div>
</template>
<script>
import { drag, dragResize } from "@/directive";
export default {
  setup() {
    const setTop_Left = (el, top, left) => {
      el.style.top = top + "px";
      el.style.left = left + "px";
    };
    const handleDrag = (event, mousePos, InnerItemMousePos,el) => {
      setTop_Left(
        el,
        mousePos.y - InnerItemMousePos.y,
        mousePos.x - InnerItemMousePos.x
      );
    };
    const handleDragResize = (e) => {};
    return {
      handleDrag,
      handleDragResize,
    };
  },
  name: "DragItem",
  directives: {
    drag,
    dragResize,
  },
  props: {
    initPos: {
      type: Object,
      default: () => {
        return { x: 0, y: 0 };
      },
    },
  },
};
</script>
<style lang="less" scoped>
.drag-item-container {
  height: 120px;
  width: 200px;
  background-color: rgba(146, 197, 245, 1);
  border: 1px solid;
  border-radius: 5px;
  position: absolute;
}
</style>