<template>
  <div id="login">
    <m-header></m-header>
    <div class="login-content">
      <div class="login-logo"></div>
      <div class="login-box">
        <div class="title">{{isShowLogin?"您好，请登录":'填写注册信息'}}</div>
        <div class="login-module" v-if="isShowLogin">
          <div class="user">
            <div class="name">账号：</div>
            <input type="text" v-model="userID" @keyup.enter='confirm'/>
          </div>
          <div class="password">
            <div class="name">密码：</div>
            <input
              type="text"
              v-model="password"
              @keyup.enter='confirm'
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
import * as api from "@/service/apiList";
import http from "@/service/service";
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
  created() {
    let username = window.localStorage.getItem("username");
    let password = window.localStorage.getItem("password");
    if (username) {
      this.userID = username;
    }
    if (password) {
      this.password = password;
    }
  },
  methods: {
    confirm() {
      this.$Spin.show();
      if (this.isShowLogin) {
        let vm = this;
        if (!vm.userID || !vm.password) {
          this.$Message["warning"]({
            background: true,
            content: "账号密码不能为空！"
          });
          return;
        }
        let params = {
          adminUserID: vm.userID,
          password: vm.password,
          type: 2
        };
        http.post(api.Login, params, this).then(resp => {
          this.$Spin.hide();
          if (resp.data.success) {
            this.$Message["success"]({
              background: true,
              content: "登录成功"
            });
            window.localStorage.setItem("token", resp.data.data.token);
            window.localStorage.setItem(
              "schoolCode",
              resp.data.data.schoolCode
            );
            window.localStorage.setItem("username", vm.userID);
            window.localStorage.setItem("password", vm.password);
            window.localStorage.setItem(
              "userInfo",
              JSON.stringify(resp.data.data)
            );
            if (resp.data.data.identity === "01") {
              this.$router.push({
                path: "/schoolConfig"
              });
            } else if (resp.data.data.identity === "00") {
              this.$router.push({
                path: "/adminPage"
              });
            } else if (resp.data.data.identity === "02") {
              this.$router.push({
                path: "/schoolManage"
              });
            } else if (resp.data.data.identity === "03") {
              this.$router.push({
                path: "/schoolAudit"
              });
            } else if (resp.data.data.identity === "04") {
              this.$router.push({
                path: "/patriarch"
              });
            }
          } else {
            this.$Message["error"]({
              background: true,
              content: resp.data.message
            });
          }
        });
      } else {
        let vm = this;
        if (!vm.registerID || !vm.registerPW || !vm.confirmPW) {
          this.$Message["warning"]({
            background: true,
            content: "账号密码不能为空！"
          });
          return;
        }
        let params = {
          adminUserID: vm.registerID,
          password: vm.registerPW,
          confirmPassword: vm.confirmPW
        };
        http.post(api.REGISTERED, params, this).then(resp => {
          this.$Spin.hide();
          if (resp.data.success) {
            this.$Message["success"]({
              background: true,
              content: "注册成功"
            });
            vm.adminUserID = "";
            vm.password = "";
            vm.confirmPassword = "";
            vm.isShowLogin = true;
          } else {
            this.$Message["error"]({
              background: true,
              content: resp.data.message
            });
          }
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