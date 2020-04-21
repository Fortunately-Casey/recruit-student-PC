<template>
  <div id="child-manage">
    <div class="card">
      <div class="apply-code">
        <div class="name">预报名码</div>
        <div class="code">01200001</div>
      </div>
      <div class="apply-info">
        <div class="identity">
          <div class="left">
            <div class="left-logo"></div>
          </div>
          <div class="right">
            <div class="name">赵海棠</div>
            <div class="idCard">320623199509244538</div>
          </div>
        </div>
        <div class="address">
          <div class="address-item">
            <div class="name">户口所在地：</div>
            <div class="value">广东省广州市越秀区</div>
          </div>
          <div class="address-item">
            <div class="name">现居住地址：</div>
            <div class="value">南通市开发区碧桂园小区</div>
          </div>
        </div>
      </div>
      <div class="apply-school">
        <div class="name">预报名学校：</div>
        <div class="value">南通开发区东方中学</div>
      </div>
    </div>
    <div class="add-card" @click="addChild">
      <div class="add-icon"></div>
      <div class="add-text">添加子女</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods:{
    addChild() {
      this.$router.push({
        path:"/patriarch/addChild"
      })
    }
  }
};
</script>

<style lang="less" scoped>
@font-color: #64B3ED;
#child-manage {
  height: 100%;
  display: flex;
  padding-top: 30px;
  .card {
    background: #ffffff;
    border: 1px solid @font-color;
    border-radius: 8px;
    width: 375px;
    height: 286px;
    margin-left: 30px;
    padding: 0 15px;
    cursor: pointer;
    .apply-code {
      height: 45px;
      line-height: 45px;
      border-bottom: 1px solid #ddd;
      display: flex;
      .name {
        flex: 1;
        color: #000;
        font-size: 16px;
        font-weight: 500;
      }
      .code {
        flex: 1;
        font-size: 16px;
        color: @font-color;
        text-align: right;
      }
    }
    .apply-info {
      height: 195px;
      .identity {
        height: 100px;
        display: flex;
        .left {
          display: flex;
          align-items: center;
          width: 100px;
          .left-logo {
            width: 96px;
            height: 74px;
            background: url("../../../assets/image/apply-logo1.png") no-repeat;
            background-size: 100% 100%;
          }
        }
        .right {
          flex: 1;
          .name {
            margin-top: 10px;
            height: 50px;
            line-height: 50px;
            padding-left: 10px;
            font-size: 18px;
            font-weight: bold;
          }
          .idCard {
            padding-left: 10px;
            font-size: 16px;
          }
        }
      }
      .address {
        height: 95px;
        .address-item {
          height: 45px;
          line-height: 45px;
          display: flex;
          .name {
            width: 100px;
            color: #a0aec0;
            font-size: 16px;
            font-weight: 500;
          }
          .value {
            flex: 1;
            font-size: 16px;
            color: #2d3748;
          }
        }
      }
    }
    .apply-school {
      height: 45px;
      line-height: 45px;
      border-top: 1px solid #ddd;
      display: flex;
      .name {
        width: 100px;
        color: #a0aec0;
        font-size: 16px;
        font-weight: 500;
      }
      .value {
        flex: 1;
        font-size: 16px;
        color: #2d3748;
      }
    }
  }
  .add-card {
    cursor: pointer;
    width: 375px;
    height: 286px;
    border: 2px dashed @font-color;
    border-radius: 8px;
    font-size: 24px;
    color: @font-color;
    letter-spacing: 0;
    margin-left: 30px;
    .add-icon {
      width: 36px;
      height: 36px;
      background: url("../../../assets/image/add-icon.png") no-repeat;
      background-size: 100% 100%;
      margin: 0 auto;
      margin-top: 100px;
    }
    .add-text {
      font-size: 22px;
      margin-top: 10px;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>