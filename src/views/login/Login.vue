<template>
  <div id="login">
    <m-header></m-header>
    <div class="login-content">
      <div class="login-logo"></div>
    </div>
  </div>
</template>

<script>
import MHeader from "@/components/Header.vue";
export default {
  data() {
    return {};
  },
  components: {
    MHeader
  }
};
</script>

<style lang="less" scoped>
#login {
  height: 100%;
  display: flex;
  flex-direction: column;
  .login-content {
    background: url("../../assets/image/login-bg.png") no-repeat;
    background-size: 100% 100%;
    flex: 1;
    position: relative;
    .login-logo {
      width: 569px;
      height: 344px;
      background: url("../../assets/image/login-logo.png") no-repeat;
      background-size: 100% 100%;
      position: absolute;
      left: 300px;
      top: 40%;
      transform: translateY(-50%);
    }
  }
}
</style>