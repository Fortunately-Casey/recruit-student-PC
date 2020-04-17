<template>
  <div class="user-info">
    <div class="user">
      <div class="info">
        <div class="name">{{userName}}</div>
        <div class="type">{{userType}}</div>
      </div>
      <div class="logo"></div>
      <div class="drop-down" @click="isShowLogout = !isShowLogout"></div>
      <div class="logout" v-if="isShowLogout" @click="logout">退出</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "18662858322",
      userType: "学生家长",
      isShowLogout: false
    };
  },
  methods: {
    logout() {
      this.$router.push({
        path: "/login"
      });
    }
  }
};
</script>
<style lang="less" scoped>
.user-info {
  width: 200px;
  height: 60px;
  position: absolute;
  right: 0;
  top: 0;
  .user {
    width: 200px;
    height: 60px;
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    .info {
      width: 100px;
      .name {
        width: 100px;
        padding-right: 10px;
        height: 30px;
        line-height: 30px;
        text-align: right;
        font-size: 14px;
        color: #fff;
        font-weight: bold;
      }
      .type {
        width: 100px;
        padding-right: 10px;
        height: 30px;
        line-height: 30px;
        text-align: right;
        font-size: 14px;
        color: #fff;
        font-weight: bold;
      }
    }
    .logo {
      width: 40px;
      height: 40px;
      background: url("../assets/image/user-logo.png") no-repeat;
      background-size: 100% 100%;
      border-radius: 50%;
      margin-top: 10px;
    }
    .drop-down {
      width: 20px;
      height: 40px;
      background: url("../assets/image/drop-down.png") no-repeat;
      background-size: 12px 7px;
      background-position: center center;
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }
    .logout {
      width: 100px;
      height: 40px;
      line-height: 40px;
      transition: all 1s;
      text-align: center;
      position: absolute;
      z-index: 999;
      bottom: -49px;
      right: 0px;
      cursor: pointer;
      background-color: #fff;
      border: 1px solid #e2e9f1;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  }
}
</style>