<template>
  <div id="index">
    <m-header></m-header>
    <div class="content">
      <div class="left">
        <div class="reminder">
          <div class="reminder-title"></div>
          <div class="message-list">
            <div class="message" v-for="(item,index) in 15" :key="index">
              <div class="voice"></div>永远不要跟别人比幸运，我从来没想过我比别人幸运，我也许比他们更有毅力，在最困难的时候
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="item">
          <div class="title1"></div>
          <div class="logo1"></div>
        </div>
        <div class="item">
          <div class="title2"></div>
          <div class="logo1"></div>
        </div>
        <div class="item" @click="toLogin">
          <div class="title3"></div>
          <div class="logo2"></div>
        </div>
        <div class="item">
          <div class="title4"></div>
          <div class="logo3"></div>
        </div>
        <div class="item">
          <div class="title5"></div>
          <div class="logo4"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MHeader from "@/components/Header.vue";
export default {
  data() {
    return {};
  },
  methods: {
    toLogin() {
      this.$router.push({
        path: "/login"
      });
    }
  },
  components: {
    MHeader
  }
};
</script>

<style lang="less" scoped>
#index {
  height: 100%;
  display: flex;
  flex-direction: column;
  .content {
    background-color: #ecf1f6;
    flex: 1;
    display: flex;
    .left {
      flex: 1;
      display: flex;
      .reminder {
        flex: 1;
        margin: 30px 70px 50px 40px;
        background-color: #fff;
        background: #ffffff;
        box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        .reminder-title {
          width: 163px;
          height: 37px;
          background: url("../../assets/image/reminder-title.png") no-repeat;
          background-size: 100% 100%;
          margin-left: 40px;
          margin-top: 50px;
        }
        .message-list {
          margin-top: 20px;
          .message {
            height: 28px;
            padding-left: 90px;
            line-height: 28px;
            font-size: 16px;
            position: relative;
            cursor: pointer;
            margin: 20px 0;
            .voice {
              width: 16px;
              height: 14px;
              background: url("../../assets/image/voice.png") no-repeat;
              background-size: 100% 100%;
              position: absolute;
              left: 68px;
              top: 50%;
              transform: translateY(-50%);
            }
          }
          .message:hover {
            color: #4299e1;
          }
        }
      }
    }
    .right {
      width: 400px;
      display: flex;
      flex-direction: column;
      .item {
        flex: 1;
        margin-bottom: 20px;
        background: url("../../assets/image/entry-bg.png") no-repeat;
        background-size: 100% 100%;
        position: relative;
        cursor: pointer;
        .title1,
        .title2,
        .title3,
        .title4,
        .title5 {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 999;
        }
        .title1 {
          width: 266px;
          height: 27px;
          background: url("../../assets/image/entry-title1.png") no-repeat;
          background-size: 100% 100%;
        }
        .title2 {
          width: 207px;
          height: 27px;
          background: url("../../assets/image/entry-title2.png") no-repeat;
          background-size: 100% 100%;
        }
        .title3 {
          width: 146px;
          height: 27px;
          background: url("../../assets/image/entry-title3.png") no-repeat;
          background-size: 100% 100%;
        }
        .title4 {
          width: 207px;
          height: 27px;
          background: url("../../assets/image/entry-title4.png") no-repeat;
          background-size: 100% 100%;
        }
        .title5 {
          width: 208px;
          height: 27px;
          background: url("../../assets/image/entry-title5.png") no-repeat;
          background-size: 100% 100%;
        }
        .logo1,
        .logo2,
        .logo3,
        .logo4 {
          position: absolute;
          right: 0;
          bottom: 0;
        }
        .logo1 {
          width: 96px;
          height: 106px;
          background: url("../../assets/image/entry-logo1.png") no-repeat;
          background-size: 100% 100%;
        }
        .logo2 {
          width: 105px;
          height: 98px;
          background: url("../../assets/image/entry-logo2.png") no-repeat;
          background-size: 100% 100%;
        }
        .logo3 {
          width: 120px;
          height: 100px;
          background: url("../../assets/image/entry-logo3.png") no-repeat;
          background-size: 100% 100%;
        }
        .logo4 {
          width: 106px;
          height: 106px;
          background: url("../../assets/image/entry-logo4.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
}
</style>