<template>
  <div id="regist-list">
    <div class="search-tab">
      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline style="height:32px">
        <FormItem prop="number">
          <Input type="text" v-model="formInline.forecastCode" placeholder="报名号" />
        </FormItem>
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
  </div>
</template>
<script>
import $ from "jquery";
import * as api from "@/service/apiList";
import http from "@/service/service";
export default {
  data() {
    return {
      formInline: {
        forecastCode: "",
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
          width: 100
        },
        {
          title: "预报名号",
          key: "forecastCode",
          align: "center"
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
          title: "审核状态",
          key: "auditStatus",
          align: "center",
          render: (h, params) => {
            return h("div", [h("span",{
              style:{
                color:params.row.auditStatus === 1 ? "#48BB78" : "#F56565"
              }
            }, params.row.auditStatus === 1 ? "通过" : "不通过")]);
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
                      this.getDetail(params);
                    }
                  }
                },
                "详情"
              )
            ]);
          }
        }
      ],
      list: [],
      total: 0,
      pageSize: 10,
      pageIndex: 1,
      loading: false
    };
  },
  created() {
    this.getRegistList();
  },
  mounted() {},
  methods: {
    highlightText() {
      this.h_school = true;
    },
    getRegistList() {
      let vm = this;
      this.$Spin.show();
      http
        .post(api.GETSTUDENTLISTPAGE, {
          forecastCode: vm.formInline.forecastCode,
          name: vm.formInline.name,
          idCard: vm.formInline.idCard,
          linkPhone: vm.formInline.linkPhone,
          commitStatus: 1,
          auditStatus: 1,
          currPage: vm.pageIndex,
          pageSize: vm.pageSize
        },this)
        .then(resp => {
          this.$Spin.hide();
          vm.list = resp.data.data;
          vm.total = resp.data.page.totalCount;
        });
    },
    search() {
      this.getRegistList();
    },
    reload() {
      this.formInline = {
        forecastCode: "",
        name: "",
        idCard: "",
        linkPhone: ""
      };
      this.getRegistList();
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
      this.getRegistList();
    },
    getDetail(params) {
      this.$router.push({
        path: "/schoolAudit/auditChild",
        query: {
          id: params.row.id
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@font-color: #64b3ed;
#regist-list {
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