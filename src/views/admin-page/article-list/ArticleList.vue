<template>
  <div id="article-list">
    <div class="search-tab">
      <Form ref="formInline" :model="formInline" inline style="height:32px">
        <FormItem prop="title">
          <Input type="text" v-model="formInline.title" placeholder="标题" style="width:300px" />
        </FormItem>
        <FormItem>
          <Button type="primary" @click="print">查询</Button>
        </FormItem>
      </Form>
    </div>
    <div class="list">
      <Table :columns="columns" :data="newsList" :loading="loading"></Table>
      <div class="page">
        <Page :total="total" :page-size="pageSize" :current="pageIndex" @on-change="changePage" />
      </div>
    </div>
    <Modal v-model="isShowDelete" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>删除新闻</span>
      </p>
      <div style="text-align:center">
        <p>确认是否删除该条新闻?</p>
      </div>
      <div slot="footer" style="text-align:center">
        <Button type="error" size="large" @click="commitDelete">删除</Button>
      </div>
    </Modal>
    <Modal v-model="isShowEdit" title="新闻编辑" @on-cancel="cancel">
      <Form :model="formItem" :label-width="100" style="width:400px">
        <FormItem label="新闻标题">
          <Input v-model="formItem.title" placeholder="请输入新闻标题" />
        </FormItem>
        <FormItem label="新闻链接">
          <Input v-model="formItem.url" placeholder="请输入新闻链接" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="isShowEdit=false">取消</Button>
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
      formInline: {
        title: ""
      },
      isShowEdit: false,
      isShowDelete: false,
      columns: [
        {
          title: "序号",
          key: "rowNumber",
          align: "center",
          width: 100
        },
        {
          title: "文章标题",
          key: "title",
          align: "center",
          width: 500
        },
        {
          title: "文章链接",
          key: "titleUrl",
          align: "center",
          width: 500
        },
        {
          title: "发布时间",
          key: "createTime",
          align: "center",
          width: 300
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
                      this.editNews(params);
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
                      this.deleteNews(params);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      formItem: {
        title: "",
        url: "",
        id: ""
      },
      newsList: [],
      total: 100,
      pageSize: 10,
      pageIndex: 1,
      loading: false,
      deleteID: ""
    };
  },
  mounted() {
    this.$nextTick(function() {
      this.getNewsList();
    });
  },
  methods: {
    getNewsList() {
      let vm = this;
      this.$Spin.show();
      http
        .post(api.GETNEWSLIST, {
          currPage: vm.pageIndex,
          pageSize: vm.pageSize,
          title: vm.formInline.title
        },this)
        .then(resp => {
          this.$Spin.hide();
          this.newsList = resp.data.data;
          vm.total = resp.data.page.totalCount;
        });
    },
    changePage(page) {
      this.pageIndex = page;
      this.getNewsList();
    },
    editNews(params) {
      this.isShowEdit = true;
      this.formItem.title = params.row.title;
      this.formItem.id = params.row.id;
      this.formItem.url = params.row.titleUrl;
    },
    deleteNews(params) {
      this.isShowDelete = true;
      this.deleteID = params.row.id;
    },
    commitDelete() {
      http
        .delete(api.DELETENEWSCONFIG, {
          ID: this.deleteID
        },this)
        .then(resp => {
          if (resp.data.success) {
            this.isShowDelete = false;
            this.$Message["success"]({
              background: true,
              content: "删除成功"
            });
            this.getNewsList();
          } else {
            this.$Message["error"]({
              background: true,
              content: resp.data.message
            });
          }
        });
    },
    commitEdit() {
      let vm = this;
      http
        .post(api.UPDATENEWSCONFIG, {
          id: vm.formItem.id,
          title: vm.formItem.title,
          titleUrl: vm.formItem.url
        },this)
        .then(resp => {
          if (resp.data.success) {
            this.isShowEdit = false;
            this.$Message["success"]({
              background: true,
              content: "修改成功"
            });
            this.getNewsList();
          } else {
            this.$Message["error"]({
              background: true,
              content: resp.data.message
            });
          }
        });
    },
    cancel() {
      this.isShowEdit = false;
    },
    print() {
      this.getNewsList();
    }
  }
};
</script>

<style lang="less" scoped>
@font-color: #64b3ed;
#article-list {
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