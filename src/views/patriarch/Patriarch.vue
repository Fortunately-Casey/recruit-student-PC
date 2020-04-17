<template>
  <div id="patriarch">
    <div class="top">
      <m-header></m-header>
      <user-info></user-info>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import MHeader from "@/components/Header.vue";
import UserInfo from "@/components/UserInfo.vue";
export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    MHeader,
    UserInfo
  }
};
</script>

<style lang="less" scoped>
#patriarch {
  height: 100%;
  display: flex;
  flex-direction: column;
  .top {
    position: relative;
  }
  .content {
    background-color: #edf1f7;
    flex: 1;
  }
}
</style>