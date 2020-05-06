<template>
  <div id="index">
    <m-header></m-header>
    <div class="content">
      <div class="left">
        <div class="reminder">
          <div class="reminder-title" v-if="chosedTab === 0"></div>
          <div class="school-title" v-else></div>
          <div class="message-list" v-if="chosedTab === 0">
            <div
              class="message"
              v-for="(item,index) in newsList"
              :key="index"
              @click="toNews(item)"
            >
              <div class="voice"></div>
              {{item.title}}
            </div>
          </div>
          <div class="school-list" v-else>
            <div class="header">
              <div class="school-name">学校名称</div>
              <div class="school-address">学校地址</div>
              <div class="school-phone">咨询电话</div>
              <div class="school-service">服务时间</div>
            </div>
            <div class="list">
              <div
                class="item"
                v-for="(item,index) in 8"
                :key="index"
                :class="index%2==0?'':'highlight'"
              >
                <div class="school-name">南通市竹行中学</div>
                <div class="school-address">南通市开发区新开南路188号</div>
                <div class="school-phone">81581585</div>
                <div class="school-service">周一至周五 8:00 - 18:00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="item" :class="chosedTab === 0?'chosed-item':''" @click="chosedTab = 0">
          <div class="title1"></div>
          <div class="logo5"></div>
        </div>
        <!-- <div class="item">
          <div class="title2"></div>
          <div class="logo1"></div>
        </div> -->
        <div class="item" @click="toLogin">
          <div class="title3"></div>
          <div class="logo2"></div>
        </div>
        <div class="item" :class="chosedTab === 1?'chosed-item':''" @click="chosedTab = 1">
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
import * as api from "@/service/apiList";
import http from "@/service/service";
export default {
  data() {
    return {
      chosedTab: 0,
      newsList: []
    };
  },
  mounted() {
    this.$nextTick(function() {
      this.getNewsList();
    });
  },
  methods: {
    getNewsList() {
      this.$Spin.show();
      http
        .post(api.GETNEWSLIST, {
          currPage: 1,
          pageSize: 100,
          title: ""
        },this)
        .then(resp => {
          this.$Spin.hide();
          this.newsList = resp.data.data;
        });
    },
    toLogin() {
      // this.$router.push({
      //   path: "/login"
      // });
      window.open(`${window.location.origin}/login`);
    },
    toNews(item) {
      window.open(item.titleUrl);
    }
  },
  components: {
    MHeader
  }
};
</script>

<style lang="less" scoped>
@font-color: #64b3ed;
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
        margin: 30px 70px 30px 40px;
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
        .school-title {
          width: 260px;
          height: 38px;
          background: url("../../assets/image/school-phone.png") no-repeat;
          background-size: 100% 100%;
          margin-left: 40px;
          margin-top: 50px;
        }
        .message-list {
          margin-top: 20px;
          max-height: 600px;
          overflow-y: auto;
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
        .school-list {
          padding: 30px 40px;
          .header {
            height: 70px;
            background-color: @font-color;
            display: flex;
            .school-name,
            .school-address,
            .school-phone,
            .school-service {
              flex: 1;
              text-align: center;
              line-height: 70px;
              color: #fff;
              font-size: 18px;
            }
          }
          .list {
            .item {
              height: 70px;
              display: flex;
              .school-name,
              .school-address,
              .school-phone,
              .school-service {
                flex: 1;
                text-align: center;
                line-height: 70px;
                font-size: 18px;
              }
            }
            .highlight {
              background-color: #edf2f7;
            }
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
          width: 78px;
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
        .logo4,
        .logo5 {
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
        .logo5 {
          width: 104px;
          height: 104px;
          background: url("../../assets/image/entry-logo5.png") no-repeat;
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
      .chosed-item {
        background: url("../../assets/image/entry-bg-chosed.png") no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
</style>