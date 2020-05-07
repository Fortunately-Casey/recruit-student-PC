<template>
  <div id="school-manage">
    <div class="top">
      <m-header></m-header>
      <user-info></user-info>
    </div>
    <div class="content">
      <div class="tab-bar">
        <div class="tab-item" :class="tabIndex == 0?'chosed':''" @click="choseTab(0)">已审核</div>
        <div class="tab-item" :class="tabIndex == 1?'chosed':''" @click="choseTab(1)">未审核</div>
        <div class="add-item" v-if="tabIndex === 2">
          {{tabText}}
          <Icon type="md-close" style="font-size:18px" @click="closeAdd" />
        </div>
        <div class="add-button" @click="isShowExport = true">
          <Icon type="md-arrow-down" style="font-size:20px" />导出通知书
        </div>
      </div>
      <Modal v-model="isShowExport" title="选择入学时间">
        <el-date-picker v-model="exportDate" type="datetime" placeholder="选择日期时间"></el-date-picker>
        <div slot="footer">
          <Button type="text" size="large" @click="isShowExport=false">取消</Button>
          <Button type="primary" size="large" @click="exportWordBySchool">确定</Button>
        </div>
      </Modal>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import MHeader from "@/components/Header.vue";
import UserInfo from "@/components/UserInfo.vue";
import * as api from "@/service/apiList";
import http from "@/service/service";
import { TodateTime } from "@/common/tool/tool";
export default {
  data() {
    return {
      tabIndex: 0,
      isShowExport: false,
      exportDate: ""
    };
  },
  created() {
    this.routerChange();
  },
  methods: {
    closeAdd() {
      this.tabIndex = 0;
      this.$router.go(-1);
    },
    choseTab(index) {
      this.tabIndex = index;
      if (index === 0) {
        this.$router.push({
          path: "/schoolAudit/auditList"
        });
      } else if (index === 1) {
        this.$router.push({
          path: "/schoolAudit/savedList"
        });
      }
    },
    routerChange() {
      let { id } = this.$route.query;
      if (id) {
        this.tabText = "学生信息";
      } else {
        this.tabText = "新增学生";
      }
      let routeName = this.$route.name;
      let tabIndex;
      switch (routeName) {
        case "auditChild":
          tabIndex = 2;
          break;
        case "auditList":
          tabIndex = 0;
          break;
        case "savedAudit":
          tabIndex = 1;
          break;
      }
      this.tabIndex = tabIndex;
    },
    exportWordBySchool() {
      if (!this.exportDate) {
        this.$Message.warning("请选择入学时间！");
        return;
      }
      http
        .get(
          api.EXPORTWORDBYSCHOOL,
          {
            enterTime: TodateTime(this.exportDate)
          },
          this
        )
        .then(resp => {
          if (resp.data.success) {
            window.location.href = resp.data.message;
            this.isShowExport = false;
          } else {
            this.$Message.warning(resp.data.message);
          }
        });
    }
  },
  components: {
    MHeader,
    UserInfo
  },
  watch: {
    $route() {
      this.routerChange();
    }
  }
};
</script>

<style lang="less" scoped>
@font-color: #64b3ed;
#school-manage {
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
      .tab-item {
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
      .chosed {
        color: @font-color;
      }
      .add-item,
      .add-button {
        cursor: pointer;
        width: 103px;
        height: 48px;
        border: 1px solid #e2e8f0;
        font-size: 14px;
        color: @font-color;
        letter-spacing: 1.7px;
        text-align: center;
        margin-left: 40px;
        line-height: 48px;
      }
      .add-button {
        position: absolute;
        right: 30px;
        top: 0px;
      }
    }
  }
}
</style>