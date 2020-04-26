<template>
    <div id="print-page" style="height:100%">
      <div class="header">南通市开发区实验小学教育集团一年级新生登记表</div>
      <div class="regist-number">
        <div class="name">等级编号：</div>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    // window.print();
  }
};
</script>

<style lang="less" scoped>
  #print-page {
    height: 100%;
    border: 1px solid #000;
    width: 1050px;
    padding: 0 100px;
    .header {
      font-size: 30px;
      text-align: center;
      font-family: "宋体";
      font-weight: bold;
      padding: 15px 200px;
    }
    .regist-number {
      height: 100px;
      .name {
        height: 40px;
      }
    }
  }
</style>