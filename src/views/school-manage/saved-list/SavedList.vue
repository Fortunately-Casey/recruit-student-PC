<template>
  <div id="saved-list">
    <div class="search-tab">
      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline style="height:32px">
        <FormItem prop="number">
          <Input type="text" v-model="formInline.number" placeholder="报名号" />
        </FormItem>
        <FormItem prop="studentName">
          <div style="position:relative" @mouseover="highlightText" @mouseout="normalText">
            <Input type="text" v-model="formInline.studentName" style="width:220px" />
            <span class="student-name">
              <span class="title" :class="{'highlight-on':h_school}">学生姓名</span>
            </span>
          </div>
        </FormItem>
        <FormItem prop="idCard">
          <Input type="text" v-model="formInline.idCard" placeholder="身份证号" />
        </FormItem>
        <FormItem prop="phone">
          <Input type="text" v-model="formInline.phone" placeholder="联系电话" />
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
        number: "",
        studentName: "",
        idCard: "",
        phone: ""
      },
      h_school: "",
      ruleInline: {},
      columns: [
        {
          title: "序号",
          key: "index",
          align: "center"
        },
        {
          title: "预报名号",
          key: "code",
          align: "center"
        },
        {
          title: "学生姓名",
          key: "studentName",
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
          align: "center"
        },
        {
          title: "现居住小区",
          key: "nowAddress",
          align: "center"
        },
        {
          title: "预报名学校",
          key: "applySchool",
          align: "center"
        },
        {
          title: "是否有房产",
          key: "hasHouse",
          align: "center"
        },
        {
          title: "操作",
          key: "option",
          align: "center"
        }
      ],
      list: [
        {
          index:1,
          code:"111"
        }
      ],
      total: 100,
      pageSize: 10,
      pageIndex: 1,
      loading: false
    };
  },
  methods: {
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
    changePage() {}
  }
};
</script>

<style lang="less" scoped>
@font-color: #64B3ED;
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