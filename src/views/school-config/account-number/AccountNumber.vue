<template>
  <div class="account-number">
    <div class="list">
      <Table :columns="columns" :data="list" ></Table>
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
      isShowPassword:false,
      password:"",
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
      list: []
    };
  },
  created() {
    this.getParentAccountBySchoolID();
  },
  methods: {
    getParentAccountBySchoolID() {
      this.$Spin.show();
      http.get(api.GETPARENTACCOUNTBYSCHOOLID).then(resp => {
        this.$Spin.hide();
        this.list = resp.data.data;
      });
    },
    showDetail(params) {
      this.password = params.row.password;
      this.isShowPassword = true;
    }
  }
};
</script>

<style lang="less" scoped>
.account-number {
  flex: 1;
  padding: 40px;
  display: flex;
  .list {
    flex: 1;
    background: #ffffff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>