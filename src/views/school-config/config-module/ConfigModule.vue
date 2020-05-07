<template>
  <div id="config-module">
    <div class="main">
      <div class="left">
        <div class="birthday-config">
          <div class="header">报名出生年月配置</div>
          <div class="date">
            <div class="label">选择时间段</div>
            <el-date-picker
              v-model="value2"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:400px"
              :disabled="isDisabled"
            ></el-date-picker>
            <Button type="primary" style="margin-left:20px" @click="commitDate" v-if="!isDisabled">提交</Button>
          </div>
        </div>
        <div class="start-time">
          <div class="header">报名开始时间配置</div>
          <div class="date">
            <div class="label">选择时间段</div>
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:400px"
              :disabled="isDisabled"
            ></el-date-picker>
            <Button type="primary" style="margin-left:20px" @click="commitDate" v-if="!isDisabled">提交</Button>
          </div>
        </div>
        <div class="level-config" v-if="isShowConfig">
          <div class="header">面谈等级配置</div>
          <div class="levels">
            <div class="label">输入等级</div>
            <Input v-model="sort" size="large" style="width:80px" type="number" placeholder="排序" />
            <div class="add-input">
              <Input
                v-model="level"
                size="large"
                style="width:150px"
                placeholder="等级名称"
                maxlength="3"
              />
              <div class="add" @click="addLevel">添加</div>
            </div>
            <div class="level-list">
              <div class="level-item" v-for="(item,index) in levelList" :key="index">
                {{item.level}}
                <Icon type="md-close" @click="deleteLevel(item)" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right" v-if="isShowConfig">
        <div class="relation-config">
          <div class="header">小区学校对应关系配置</div>
          <div class="relation">
            <div class="add">
              <Button type="primary" @click="add">新增</Button>
            </div>
            <div class="list">
              <Table :columns="columns" :data="list"></Table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom"></div>
    <Modal v-model="isShowAdd" title="新增小区" @on-cancel="cancel">
      <Form :model="formItem" :label-width="100" style="width:400px">
        <FormItem label="学区">
          <Select v-model="formItem.boundaryID" placeholder="选择学区">
            <Option :value="item.id" v-for="(item,index) in boundaryList" :key="index">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="街道">
          <Select v-model="formItem.streetName" placeholder="选择街道" @on-change="streetChange">
            <Option
              :value="item.streetID"
              v-for="(item,index) in streetList"
              :key="index"
            >{{item.streetName}}</Option>
          </Select>
        </FormItem>
        <FormItem label="社区">
          <Select v-model="formItem.communityID" placeholder="选择社区">
            <Option
              :value="item.id"
              v-for="(item,index) in communityList"
              :key="index"
            >{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="小区">
          <Input v-model="formItem.smallCommunityName" placeholder="请输入小区" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="isShowAdd=false">取消</Button>
        <Button type="primary" size="large" @click="commitAdd">确定</Button>
      </div>
    </Modal>
    <Modal v-model="isShowDelete" title="删除小区" @on-cancel="isShowDelete = false">
      <p>确认要删除该小区么？</p>
      <div slot="footer">
        <Button type="text" size="large" @click="isShowDelete=false">取消</Button>
        <Button type="primary" size="large" @click="commitDelete">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import * as api from "@/service/apiList";
import { Todate } from "@/common/tool/tool";
import http from "@/service/service";
export default {
  data() {
    return {
      value1: "",
      value2: "",
      levelList: [],
      level: "",
      sort: "",
      columns: [
        {
          title: "街道",
          key: "streetName",
          align: "center"
        },
        {
          title: "社区",
          key: "communityName",
          align: "center"
        },
        {
          title: "学区",
          key: "boundaryName",
          align: "center",
          width: 300
        },
        {
          title: "小区",
          key: "smallCommunityName",
          align: "center"
        },
        {
          title: "操作",
          key: "option",
          align: "center",
          render: (h, params) => {
            return params.row.status === 1
              ? h("div", [
                  h(
                    "Button",
                    {
                      props: {
                        type: "error",
                        size: "small"
                      },
                      style: {
                        // marginLeft: "10px"
                      },
                      on: {
                        click: () => {
                          this.deleteSmallCommunity(params);
                        }
                      }
                    },
                    "删除"
                  )
                ])
              : "";
          }
        }
      ],
      isShowAdd: false,
      isShowDelete: false,
      deleteID: "",
      list: [],
      formItem: {
        boundaryID: "",
        streetName: "",
        communityID: "",
        smallCommunityName: ""
      },
      streetList: [],
      communityList: [],
      boundaryList: [],
      isShowConfig:false,
      isDisabled:false
    };
  },
  created() {
    let schoolCode = window.localStorage.getItem('schoolCode');
    if(schoolCode.length === 4 && schoolCode.indexOf("04") == 0) {
      this.isDisabled = true;
    }
    if(schoolCode == "04") {
      this.isShowConfig = false;
    }else {
      this.isShowConfig = true;
    }
  },
  mounted() {
    this.$nextTick(function() {
      // 获取所有配置信息
      this.getConfig();
    });
    // 获取街道信息
    this.getStreetList();
    // 获取界限信息
    this.getBoundaryList();
  },
  methods: {
    getStreetList() {
      http.get(api.GETSTREETLIST,{},this).then(resp => {
        this.streetList = resp.data.data;
      });
    },
    getBoundaryList() {
      http.get(api.GETBOUNDARYLIST,{},this).then(resp => {
        this.boundaryList = resp.data.data;
      });
    },
    streetChange(id) {
      this.$Spin.show();
      http
        .get(api.GETCOMMUNITYLIST, {
          streetID: id
        },this)
        .then(resp => {
          this.$Spin.hide();
          this.communityList = resp.data.data;
        });
    },
    getConfig() {
      let vm = this;
      this.$Spin.show();
      http.get(api.GETSCHOOLCONFIG,{},this).then(resp => {
        this.$Spin.hide();
        vm.value1 = [
          new Date(
            resp.data.data.school.enterSchoolBeginDate
              ? resp.data.data.school.enterSchoolBeginDate
              : ""
          ),
          new Date(
            resp.data.data.school.enterSchoolEndDate
              ? resp.data.data.school.enterSchoolEndDate
              : ""
          )
        ];
        vm.value2 = [
          new Date(
            resp.data.data.school.birthdayLimitStartDate
              ? resp.data.data.school.birthdayLimitStartDate
              : ""
          ),
          new Date(
            resp.data.data.school.birthdayLimitEndDate
              ? resp.data.data.school.birthdayLimitEndDate
              : ""
          )
        ];
        vm.levelList = resp.data.data.levelConfigs;
        vm.list = resp.data.data.communityInformation;
      });
    },
    commitDate() {
      let params = {
        birthdayLimitStartDate: this.toDate(this.value2[0]),
        birthdayLimitEndDate: this.toDate(this.value2[1]),
        enterSchoolBeginDate: this.toDate(this.value1[0]),
        enterSchoolEndDate: this.toDate(this.value1[1])
      };
      if (!this.value1) {
        this.$Message["warning"]({
          background: true,
          content: "请选择出生年月日"
        });
        return;
      } else if (!this.value2) {
        this.$Message["warning"]({
          background: true,
          content: "请选择报名时间"
        });
        return;
      }
      this.$Spin.show();
      http.post(api.SCHOOLINFORMATIONCONFIG, params,this).then(resp => {
        this.$Spin.hide();
        if (resp.data.success) {
          this.$Message["success"]({
            background: true,
            content: "提交成功"
          });
          this.getConfig();
        } else {
          this.$Message["error"]({
            background: true,
            content: resp.data.message
          });
        }
      });
    },
    toDate(date) {
      return Todate(date);
    },
    addLevel() {
      let vm = this;
      if (!vm.level || !vm.sort) {
        this.$Message["warning"]({
          background: true,
          content: "请输入等级名称以及对应的等级！"
        });
        return;
      }
      this.$Spin.show();
      http
        .post(api.INSERTLEVELCONFIG, {
          level: vm.level,
          sort: Number(vm.sort)
        },this)
        .then(resp => {
          this.$Spin.hide();
          if (resp.data.success) {
            this.$Message["success"]({
              background: true,
              content: "新增成功"
            });
            this.getConfig();
          } else {
            this.$Message["error"]({
              background: true,
              content: resp.data.message
            });
          }
        });
    },
    deleteLevel(item) {
      this.$Spin.show();
      http
        .delete(api.DELETELEVELCONFIG, {
          ID: item.id
        },this)
        .then(resp => {
          this.$Spin.hide();
          if (resp.data.success) {
            this.$Message["success"]({
              background: true,
              content: "删除成功"
            });
            this.getConfig();
          } else {
            this.$Message["error"]({
              background: true,
              content: resp.data.message
            });
          }
        });
    },
    commitAdd() {
      let vm = this;
      if (!vm.formItem.boundaryID) {
        this.$Message["warning"]({
          background: true,
          content: "请选择学区"
        });
        return;
      } else if (!vm.formItem.streetName) {
        this.$Message["warning"]({
          background: true,
          content: "请选择街道"
        });
        return;
      } else if (!vm.formItem.communityID) {
        this.$Message["warning"]({
          background: true,
          content: "请选择社区"
        });
        return;
      } else if (!vm.formItem.smallCommunityName) {
        this.$Message["warning"]({
          background: true,
          content: "请填写小区名称"
        });
        return;
      }
      let params = {
        boundaryID: this.formItem.boundaryID,
        communityID: this.formItem.communityID,
        smallCommunityName: this.formItem.smallCommunityName
      };
      this.$Spin.show();
      http.post(api.COMMUNITYCONFIG, params,this).then(resp => {
        this.$Spin.hide();
        if (resp.data.success) {
          this.$Message["success"]({
            background: true,
            content: "新增成功"
          });
          this.isShowAdd = false;
          this.getConfig();
        } else {
          this.$Message["error"]({
            background: true,
            content: resp.data.message
          });
        }
      });
    },
    cancel() {
      this.isShowAdd = false;
    },
    commitDelete() {
      this.$Spin.show();
      http
        .delete(api.DELETESMALLCOMMUNITY, {
          smallCommunityID: this.deleteID
        },this)
        .then(resp => {
          this.$Spin.hide();
          if (resp.data.success) {
            this.$Message["success"]({
              background: true,
              content: "删除成功"
            });
            this.isShowDelete = false;
            this.getConfig();
          } else {
            this.$Message["error"]({
              background: true,
              content: resp.data.message
            });
          }
        });
    },
    deleteSmallCommunity(params) {
      this.deleteID = params.row.smallCommunityID;
      this.isShowDelete = true;
    },
    add() {
      this.isShowAdd = true;
      this.formItem = {
        boundaryID: "",
        streetName: "",
        communityID: "",
        smallCommunityName: ""
      };
    }
  }
};
</script>

<style lang="less" scoped>
@font-color: #64b3ed;
#config-module {
  flex: 1;
  display: flex;
  flex-direction: column;
  .main {
    flex: 1;
    display: flex;
    .left {
      flex: 1;
      display: flex;
      flex-direction: column;
      background: #ffffff;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
      background: #ffffff;
      border: 1px solid #ccd4df;
      margin: 20px 20px 0 40px;
      .birthday-config,
      .start-time,
      .level-config {
        // flex: 1;
        .header {
          font-size: 16px;
          font-weight: bold;
          height: 24px;
          border-left: 4px solid #64b3ed;
          padding-left: 15px;
          margin-top: 20px;
        }
        .date,
        .levels {
          padding: 0 20px 0px 25px;
          .label {
            margin: 20px 0 10px 0;
          }
          .add-input {
            display: inline-block;
            margin-left: 10px;
            position: relative;
            width: 150px;
            .add {
              position: absolute;
              right: 20px;
              top: 50%;
              transform: translateY(-50%);
              cursor: pointer;
              color: @font-color;
            }
          }
          .level-list {
            display: flex;
            margin-top: 10px;
            flex-wrap: wrap;
            .level-item {
              min-width: 80px;
              height: 38px;
              background: #ffffff;
              border: 1px solid #ccd4df;
              border-radius: 4px;
              font-size: 14px;
              color: #a0aec0;
              letter-spacing: 1.7px;
              margin-right: 20px;
              line-height: 38px;
              padding-left: 20px;
              margin-bottom: 10px;
              i {
                float: right;
                font-size: 18px;
                color: #f56565;
                cursor: pointer;
                margin-top: 10px;
              }
            }
          }
        }
      }
      .birthday-config {
        flex: 2;
      }
      .start-time {
        flex: 2;
      }
      .level-config {
        flex: 3;
      }
    }
    .right {
      flex: 1;
      background: #ffffff;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
      border: 1px solid #ccd4df;
      margin: 20px 40px 0 20px;
      display: flex;
      flex-direction: column;
      .relation-config {
        flex: 1;
        .header {
          font-size: 16px;
          font-weight: bold;
          height: 24px;
          border-left: 4px solid #64b3ed;
          padding-left: 15px;
          margin-top: 20px;
        }
        .relation {
          padding: 10px 0 0 25px;
          .add {
            display: flex;
            justify-content: flex-end;
            padding-right: 20px;
            padding-bottom: 20px;
          }
          .list {
            padding-right: 20px;
            max-height: 500px;
            overflow-y: auto;
            margin-bottom: 40px;
          }
        }
      }
    }
  }
  .bottom {
    flex: 1;
    position: relative;
    .confirm-button {
      background: @font-color;
      border-radius: 21px;
      width: 110px;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 16px;
      cursor: pointer;
      letter-spacing: 10px;
      text-indent: 10px;
    }
  }
}
</style>