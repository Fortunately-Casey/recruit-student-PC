<template>
  <div id="add-article">
    <div class="add-box" v-if="isShowAdd">
      <div class="header">新增文章及链接</div>
      <div class="content">
        <div class="label">新闻标题</div>
        <Input v-model="newsTitle" style="width:100%" />
        <div class="url-input">
          <div class="icon-box">
            <div class="url-icon"></div>
          </div>
          <Input v-model="url" style="width:100%" placeholder="输入链接" />
        </div>
      </div>
      <div class="confirm-button" @click="confirm">提交</div>
    </div>
    <div class="success-box" v-if="isShowSuccess">
      <div class="success-icon"></div>
      <div class="title">新增文章成功</div>
      <div class="buttons">
        <div class="info" @click="goOn">继续新增文章</div>
        <div class="back" @click="back">返回文章列表</div>
      </div>
    </div>
    <div class="error-box" v-if="isShowError">
      <div class="error-icon"></div>
      <div class="title">添加文章失败</div>
      <div class="buttons">
        <div class="info">重新加载</div>
        <div class="back" @click="back">返回文章列表</div>
      </div>
    </div>
    <!-- <div class="confirm-button" @click="confirm">提交</div> -->
  </div>
</template>

<script>
import * as api from "@/service/apiList";
import http from "@/service/service";
export default {
  data() {
    return {
      newsTitle: "",
      url: "",
      isShowAdd: true,
      isShowSuccess: false,
      isShowError: false
    };
  },
  methods: {
    confirm() {
      if (!this.newsTitle) {
        this.$Message["warning"]({
          background: true,
          content: "新闻标题不能为空！"
        });
        return;
      }
      if (!this.url) {
        this.$Message["warning"]({
          background: true,
          content: "新闻链接不能为空！"
        });
        return;
      }
      let params = {
        title: this.newsTitle,
        titleUrl: this.url
      };
      this.$Spin.show();
      http.post(api.INSRERTNEWSCONFIG, params,this).then(resp => {
        this.$Spin.hide();
        if (resp.data.success) {
          this.isShowAdd = false;
          this.isShowSuccess = true;
        } else {
          this.isShowError = true;
        }
      });
    },
    back() {
      this.$router.push({
        path: "/adminPage/articleList"
      });
    },
    goOn() {
      this.isShowAdd = true;
      this.isShowSuccess = false;
      this.newsTitle = "";
      this.url = "";
    }
  }
};
</script>

<style lang="less" scoped>
@font-color: #64b3ed;
#add-article {
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative;
  .add-box {
    margin-top: 40px;
    width: 790px;
    height: 250px;
    background: #ffffff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    .header {
      font-size: 16px;
      font-weight: bold;
      height: 24px;
      border-left: 4px solid @font-color;
      padding-left: 15px;
      margin-top: 20px;
    }
    .content {
      padding: 0 25px;
      .label {
        margin: 20px 0 10px 0;
      }
      .url-input {
        width: 100%;
        margin-top: 10px;
        position: relative;
        .icon-box {
          width: 80px;
          height: 30px;
          background: #e2e8f0;
          border: 1px solid #dcdee2;
          border-radius: 3px 0 0 3px;
          position: absolute;
          left: 1px;
          top: 1px;
          z-index: 999;
          display: flex;
          justify-content: center;
          align-items: center;
          .url-icon {
            width: 17px;
            height: 17px;
            background: url("../../../assets/image/url-icon.png") no-repeat;
            background-size: 100% 100%;
          }
        }
        .ivu-input {
          padding-left: 80px !important;
        }
      }
    }
  }
  .success-box,
  .error-box {
    width: 790px;
    height: 210px;
    background: #ffffff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .success-icon {
      width: 72px;
      height: 72px;
      background: url("../../../assets/image/success-icon.png") no-repeat;
      background-size: 100% 100%;
      margin: 0 auto;
      margin-top: 15px;
    }
    .error-icon {
      width: 72px;
      height: 72px;
      background: url("../../../assets/image/error-icon.png") no-repeat;
      background-size: 100% 100%;
      margin: 0 auto;
      margin-top: 15px;
    }
    .title {
      text-align: center;
      font-size: 24px;
      font-weight: bold;
      margin-top: 20px;
    }
    .buttons {
      display: flex;
      justify-content: center;
      margin-top: 10px;
      .info {
        padding: 3px 10px;
        cursor: pointer;
        background: #64b3ed;
        border-radius: 2px;
        font-size: 14px;
        color: #ffffff;
        text-align: left;
        line-height: 22px;
      }
      .back {
        padding: 3px 10px;
        background: #ffffff;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 2px;
        opacity: 0.65;
        font-size: 14px;
        color: #000000;
        line-height: 22px;
        cursor: pointer;
        margin-left: 10px;
      }
    }
  }
  .confirm-button {
    background: @font-color;
    border-radius: 21px;
    width: 110px;
    height: 40px;
    color: #fff;
    text-align: center;
    line-height: 40px;
    // position: absolute;
    // bottom: 20px;
    // left: 50%;
    // transform: translateX(-50%);
    margin: 20px auto;
    font-size: 16px;
    cursor: pointer;
    letter-spacing: 10px;
    text-indent: 10px;
  }
}
/deep/.url-input .ivu-input {
  padding-left: 90px !important;
}
</style>