<template>
  <div class="slider-bar-container">
    <span>{{ content }}</span>
    <span class="control">
      <span
        class="bar"
        @mousedown="handleBeginDrag"
        @mousemove="drag"
        @mouseleave="handleExitDrag"
        @mouseup="handleExitDrag"
      >
        <span class="line" ref="line"></span>
        <span :style="pos" :class="{ block: true, pick: allowDrag }"></span>
      </span>
      <input
        type="Number"
        name=""
        id=""
        ref="input"
        @blur="handleInput"
        @keydown.enter="handleInput"
      />
    </span>
  </div>
  <!-- <span style="margin-left: 100px">{{ value }}(测试要删除的)</span> -->
</template>
<script>
import { onMounted, ref } from "vue";
// 百分比值到range内
function mapPercentageToRange(percentage, min, max) {
  if (min > max) {
    let temp = max;
    max = min;
    min = temp;
  }
  return min + (max - min) * percentage;
}
// range计算百分比值
function mapRangeToPercentage(value, min, max) {
  if (min > max) {
    let temp = max;
    max = min;
    min = temp;
  }
  return (value - min) / (max - min);
}
export default {
  setup(props) {
    const value = ref(0);
    const input = ref(null);
    const lineGeo = ref(0);

    const allowDrag = ref(false);
    onMounted(() => {
      const { x, width } = line.value.getBoundingClientRect();
      lineGeo.value = { width, x };
      if (props.default) {
        setValue(props.default);
      }
      else setValue(props.range.min + 0.5 * (props.range.max - props.range.min));
    });
    const handleBeginDrag = (event) => {
      allowDrag.value = true;
      const { x, width } = line.value.getBoundingClientRect();
      lineGeo.value = { width, x };
      setValueFromUI(event);
    };

    const line = ref(null);
    const pos = ref(0);
    const blockWidth = 15; // 块宽度
    const padding = 10; // 用于缓冲鼠标事件
    const setValueFromUI = (event) => {
      let left = event.clientX - lineGeo.value.x;
      left -= blockWidth / 2;
      if (left < 0) {
        left = 0;
      } else if (left > lineGeo.value.width - blockWidth) {
        left = lineGeo.value.width - blockWidth;
      }
      left += padding;
      pos.value = { left: `${left}px` };
      value.value = mapPercentageToRange(
        (left - padding) / (lineGeo.value.width - blockWidth),
        props.range.min,
        props.range.max
      ).toFixed(3);
      input.value.value = value.value;
    };
    const drag = (event) => {
      if (allowDrag.value) {
        setValueFromUI(event);
      }
    };
    const handleExitDrag = () => {
      allowDrag.value = false;
    };
    const setValue = (v) => {
      if (v > props.range.max) {
        v = props.range.max;
      }
      if (v < props.range.min) {
        v = props.range.min;
      }
      value.value = v;
      input.value.value = v;
      let left =
        mapRangeToPercentage(value.value, props.range.min, props.range.max) *
        (lineGeo.value.width - blockWidth);
      left += padding;
      pos.value = { left: `${left}px` };
    };
    const handleInput = () => {
      setValue(input.value.value);
    };
    return {
      handleBeginDrag,
      handleInput,
      drag,
      value,
      input,
      lineGeo,
      pos,
      handleExitDrag,
      line,
      allowDrag,
      setValue,
    };
  },
  props: {
    content: {
      type: String,
      required: true,
    },
    default: {
      type: Number,
    },
    range: {
      type: Object,
      required: false,
      default: () => {
        return {
          min: -10,
          max: 10,
        };
      },
    },
  },
  name: "SliderBar",
};
</script>
<style lang="less" scoped>
@import url(~@/assets/global.less);
@import url(~@/assets/color.less);
@slider-bar-height: 25px;
@number-input-min-width: 50px;
@slider-line-width: 3px;
@gap: 20px;
@bar-padding: 10px; // 用于缓冲鼠标事件
.slider-bar-container {
  user-select: none;
  color: @font-black;
  height: 25px;
  min-width: 380px;
  line-height: 25px;
  font-size: @font-size;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between; /* 设置两端对齐 */
  .control {
    display: flex;
    input {
      align-self: flex-end;
      color: @font-black;
      border: none;
      outline: none;
      border: 1px solid @gray;

      &:focus {
        border: 2px solid @ui-blue;
      }
      margin-left: @gap;
      border-radius: 5px;
      height: @slider-bar-height - 5px;
      min-width: @number-input-min-width;
      text-align: center;
      width: @number-input-min-width;
    }
    .bar {
      align-self: flex-end;
      &:active {
        cursor: ew-resize;
      }
      padding-left: @bar-padding;
      // border: 1px solid;
      padding-right: @bar-padding;
      min-width: 200px;
      margin-left: @gap;
      height: @slider-bar-height;
      position: relative;
      display: flex;
      align-items: center;
      .block {
        //   pointer-events: none;
        left: @bar-padding;
        display: block;
        position: absolute;
        width: 15px;
        height: 8px;
        border: 1px solid #666;
        background: #eee;
        &.pick {
          background: @ui-blue;
          border: none;
          transform: scale(1.2);
          box-shadow: 0 0 0px 4px fade(@ui-blue, 20%);
        }
        border-radius: 5px;
        position: absolute;
      }
      .line {
        height: @slider-line-width;
        border-radius: 10px;
        background: @gray;
        width: 100%;
      }
    }
  }
}
</style>