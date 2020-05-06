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
    <Modal v-model="isShowPassword" title="密码" width="400">
      <!-- <p>{{password}}</p> -->
      <Input v-model="newPassword" placeholder="请输入要修改的密码" />
      <Input v-model="confirmPassword" placeholder="确认密码" style="margin-top:10px"/>
      <div slot="footer">
        <Button type="text" size="large" @click="isShowPassword=false">取消</Button>
        <Button type="primary" size="large" @click="commitEdit">确定</Button>
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
      isShowPassword: false,
      password: "",
      newPassword: "",
      confirmPassword: "",
      adminUserID:"",
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
                "修改密码"
              )
            ]);
          }
        }
      ],
      formInline: {
        adminUser: ""
      },
      ruleInline: {},
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
      // console.log(params.row)
      this.password = params.row.password;
      this.adminUserID = params.row.adminUserID;
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
    },
    commitEdit() {
      let vm = this;
      if(!vm.newPassword || !vm.confirmPassword) {
        this.$Message.warning('请输入要修改的密码');
        return;
      }
      this.$Spin.show();
      http.post(api.PARENTACCOUNTCONFIG,{
        adminUserID:vm.adminUserID,
        password:vm.newPassword,
        confirmPassword:vm.confirmPassword
      },this).then((resp) => {
        this.$Spin.hide();
        if(resp.data.success) {
          this.$Message.success("修改成功！");
          vm.isShowPassword = false;
        }else {
          this.$Message.error(resp.data.message);
        }
      })
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