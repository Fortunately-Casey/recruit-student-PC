<template>
  <div id="school-manage">
    <div class="top">
      <m-header></m-header>
      <user-info></user-info>
    </div>
    <div class="content">
      <div class="tab-bar">
        <div class="tab-item" :class="tabIndex === 0?'chosed':''">
          已登记
        </div>
        <div class="tab-item" :class="tabIndex === 1?'chosed':''">
          已保存
        </div>
        <!-- v-if="tabIndex === 2" -->
        <div class="add-item" >
          新增学生<Icon type="md-close" style="font-size:18px"/>
        </div>
        <div class="add-button">
          <Icon type="ios-copy-outline" style="font-size:20px"/>新增学生
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import MHeader from "@/components/Header.vue";
import UserInfo from "@/components/UserInfo.vue";
export default {
  data() {
    return {
      tabIndex:0
    };
  },
  methods: {},
  components: {
    MHeader,
    UserInfo
  }
};
</script>

<style lang="less" scoped>
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
        margin-left: 30px;
        line-height: 40px;
      }
      .chosed {
        color: #64b3ed;
      }
      .add-item,.add-button {
        cursor: pointer;
        width: 103px;
        height: 48px;
        border: 1px solid #e2e8f0;
        font-size: 14px;
        color: #64b3ed;
        letter-spacing: 1.7px;
        text-align: center;
        margin-left: 30px;
        line-height: 40px;
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