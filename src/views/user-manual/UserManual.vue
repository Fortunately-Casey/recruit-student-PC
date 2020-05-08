<template>
  <div id="index">
    <m-header></m-header>
    <div class="content">
      <div class="phone"></div>
      <div class="parent-pc"></div>
      <div class="teacher-pc"></div>
    </div>
  </div>
</template>

<script>
import MHeader from "@/components/Header.vue";
export default {
  data() {
    return {

    };
  },
  mounted() {
  },
  methods: {
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
    background-color: #fff;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    .phone {
      width: 1396px;
      height: 832px;
      background: url("../../assets/image/phone.png") no-repeat;
      background-size: 100% 100%;
    }
    .parent-pc {
      width: 1562px;
      height: 920px;
      background: url("../../assets/image/parent-pc.png") no-repeat;
      background-size: 100% 100%;
    }
    .teacher-pc {
      width: 1539px;
      height: 894px;
      background: url("../../assets/image/teacher-pc.png") no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>