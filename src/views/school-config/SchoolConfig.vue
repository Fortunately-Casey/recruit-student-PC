<template>
  <div id="school-config">
    <div class="top">
      <m-header></m-header>
      <user-info></user-info>
    </div>
    <div class="content">
      <div class="tab-bar">
        <div class="tab-item" :class="'chosed'">学校配置</div>
      </div>
      <config-module></config-module>
    </div>
  </div>
</template>

<script>
import MHeader from "@/components/Header.vue";
import UserInfo from "@/components/UserInfo.vue";
import ConfigModule from "./config-module/ConfigModule";
export default {
  data() {
    return {};
  },
  created() {},
  methods: {},
  components: {
    MHeader,
    UserInfo,
    ConfigModule
  }
};
</script>

<style lang="less" scoped>
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
    }
  }
}
</style>