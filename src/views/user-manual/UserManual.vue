<template>
  <div id="index">
    <m-header></m-header>
    <div class="content">
      <Carousel v-model="value1" loop>
        <CarouselItem>
          <div class="teacher-pc"></div>
        </CarouselItem>
        <CarouselItem>
          <div class="phone"></div>
        </CarouselItem>
        <CarouselItem>
          <div class="parent-pc">建议使用谷歌浏览器</div>
        </CarouselItem>
      </Carousel>
      <!-- <div class="phone"></div>
      <div class="parent-pc"></div>
      <div class="teacher-pc"></div>-->
    </div>
  </div>
</template>

<script>
import MHeader from "@/components/Header.vue";
export default {
  data() {
    return {
      value1: 0
    };
  },
  mounted() {},
  methods: {},
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
    width: 80%;
    margin: 0 auto;
    // display: flex;
    // flex-direction: column;
    // align-items: center;

    .phone {
      width: 100%;
      height: 800px;
      background: url("../../assets/image/phone.png") no-repeat;
      background-size: 100% 100%;
    }
    .parent-pc {
      width: 100%;
      height: 800px;
      background: url("../../assets/image/parent-pc.png") no-repeat;
      background-size: 100% 100%;
      font-size:20px;
      color: red;
    }
    .teacher-pc {
      width: 100%;
      height: 800px;
      background: url("../../assets/image/teacher-pc.png") no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>