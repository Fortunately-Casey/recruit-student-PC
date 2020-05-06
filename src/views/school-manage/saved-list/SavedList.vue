<template>
  <div id="saved-list">
    <div class="search-tab">
      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline style="height:32px">
        <FormItem prop="studentName">
          <div style="position:relative" @mouseover="highlightText" @mouseout="normalText">
            <Input type="text" v-model="formInline.name" style="width:220px" />
            <span class="student-name">
              <span class="title" :class="{'highlight-on':h_school}">学生姓名</span>
            </span>
          </div>
        </FormItem>
        <FormItem prop="idCard">
          <Input type="text" v-model="formInline.idCard" placeholder="身份证号" />
        </FormItem>
        <FormItem prop="phone">
          <Input type="text" v-model="formInline.linkPhone" placeholder="联系电话" />
        </FormItem>
        <FormItem>
          <Button type="primary" @click="search">查询</Button>
          <Button type="warning" @click="reload" style="margin-left:10px">重置</Button>
        </FormItem>
      </Form>
    </div>
    <div class="list">
      <Table :columns="columns" :data="list" :loading="loading"></Table>
      <div class="page">
        <Page :total="total" :page-size="pageSize" :current="pageIndex" @on-change="changePage" />
      </div>
    </div>
    <Modal v-model="isShowDelete" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>删除学生</span>
      </p>
      <div style="text-align:center">
        <p>确认是否删除该学生信息?</p>
      </div>
      <div slot="footer" style="text-align:center">
        <Button type="error" size="large" @click="commitDelete">删除</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import $ from "jquery";
import * as api from "@/service/apiList";
import http from "@/service/service";
export default {
  data() {
    return {
      isShowDelete: false,
      formInline: {
        name: "",
        idCard: "",
        linkPhone: ""
      },
      h_school: "",
      ruleInline: {},
      columns: [
        {
          title: "序号",
          key: "rowNumber",
          align: "center",
          width:100
        },
        {
          title: "学生姓名",
          key: "name",
          align: "center"
        },
        {
          title: "出生年月",
          key: "birthday",
          align: "center"
        },
        {
          title: "身份证号",
          key: "idCard",
          align: "center"
        },
        {
          title: "户口所在地",
          key: "permanentAddress",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.provincesName +
                  params.row.cityName +
                  params.row.areaName
              )
            ]);
          }
        },
        {
          title: "现居住小区",
          key: "smallCommunityName",
          align: "center"
        },
        {
          title: "预报名学校",
          key: "schoolName",
          align: "center"
        },
        {
          title: "是否有房产",
          key: "hasHouse",
          align: "center",
          render: (h, params) => {
            return h("div", [h("span", params.row.property ? "是" : "否")]);
          }
        },
        {
          title: "操作",
          key: "option",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.editStudent(params);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginLeft: "10px"
                  },
                  on: {
                    click: () => {
                      this.deleteStudent(params);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      list: [],
      total: 0,
      pageSize: 10,
      pageIndex: 1,
      loading: false,
      deleteID: false
    };
  },
  created() {
    this.getSaveList();
  },
  mounted() {
  },
  methods: {
    editStudent(params) {
      this.$router.push({
        path: "/schoolManage/addChild",
        query: {
          id: params.row.id
        }
      });
    },
    deleteStudent(params) {
      this.deleteID = params.row.id;
      this.isShowDelete = true;
    },
    commitDelete() {
      let vm = this;
      http
        .delete(api.DELETESTUDENTBYID, {
          studentID: vm.deleteID
        },this)
        .then(resp => {
          if (resp.data.success) {
            vm.$Message.success("删除成功！");
            vm.getSaveList();
            vm.isShowDelete = false;
          } else {
            vm.$Message.error("删除失败！");
          }
        });
    },
    search() {
      this.getSaveList();
    },
    reload() {
      this.formInline = {
        name: "",
        idCard: "",
        linkPhone: ""
      };
      this.getSaveList();
    },
    getSaveList() {
      let vm = this;
      this.$Spin.show();
      http
        .post(api.GETSTUDENTLISTPAGE, {
          name: vm.formInline.name,
          idCard: vm.formInline.idCard,
          linkPhone: vm.formInline.linkPhone,
          commitStatus: 0,
          auditStatus: 0,
          currPage: vm.pageIndex,
          pageSize: vm.pageSize
        },this)
        .then(resp => {
          this.$Spin.hide();
          vm.list = resp.data.data;
          vm.total = resp.data.page.totalCount;
        });
    },
    highlightText() {
      this.h_school = true;
    },
    normalText() {
      if (
        $("#school")
          .find("input")
          .is(":focus")
      )
        return;
      this.h_school = false;
    },
    changePage(page) {
      this.pageIndex = page;
      this.getSaveList();
    }
  }
};
</script>

<style lang="less" scoped>
@font-color: #64b3ed;
#saved-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  .search-tab {
    padding: 12px 40px 0 40px;
    .student-name {
      background-color: #edf1f7;
      position: absolute;
      left: 30px;
      padding: 0 10px;
      top: -7px;
      height: 10px;
      line-height: 1;
      color: #ccd4df;
      .title {
        color: #ccd4df;
        font-size: 10px;
        position: relative;
        top: 0;
      }
    }
    .student-name {
      .highlight-on {
        color: @font-color;
      }
    }
  }
  .list {
    flex: 1;
    -webkit-background-size: 100%;
    background-size: 100%;
    padding: 12px 0 0 0;
    position: relative;
    .page {
      text-align: center;
      margin-top: 20px;
    }
  }
}
</style>