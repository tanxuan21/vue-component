<template >
  <div class="drawer-menu-container" ref="drawerMenu">
    <div class="drawer-handle" @click="handleClick">
      <icon type="zhankai1" :class="{ zhankai }"></icon>
      <span class="text">功能</span>
    </div>
    <div class="content" ref="content" :class="{ zhankai }">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import icon from "@/components/icon";
import { onMounted, ref } from "vue";
export default {
  setup(props, context) {
    const zhankai = ref(false);
    const content = ref(null);
    const drawerMenu = ref(null);
    let contentHeight = 0;
    onMounted(() => {
      // 拿到高度.为了应对 transition 0-auto 的问题
      const { height } = content.value.getBoundingClientRect();
      contentHeight = height;
      content.value.style.height = "0";

      // 给每个dom添加属性addHeight.到时候直接找然后调用即可.
      drawerMenu.value["content"] = content.value;
      //   console.dir(drawerMenu.value);
    });
    const handleClick = (e) => {
      zhankai.value = !zhankai.value;
      if (zhankai.value) {
        content.value.style.height = contentHeight + "px";
        // 发送事件,给父抽屉.父抽屉再加上子抽屉的高度.
      } else {
        const { height } = content.value.getBoundingClientRect();
        // 要保留元素高度
        contentHeight = height;
        content.value.style.height = "0";
      }
      // 递归的添加高度变化.由于插槽没办法将事件通信.
      // 传入本dom元素和本内容高度,给每个父元素都添加上这个高度
        addHeight(drawerMenu.value, contentHeight);
    };

    function addHeight(el, h) {
      const parentEl = el.parentNode.parentNode; // 获取父dom

      if (parentEl.classList.contains("drawer-menu-container")) {
        // 确认递归终止条件
        const lastH = parseInt(parentEl["content"].style.height);
        if (zhankai.value) {
          // 确认展开还是收起
          parentEl["content"].style.height = `${lastH + h}px`;
        } else {
          parentEl["content"].style.height = `${lastH - h}px`;
        }
        // 递归设置下一个父menu
        addHeight(parentEl, h);
      }
    }
    return {
      zhankai,
      handleClick,
      content,
      drawerMenu,
      addHeight,
    };
  },
  name: "DrawerMenu",
  components: {
    icon,
  },
};
</script>

<style lang="less" scoped>
@import url(~@/assets/global.less);
@import url(~@/assets/color.less);
@height: 30px;
@animation-time: 0.3s;
@tap: 30px;
.drawer-menu-container {
  user-select: none;

  .drawer-handle {
    font-size: 12px;
    border-radius: 5px;
    color: @font-black;
    .text {
      line-height: @height;
      margin-left: 5px;
    }
    height: @height;
    background: fade(@gray, 50%);

    .icon-container {
      margin-left: calc(@tap / 2);
      transition: @animation-time;
      display: inline-block;
      transform: rotate(-90deg);
      &.zhankai {
        transform: rotate(0deg);
      }
    }
  }
  .content {
    overflow: hidden;
    padding-left: @tap;
    background: fade(@gray, 20%);
    transition: @animation-time;
    &.zhankai {
      //   overflow: scroll;
    }
  }
}
</style>