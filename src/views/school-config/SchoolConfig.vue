<template>
  <div id="school-config">
    <div class="top">
      <m-header></m-header>
      <user-info></user-info>
    </div>
    <div class="content">
      <div class="tab-bar">
        <div class="tab-item" :class="chosedIndex === 0?'chosed':''" @click="chosedIndex = 0">学校配置</div>
        <div class="tab-item" :class="chosedIndex === 1?'chosed':''" @click="chosedIndex = 1" v-if="isShowConfig">账号管理</div>
        <div class="output-button" @click="exportExcel" v-if="isShowConfig">导出摸底情况</div>
      </div>
      <config-module v-if="chosedIndex == 0"></config-module>
      <account-number v-if="chosedIndex == 1"></account-number>
    </div>
  </div>
</template>

<script>
import MHeader from "@/components/Header.vue";
import UserInfo from "@/components/UserInfo.vue";
import ConfigModule from "./config-module/ConfigModule";
import AccountNumber from "./account-number/AccountNumber";
import * as api from "@/service/apiList";
import http from "@/service/service";
export default {
  data() {
    return {
      chosedIndex: 0,
      isShowConfig:false
    };
  },
  created() {
    let schoolCode = window.localStorage.getItem("schoolCode");
    if (schoolCode == "04") {
      this.isShowConfig = false;
    } else {
      this.isShowConfig = true;
    }
  },
  methods: {
    exportExcel() {
      http.get(api.EXPORTSTUDENTBYONEORMORE).then(resp => {
        if (resp.data.success) {
          // window.location.href = `http://223.113.1.77:10058${resp.data.data}`;
          console.log(`http://223.113.1.77:10058${resp.data.data}`);
          this.isShowExport = false;
        } else {
          this.$Message.warning(resp.data.message);
        }
      });
    }
  },
  components: {
    MHeader,
    UserInfo,
    ConfigModule,
    AccountNumber
  }
};
</script>

<style lang="less" scoped>
@font-color: #64b3ed;
#school-config {
  height: 100%;
  display: flex;
  flex-direction: column;
  .top {
    position: relative;
  }
  .content {
    background-color: #edf1f7;
    flex: 1;
    display: flex;
    flex-direction: column;
    .tab-bar {
      height: 48px;
      background-color: #fff;
      display: flex;
      position: relative;
      font-weight: bold;
      .tab-item,
      .output-button {
        cursor: pointer;
        width: 103px;
        height: 48px;
        border: 1px solid #e2e8f0;
        font-size: 14px;
        color: #728096;
        letter-spacing: 1.7px;
        text-align: center;
        margin-left: 40px;
        line-height: 48px;
      }
      .output-button {
        width: 150px;
        position: absolute;
        right: 100px;
        top: 0;
      }
      .chosed {
        color: @font-color;
      }
    }
  }
}
</style>