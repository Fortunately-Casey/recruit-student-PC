<template>
  <div id="article-list">
    <div class="search-tab">
      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline style="height:32px">
        <FormItem prop="title">
          <Input type="text" v-model="formInline.title" placeholder="标题" style="width:300px" />
        </FormItem>
        <FormItem prop="issuer">
          <Input type="text" v-model="formInline.issuer" placeholder="发布人" />
        </FormItem>
        <FormItem prop="date">
          <DatePicker type="date" placeholder="发布日期" style="width: 200px"></DatePicker>
        </FormItem>
        <FormItem>
          <Button type="primary">查询</Button>
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
export default {
  data() {
    return {
      formInline: {
        title: "",
        studentName: "",
        issuer: "",
        date: ""
      },
      h_school: "",
      ruleInline: {},
      columns: [
        {
          title: "序号",
          key: "index",
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
          key: "url",
          align: "center",
          width: 500
        },
        {
          title: "发布人",
          key: "issuer",
          align: "center",
          width: 100
        },
        {
          title: "发布时间",
          key: "date",
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
                  }
                },
                "详情"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style:{
                    marginLeft:"10px"
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      list: [
        {
          index: 1,
          title: "平凡人做非凡事",
          url: "http://www.ntskfqjyzx.edu/articles/2019-031001.html",
          issuer: "admin",
          date: "2020/03/10 12:04:32"
        },
        {
          index: 2,
          title: "自得其乐是一种能力",
          url: "http://www.ntskfqjyzx.edu/articles/2019-031001.html",
          issuer: "admin",
          date: "2020/03/10 12:04:32"
        }
      ],
      total: 100,
      pageSize: 10,
      pageIndex: 1,
      loading: false
    };
  },
  methods: {
    changePage() {}
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