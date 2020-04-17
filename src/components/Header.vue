<template>
  <div class="header">
    <div class="top">
      <div class="left-title">
        <div class="title-logo"></div>
        <div class="title-text"></div>
      </div>
    </div>
    <div class="bottom">
      <div class="rainbow"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.header {
  height: 68px;
  .top {
    .left-title {
      width: 481px;
      height: 60px;
      background: url("../assets/image/top-title-bg.png") no-repeat;
      background-size: 100% 100%;
      position: relative;
      .title-logo {
        width: 36px;
        height: 36px;
        background: url("../assets/image/title-logo.png") no-repeat;
        background-size: 100% 100%;
        position: absolute;
        left: 30px;
        top: 50%;
        transform: translateY(-50%);
      }
      .title-text {
        width: 341px;
        height: 20px;
        background: url("../assets/image/title-text.png") no-repeat;
        background-size: 100% 100%;
        position: absolute;
        right: 50px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    height: 60px;
    background-image: linear-gradient(90deg, #4299e1 0%, #36b5b2 100%);
  }
  .bottom {
    height: 8px;
    background-color: #f6ad55;
    .rainbow {
      width: 166px;
      height: 8px;
      background: url("../assets/image/rainbow.png") no-repeat;
      background-color: #fff;
      background-size: 100% 100%;
    }
  }
}
</style>