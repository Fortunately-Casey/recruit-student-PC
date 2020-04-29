<template>
  <div id="admin-page">
    <div class="top">
      <m-header></m-header>
      <user-info></user-info>
    </div>
    <div class="content">
      <div class="tab-bar">
        <div class="tab-item" :class="tabIndex === 0?'chosed':''" @click="choseTab(0)">发文配置</div>
        <div class="tab-item" :class="tabIndex === 1?'chosed':''" @click="choseTab(1)">学校统计</div>
        <div class="add-item" v-if="tabIndex === 2">
          新增发文
          <Icon type="md-close" style="font-size:18px" @click="closeAdd" />
        </div>
        <div class="add-button" @click="addArticle" v-if="tabIndex === 0">
          <Icon type="ios-copy-outline" style="font-size:20px" />新增发文
        </div>
        <div class="export-button" @click="exportExcel" v-if="tabIndex === 1">
          <Icon type="md-arrow-down" style="font-size:20px" />导出摸底情况
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import MHeader from "@/components/Header.vue";
import UserInfo from "@/components/UserInfo.vue";
import * as api from "@/service/apiList";
import http from "@/service/service";
export default {
  data() {
    return {
      tabIndex: 0
    };
  },
  created() {
    let routeName = this.$route.name;
    let tabIndex;
    switch (routeName) {
      case "addArticle":
        tabIndex = 2;
        break;
      case "articleList":
        tabIndex = 0;
        break;
      case "schoolStatistics":
        tabIndex = 1;
        break;
    }
    this.tabIndex = tabIndex;
  },
  methods: {
    closeAdd() {
      this.tabIndex = 0;
      this.$router.push({
        path: "/adminPage/articleList"
      });
    },
    choseTab(index) {
      this.tabIndex = index;
      if (index === 0) {
        this.$router.push({
          path: "/adminPage/articleList"
        });
      } else if (index === 1) {
        this.$router.push({
          path: "/adminPage/schoolStatistics"
        });
      }
    },
    addArticle() {
      this.tabIndex = 2;
      this.$router.push({
        path: "/adminPage/addArticle"
      });
    },
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
    UserInfo
  }
};
</script>
<style lang="less" scoped>
@font-color: #64b3ed;
#admin-page {
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
      .add-button,
      .export-button {
        cursor: pointer;
        width: 103px;
        height: 48px;
        border: 1px solid #e2e8f0;
        font-size: 14px;
        color: @font-color;
        letter-spacing: 1.7px;
        text-align: center;
        margin-left: 30px;
        line-height: 48px;
      }
      .export-button {
        width: 150px;
        position: absolute;
        right: 30px;
        top: 0px;
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