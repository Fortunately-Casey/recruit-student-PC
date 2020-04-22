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
  created() {
    let userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
    this.userName = userInfo.adminUserID;
    if (userInfo.identity === "01") {
      this.userType = userInfo.schoolName;
    } else if (userInfo.identity === "02") {
      this.userType = `${userInfo.schoolName}打印老师`;
    } else if (userInfo.identity === "03") {
      this.userType = `${userInfo.schoolName}录入老师`;
    } else if (userInfo.identity === "04") {
      this.userType = "学生家长";
    } else if (userInfo.identity === "00") {
      this.userType = "社会事业局";
    }
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
  z-index: 999;
  right: 0;
  top: 0;
  .user {
    width: 300px;
    height: 60px;
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    .info {
      width: 200px;
      .name {
        width: 200px;
        padding-right: 10px;
        height: 30px;
        line-height: 30px;
        text-align: right;
        font-size: 14px;
        color: #fff;
        font-weight: bold;
      }
      .type {
        width: 200px;
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