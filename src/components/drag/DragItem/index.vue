<template>
  <div
    class="drag-item-container"
    v-drag="handleDrag"
    :style="{top:initPos.y-60+'px',left:initPos.x-100+'px'}"
  ></div>
</template>
<script>
import { drag } from "@/directive";
import { ref } from "vue";
export default {
  setup() {
    const handleDrag = (e, mousePos, InnerItemMousePos) => {};

    return {
      handleDrag,
    };
  },
  name: "DragItem",
  directives: {
    drag,
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
  background-color: rgba(146, 197, 245, 0.705);
  border-radius: 5px;
  position: absolute;
}
</style>