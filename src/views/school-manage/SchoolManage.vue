<template>
  <div id="school-manage">
    <div class="top">
      <m-header></m-header>
      <user-info></user-info>
    </div>
    <div class="content">
      <div class="tab-bar">
        <div class="tab-item" :class="tabIndex === 0?'chosed':''" @click="choseTab(0)">已登记</div>
        <div class="tab-item" :class="tabIndex === 1?'chosed':''" @click="choseTab(1)">已保存</div>
        <div class="add-item" v-if="tabIndex === 2">
          {{tabText}}
          <Icon type="md-close" style="font-size:18px" @click="closeAdd" />
        </div>
        <div class="add-button" @click="addChild" v-if="tabIndex === 2?false:true">
          <Icon type="ios-copy-outline" style="font-size:20px" />新增学生
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
      tabIndex: 0,
      tabText: "新增学生"
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
          path: "/schoolManage/registList"
        });
      } else if (index === 1) {
        this.$router.push({
          path: "/schoolManage/savedList"
        });
      }
    },
    addChild() {
      this.tabIndex = 2;
      this.$router.push({
        path: "/schoolManage/addChild"
      });
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
        case "schoolAdd":
          tabIndex = 2;
          break;
        case "registList":
          tabIndex = 0;
          break;
        case "savedList":
          tabIndex = 1;
          break;
      }
      this.tabIndex = tabIndex;
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