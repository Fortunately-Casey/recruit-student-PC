<template>
  <div id="school-config">
    <div class="top">
      <m-header></m-header>
      <user-info></user-info>
    </div>
    <div class="content">
      <div class="tab-bar">
        <div class="tab-item" :class="chosedIndex === 0?'chosed':''" @click="chosedIndex = 0">学校配置</div>
        <div class="tab-item" :class="chosedIndex === 1?'chosed':''" @click="chosedIndex = 1">账号管理</div>
        <div class="output-button" @click="isShowExport = true">导出入学通知书</div>
      </div>
      <config-module v-if="chosedIndex == 0"></config-module>
      <account-number v-if="chosedIndex == 1"></account-number>
      <Modal v-model="isShowExport" title="选择入学时间">
        <el-date-picker v-model="exportDate" type="datetime" placeholder="选择日期时间"></el-date-picker>
        <div slot="footer">
          <Button type="text" size="large" @click="isShowExport=false">取消</Button>
          <Button type="primary" size="large" @click="exportWordBySchool">确定</Button>
        </div>
      </Modal>
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
import { TodateTime } from "@/common/tool/tool";
export default {
  data() {
    return {
      chosedIndex: 0,
      isShowExport: false,
      exportDate: ""
    };
  },
  created() {},
  methods: {
    exportWordBySchool() {
      http
        .get(api.EXPORTWORDBYSCHOOL, {
          enterTime: TodateTime(this.exportDate)
        })
        .then(resp => {
          if (resp.data.success) {
            this.isShowExport = false;
          } else {
            this.$Message.warning("导出失败！");
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