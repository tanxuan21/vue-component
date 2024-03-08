<template>
  <div class="switch-container" :class="{ active: status }" @click="switchStatus">
    <div class="button" ></div>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  setup() {
    const status = ref(false);
    function switchStatus() {
      status.value = !status.value;
    }
    return {
      switchStatus,
      status,
    };
  },
  name: "SwitchButton",
};
</script>

<style lang="less" scoped>
@import url(~@/assets/color.less);
@import url(~@/assets/global.less);
.switch-container {
    display: inline-block;
    margin: 10px;
  @size: 20px;
  @padding:calc(@size / 8);
  @transition-time: 0.3s;
  padding: @padding;
  width: @size * 2.6;
  background: @gray;
  border-radius: 10000px;
  transition: @transition-time;
  &.active {
    background: @ui-blue;
    .button {
      margin-left: calc(@size * 1.6 - @size/4);
    }
  }
  .button {
    transition: @transition-time;
    background: #fff;
    width: @size;
    height: @size;
    outline: none;
    border: none;
    border-radius: 100000px;
  }
}
</style>