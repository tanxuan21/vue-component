<template>
    <div class="container"></div>
  </template>
  <script>
  export default {
    setup(props) {},
    name:"TextContainer",
  };
  </script>
  
  <style lang="less" scoped>
  @import url(~@/assets/global.less);
  @import url(~@/assets/color.less);
  .container {
    .full();
    background: #000;
  }
  </style>