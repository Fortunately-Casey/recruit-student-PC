<template>
  <div class="account-number">
    <div class="search-tab">
      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline style="height:32px">
        <FormItem prop="adminUser">
          <Input type="text" v-model="formInline.adminUser" placeholder="用户名" />
        </FormItem>
        <FormItem>
          <Button type="primary" @click="search">查询</Button>
          <Button type="warning" @click="reload" style="margin-left:10px">重置</Button>
        </FormItem>
      </Form>
    </div>
    <div class="list">
      <Table :columns="columns" :data="list"></Table>
      <div class="page">
        <Page :total="total" :page-size="pageSize" :current="currPage" @on-change="changePage" />
      </div>
    </div>
    <Modal v-model="isShowPassword" title="密码" width="400" footer-hide>
      <p>{{password}}</p>
    </Modal>
  </div>
</template>

<script>
import * as api from "@/service/apiList";
import http from "@/service/service";
export default {
  data() {
    return {
      isShowPassword: false,
      password: "",
      columns: [
        {
          title: "序号",
          key: "index",
          align: "center",
          type: "index"
        },
        {
          title: "用户名",
          key: "adminUserID",
          align: "center"
        },
        {
          title: "创建时间",
          key: "createTime",
          align: "center"
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
                    type: "primary",
                    size: "small"
                  },
                  style: {},
                  on: {
                    click: () => {
                      this.showDetail(params);
                    }
                  }
                },
                "查看密码"
              )
            ]);
          }
        }
      ],
      formInline:{  
        adminUser:""
      },
      ruleInline:{},
      currPage: 1,
      pageSize: 10,
      total: 0,
      list: []
    };
  },
  created() {
    this.getParentAccountBySchoolID();
  },
  methods: {
    getParentAccountBySchoolID() {
      let vm = this;
      this.$Spin.show();
      http
        .post(api.GETPARENTACCOUNTBYSCHOOLID, {
          currPage: vm.currPage,
          pageSize: vm.pageSize,
          adminUser: vm.formInline.adminUser
        })
        .then(resp => {
          this.$Spin.hide();
          this.list = resp.data.data;
          vm.total = resp.data.page.totalCount;
        });
    },
    showDetail(params) {
      this.password = params.row.password;
      this.isShowPassword = true;
    },
    search() {
      this.currPage = 1;
      this.getParentAccountBySchoolID();
    },
    reload() {
      this.currPage = 1;
      this.formInline.adminUser = "";
      this.getParentAccountBySchoolID();
    },
    changePage(page) {
      this.currPage = page;
      this.getParentAccountBySchoolID();
    }
  }
};
</script>

<style lang="less" scoped>
.account-number {
  flex: 1;
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  .search-tab {
    padding: 12px 40px 12px 40px;
  }
  .list {
    flex: 1;
    background: #ffffff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    .page {
      text-align: center;
      margin-top: 20px;
    }
  }
}
</style>