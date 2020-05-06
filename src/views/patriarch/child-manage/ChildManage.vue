<template>
  <div id="child-manage">
    <div class="card" v-for="(item,index) in list" :key="index" @click="gotoDetail(item)">
      <div class="apply-code">
        <div class="name">预报名码</div>
        <div class="code">
          {{item.forecastCode}}
          <Icon
            type="ios-backspace"
            size="30"
            v-if="!item.forecastCode"
            style="color:red"
            @click.stop="deleteChild(item)"
          />
        </div>
      </div>
      <div class="apply-info">
        <div class="identity">
          <div class="left">
            <div :class="item.forecastCode?'left-logo1':'left-logo2'"></div>
          </div>
          <div class="right">
            <div class="name">{{item.name}}</div>
            <div class="idCard">{{item.idCard}}</div>
          </div>
        </div>
        <div class="address">
          <div class="address-item">
            <div class="name">户口所在地：</div>
            <div class="value">{{item.provincesName + item.cityName + item.areaName}}</div>
          </div>
          <div class="address-item">
            <div class="name">现居住地址：</div>
            <div class="value">{{item.smallCommunityName}}</div>
          </div>
        </div>
      </div>
      <div class="apply-school">
        <div class="name">预报名学校：</div>
        <div class="value">{{item.schoolName}}</div>
      </div>
    </div>
    <div class="add-card" @click="addChild">
      <div class="add-icon"></div>
      <div class="add-text">添加子女</div>
    </div>
    <Modal v-model="isShowDelete" @on-ok="deleteStudent">
      <h3 slot="header" style="color:red;font-size:18px">删除</h3>
      <p>确认要删除该学生的信息吗？</p>
      <div slot="footer">
        <Button type="text" size="large" @click="isShowDelete=false">取消</Button>
        <Button type="primary" size="large" @click="deleteStudent">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import * as api from "@/service/apiList";
import http from "@/service/service";
export default {
  data() {
    return {
      isShowDelete: false,
      deleteID: "",
      list: []
    };
  },
  mounted() {
    this.$nextTick(function() {
      this.getChildrenList();
    });
  },
  methods: {
    gotoDetail(item) {
      this.$router.push({
        path: "/patriarch/addChild",
        query: {
          id: item.id
        }
      });
    },
    getChildrenList() {
      this.$Spin.show();
      http.get(api.GETSTUDENTBYADMISSIONID,{},this).then(resp => {
        this.$Spin.hide();
        this.list = resp.data.data;
      });
    },
    deleteStudent() {
      let vm = this;
      http
        .delete(api.DELETESTUDENTBYID, {
          studentID: vm.deleteID
        })
        .then(resp => {
          if (resp.data.success) {
            vm.$Message.success("删除成功！");
            vm.getChildrenList();
            vm.isShowDelete = false;
          } else {
            vm.$Message.error("删除失败！");
          }
        });
    },
    deleteChild(item) {
      this.deleteID = item.id;
      this.isShowDelete = true;
    },
    addChild() {
      this.$router.push({
        path: "/patriarch/addChild"
      });
    }
  }
};
</script>

<style lang="less" scoped>
@font-color: #64b3ed;
#child-manage {
  height: 100%;
  display: flex;
  padding-top: 30px;
  flex-wrap: wrap;
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
          .left-logo1 {
            width: 96px;
            height: 74px;
            background: url("../../../assets/image/apply-logo1.png") no-repeat;
            background-size: 100% 100%;
          }
          .left-logo2 {
            width: 96px;
            height: 74px;
            background: url("../../../assets/image/apply-logo2.png") no-repeat;
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