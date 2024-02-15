<template>
  <div class="image-looker-container">
    <img :src="srcData" />
  </div>
</template>
<script>
export default {
  props: {
    srcData: { type: String, require: true },
  },
  setup() {},
};
</script>
<style lang="less" scoped>
.image-looker-container {
  text-align: center;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>