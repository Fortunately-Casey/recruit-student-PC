<template>
  <div id="login">
    <m-header></m-header>
    <div class="login-content">
      <div class="login-logo"></div>
      <div class="login-box">
        <div class="title">填写注册信息</div>
        <div class="login-module" v-if="isShowLogin">
          <div class="user">
            <div class="name">手机号码：</div>
            <input type="text" v-model="userID" />
          </div>
          <div class="password">
            <div class="name">密码：</div>
            <input
              type="text"
              v-model="password"
              style="-webkit-text-security:disc;text-security:disc;"
            />
          </div>
        </div>
        <div class="register-module" v-else>
          <div class="user">
            <div class="name">手机号码：</div>
            <input type="text" v-model="registerID" />
          </div>
          <div class="password">
            <div class="name">密码：</div>
            <input
              type="text"
              v-model="registerPW"
              style="-webkit-text-security:disc;text-security:disc;"
            />
          </div>
          <div class="password">
            <div class="name">确认密码：</div>
            <input
              type="text"
              v-model="confirmPW"
              style="-webkit-text-security:disc;text-security:disc;"
            />
          </div>
        </div>
        <div class="switch">
          <span @click="isShowLogin = !isShowLogin">{{isShowLogin?'注册':"登录"}}</span>
        </div>
        <div class="login-button" @click="confirm">{{isShowLogin?'登录':"注册"}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import MHeader from "@/components/Header.vue";
export default {
  data() {
    return {
      userID: "",
      password: "",
      registerID: "",
      registerPW: "",
      confirmPW: "",
      isShowLogin: true
    };
  },
  methods: {
    confirm() {
      if (this.userID === "admin") {
        this.$router.push({
          path: "/adminPage"
        });
      } else if (this.userID === "config") {
        this.$router.push({
          path: "/schoolConfig"
        });
      } else if (this.userID === "school") {
        this.$router.push({
          path: "/schoolManage"
        });
      } else {
        this.$router.push({
          path: "/patriarch"
        });
      }
    }
  },
  components: {
    MHeader
  }
};
</script>

<style lang="less" scoped>
@font-color: #64b3ed;
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
    .login-box {
      width: 325px;
      position: absolute;
      right: 15%;
      top: 42%;
      transform: translateY(-50%);
      padding-left: 20px;
      .title {
        font-size: 20px;
        font-weight: bold;
        padding-left: 30px;
        color: #4299e1;
        margin-bottom: 35px;
      }
      .login-module {
        .user,
        .password {
          height: 40px;
          margin-top: 15px;
          display: flex;
          .name {
            height: 40px;
            line-height: 40px;
            width: 90px;
            color: #a0aec0;
          }
          input {
            border-radius: 5px;
            width: 200px;
            height: 40px;
            border: none;
            background-color: #edf2f7;
            padding-left: 10px;
            color: #a0aec0;
          }
          input[type="text"]:focus {
            outline: none;
          }
          input[type="password"]:focus {
            outline: none;
          }
        }
      }
      .register-module {
        .user,
        .password {
          height: 40px;
          margin-top: 15px;
          display: flex;
          .name {
            height: 40px;
            line-height: 40px;
            width: 90px;
            color: #a0aec0;
          }
          input {
            border-radius: 5px;
            width: 200px;
            height: 40px;
            border: none;
            border: 1px solid #a0aec0;
            padding-left: 10px;
            color: #a0aec0;
          }
          input[type="text"]:focus {
            outline: none;
          }
          input[type="password"]:focus {
            outline: none;
          }
        }
      }
      .switch {
        text-align: right;
        margin: 10px 0;
        padding-right: 30px;
        span {
          cursor: pointer;
          color: @font-color;
        }
      }
      .login-button {
        border-radius: 5px;
        width: 265px;
        height: 40px;
        background-color: @font-color;
        margin: 0 auto;
        color: #fff;
        text-align: center;
        line-height: 40px;
        margin-top: 40px;
        letter-spacing: 18px;
        text-indent: 15px;
        cursor: pointer;
      }
    }
  }
}
</style>