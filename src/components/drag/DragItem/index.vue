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
    const handleDrag = (e, mousePos, InnerItemMousePos) => {};
    const handleDragResize = (e) => {

    };
    return {
      handleDrag,handleDragResize
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