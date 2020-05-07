<template>
  <div id="print-page" style="height:100%">
    <div class="header">{{schoolName}}教育集团一年级新生登记表</div>
    <div class="regist-number">
      <div class="name">登记编号：{{forecastCode}}</div>
    </div>
    <div class="info-box">
      <div class="tep1">
        <div class="student-name">学生姓名</div>
        <div class="value">{{name}}</div>
        <div class="birthday">出生年月</div>
        <div class="value">{{birthday}}</div>
      </div>
      <div class="tep2">
        <div class="student-idCard">学生身份证</div>
        <div class="value">{{idCard}}</div>
        <div class="sex">性别</div>
        <div class="value">{{sex == 1? '男':"女"}}</div>
      </div>
      <div class="tep3">
        <div class="address">户口所在地</div>
        <div class="value">{{ provincesName + cityName + areaName }}</div>
      </div>
      <div class="tep4" v-if="property">
        <div class="house-number">房产证号/发票号</div>
        <div class="value">{{houseNumbers}}</div>
      </div>
      <div class="tep4" v-else>
        <div class="live-date">居住证有效期</div>
        <div class="value">{{permitResidencePeriod}}</div>
        <div class="work-date">劳动合同有效期</div>
        <div class="value">{{laborContractPeriod}}</div>
      </div>
      <div class="tep5" v-if="property">
        <div class="house-owner">房产所有人</div>
        <div style="width:200px;font-size:22px;text-align:center">{{houseOwner}}</div>
        <div class="relation">与所有人关系</div>
        <div class="value" style="width:200px;"></div>
        <div class="house-nature">房产性质</div>
        <div class="value">{{returnNature(houseNature)}}</div>
      </div>
      <div class="tep5" v-else>
        <div class="house-owner">养老保险所在地</div>
        <div class="value">{{pensionUnitsAddress}}</div>
      </div>
      <div class="tep6">
        <div class="house-owner">小区</div>
        <div style="width:200px;font-size:22px;text-align:center">{{smallCommunityName}}</div>
      </div>
      <div class="tep7">
        <div class="address">分配校区</div>
        <div class="value">{{schoolName}}</div>
      </div>
      <div class="tep8">
        <div class="value">家庭成员</div>
      </div>
      <div class="tep9">
        <div class="call">称呼</div>
        <div class="name">姓名</div>
        <div class="factory">工作单位</div>
        <div class="phone">联系电话</div>
      </div>
      <div class="tep10">
        <div class="call">{{returnRelation(parents[0].relation)}}</div>
        <div class="name">{{parents[0].name}}</div>
        <div class="factory">{{parents[0].workAddress}}</div>
        <div class="phone">{{parents[0].linkPhone}}</div>
      </div>
      <div class="tep11">
        <div class="call">{{returnRelation(parents[1].relation)}}</div>
        <div class="name">{{parents[1].name}}</div>
        <div class="factory">{{parents[1].workAddress}}</div>
        <div class="phone">{{parents[1].linkPhone}}</div>
      </div>
    </div>
    <div class="line" v-if="isShowAlternative"></div>
    <div class="grade" v-if="isShowAlternative">
      新河校区打分
      <div class="next-school">
        <div class="name">第二校区选择：</div>
        <div class="school">{{alternativeSchoolName}}</div>
      </div>
    </div>
    <div class="grade-table">
      <div class="top" v-if="isShowAlternative">
        <div class="left-name" style="border-left:1px solid #000">打分自评</div>
        <div class="content">
          <div class="one">
            <div class="house">房产</div>
            <div class="residence">户口</div>
          </div>
          <div class="two">
            <div class="house-date">
              <div class="input"></div>年
              <div class="input"></div>月
              <div class="input"></div>日
              共
              <div class="input"></div>年
              <div class="input"></div>月
            </div>
            <div class="residence-date">
              <div class="input"></div>年
              <div class="input"></div>月
              <div class="input"></div>日
              共
              <div class="input"></div>年
              <div class="input"></div>月
            </div>
          </div>
          <div class="three">小计</div>
          <div class="four">
            <div class="four-top"></div>
            <div class="four-bottom"></div>
          </div>
          <div class="five">合计</div>
          <div class="six" style="border-right:1px solid #000"></div>
        </div>
      </div>
      <div class="bottom" v-if="isShowAlternative">
        <div class="school-audit" style="border-left:1px solid #000">学校审核</div>
        <div class="one">房产得分</div>
        <div class="two"></div>
        <div class="three">户口得分</div>
        <div class="four" style="width:180px"></div>
        <div class="five">合计</div>
        <div class="six" style="border-right:1px solid #000;flex:1"></div>
      </div>
      <div class="commitment-box1" v-if="isShowAlternative">
        <div class="one">
          本人承诺：如有弄虚作假，提供虚假材料的，一经发现，对其一入学子女作退学或转学处理，由此产生的不良影响，本人愿意承担一切后果。
          <div class="commitment-person">承诺人：</div>
        </div>
        <div class="two">
          <div class="remark">备注</div>
        </div>
      </div>
      <div class="commitment-box2" v-else>
        <div class="one">
          本人承诺：如有弄虚作假，提供虚假材料的，一经发现，对其一入学子女作退学或转学处理，由此产生的不良影响，本人愿意承担一切后果。
          <div class="commitment-person">承诺人：</div>
        </div>
        <div class="two">
          <div class="remark">备注</div>
        </div>
      </div>
      <div class="signature">
        <div class="one">登记人签字：</div>
        <div class="two">审核人签字：</div>
        <div class="three">终审签字：</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from "@/service/apiList";
import http from "@/service/service";
export default {
  data() {
    return {
      isShowAlternative:true,
      property:false,
      schoolName: "",
      forecastCode: "",
      name: "",
      birthday: "",
      idCard: "",
      sex: "",
      provincesName: "",
      cityName: "",
      areaName: "",
      houseNumbers: "",
      houseOwner: "",
      houseNature: "",
      smallCommunityName: "",
      detailAddress: "",
      laborContractPeriod:"",
      permitResidencePeriod:"",
      pensionUnitsAddress:"",
      alternativeSchoolName:"",
      parents: [
        {
          sort: 1,
          idCard: "",
          linkPhone: "",
          name: "",
          relation: 1,
          workAddress: ""
        },
        {
          sort: 2,
          idCard: "",
          linkPhone: "",
          name: "",
          relation: "",
          workAddress: ""
        }
      ]
    };
  },
  created() {
    if (this.$route.query.id) {
      this.getStudentDetail(this.$route.query.id);
    }
  },
  mounted() {},
  methods: {
    getStudentDetail(id) {
      this.$Spin.show();
      let vm = this;
      http
        .get(api.GETSTUDENTDETAIL, {
          ID: id
        },this)
        .then(resp => {
          this.$Spin.hide();
          vm.schoolName = resp.data.data.schoolName;
          vm.forecastCode = resp.data.data.forecastCode;
          vm.name = resp.data.data.name;
          vm.birthday = resp.data.data.birthday;
          vm.idCard = resp.data.data.idCard;
          vm.sex = resp.data.data.sex;
          vm.provincesName = resp.data.data.provincesName;
          vm.cityName = resp.data.data.cityName;
          vm.areaName = resp.data.data.areaName;
          vm.houseNumbers = resp.data.data.houseNumbers;
          vm.houseOwner = resp.data.data.houseOwner;
          vm.houseNature = resp.data.data.houseNature;
          vm.smallCommunityName = resp.data.data.smallCommunityName;
          vm.detailAddress = resp.data.data.detailAddress;
          vm.parents = resp.data.data.parents;
          vm.laborContractPeriod = resp.data.data.laborContractPeriod;
          vm.pensionUnitsAddress = resp.data.data.pensionUnitsAddress;
          vm.permitResidencePeriod = resp.data.data.permitResidencePeriod;
          vm.alternativeSchoolName = resp.data.data.alternativeSchoolName;
          if(resp.data.data.school.schoolCode  != '0401') {
            vm.isShowAlternative = false;
          }else {
            vm.isShowAlternative = true;
          }
          if(resp.data.data.property) {
            vm.property = true;
          }else {
            vm.property = false;
          }
          setTimeout(() => {
            window.print();
          }, 1000);
        });
    },
    returnNature(type) {
      if (type == 1) {
        return "父母房产";
      } else if (type == 2) {
        return "祖父母房产";
      } else if (type == 3) {
        return "期房";
      }
    },
    returnRelation(index) {
      if (index == 1) {
        return "父亲";
      } else if (index == 2) {
        return "母亲";
      } else if (index == 3) {
        return "爷爷";
      } else if (index == 4) {
        return "奶奶";
      } else if (index == 5) {
        return "外公";
      } else if (index == 6) {
        return "外婆";
      } else if (index == 7) {
        return "其他监护人";
      }
    }
  }
};
</script>

<style lang="less" scoped>
#print-page {
  height: 100%;
  // border: 1px solid #000;
  width: 1050px;
  padding: 0 60px;
  position: relative;
  .header {
    font-size: 40px;
    text-align: center;
    font-family: "宋体";
    font-weight: bold;
    padding: 15px 200px;
  }
  .regist-number {
    height: 50px;
    .name {
      font-size: 20px;
      height: 40px;
    }
  }
  .info-box {
    height: 550px;
    border-top: 1px solid #000;
    border-left: 1px solid #000;
    border-right: 1px solid #000;
    .tep1,
    .tep2,
    .tep3,
    .tep4,
    .tep5,
    .tep6,
    .tep7,
    .tep8,
    .tep9,
    .tep10,
    .tep11 {
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #000;
      display: flex;
      .student-name,
      .birthday,
      .student-idCard,
      .sex,
      .address,
      .house-owner,
      .call,
      .name,
      .phone {
        width: 200px;
        text-align: center;
        font-size: 22px;
        border-right: 1px solid #000;
      }
      .relation {
        width: 180px;
        text-align: center;
        font-size: 22px;
        border-right: 1px solid #000;
        border-left: 1px solid #000;
      }
      .phone {
        border-right: 0;
      }
      .house-nature {
        width: 100px;
        text-align: center;
        font-size: 22px;
        border-right: 1px solid #000;
        border-left: 1px solid #000;
      }
      .house-number {
        width: 400px;
        text-align: center;
        font-size: 22px;
        border-right: 1px solid #000;
      }
      .live-date {
        width: 200px;
        text-align: center;
        font-size: 22px;
        border-right: 1px solid #000;
      }
      .work-date {
        width: 200px;
        text-align: center;
        font-size: 22px;
        border-right: 1px solid #000;
        border-left: 1px solid #000;
      }
      .birthday,
      .sex {
        border-left: 1px solid #000;
      }
      .factory {
        border-right: 1px solid #000;
      }
      .value,
      .factory {
        flex: 1;
        text-align: center;
        font-size: 22px;
      }
    }
  }
  .line {
    border-top: 1px solid #000;
    margin: 20px 0;
  }
  .grade {
    height: 50px;
    display: flex;
    font-size: 22px;
    position: relative;
    .next-school {
      width: 400px;
      position: absolute;
      right: 0;
      top: 0;
      display: flex;
      .name {
        width: 180px;
        font-size: 22px;
      }
      .school {
        flex: 1;
        border-bottom: 1px solid #000;
        line-height: 25px;
        font-size: 22px;
      }
    }
  }
  .grade-table {
    border-top: 1px solid #000;
    // border-left: 1px solid #000;
    // border-right: 1px solid #000;
    height: 200px;
    .top {
      height: 100px;
      display: flex;
      border-bottom: 1px solid #000;
      .left-name {
        width: 70px;
        font-size: 22px;
        line-height: 50px;
        padding: 0 10px;
        border-right: 1px solid #000;
      }
      .content {
        flex: 1;
        display: flex;
        line-height: 50px;
        .one {
          width: 80px;
          border-right: 1px solid #000;
          .house {
            height: 50%;
            font-size: 22px;
            text-align: center;
            border-bottom: 1px solid #000;
          }
          .residence {
            height: 50%;
            font-size: 22px;
            text-align: center;
          }
        }
        .two {
          flex: 1;
          border-right: 1px solid #000;
          .house-date {
            height: 50%;
            font-size: 20px;
            text-align: center;
            border-bottom: 1px solid #000;
            display: flex;
            .input {
              width: 40px;
            }
          }
          .residence-date {
            height: 50%;
            font-size: 20px;
            text-align: center;
            display: flex;
            .input {
              width: 40px;
            }
          }
        }
        .three {
          width: 50px;
          border-right: 1px solid #000;
          line-height: 35px;
          font-size: 22px;
          padding: 10px;
        }
        .four {
          width: 100px;
          border-right: 1px solid #000;
          .four-top,
          .four-bottom {
            height: 50%;
          }
          .four-top {
            border-bottom: 1px solid #000;
          }
        }
        .five {
          width: 100px;
          font-size: 22px;
          text-align: center;
          line-height: 100px;
          border-right: 1px solid #000;
        }
        .six {
          width: 150px;
        }
      }
    }
    .bottom {
      height: 100px;
      display: flex;
      border-bottom: 1px solid #000;
      .school-audit {
        width: 70px;
        line-height: 50px;
        font-size: 22px;
        padding: 0 10px;
        border-right: 1px solid #000;
      }
      .one {
        font-size: 22px;
        width: 80px;
        line-height: 35px;
        text-align: center;
        padding: 10px;
        border-right: 1px solid #000;
      }
      .two {
        width: 158px;
        border-right: 1px solid #000;
      }
      .three {
        width: 180px;
        padding: 0 58px;
        font-size: 22px;
        line-height: 45px;
        border-right: 1px solid #000;
        text-align: center;
      }
      .four {
        width: 50px;
        border-right: 1px solid #000;
        line-height: 35px;
        font-size: 22px;
        padding: 10px;
      }
      .five {
        width: 100px;
        border-right: 1px solid #000;
        font-size: 22px;
        text-align: center;
        line-height: 100px;
      }
      .six {
        width: 100px;
      }
    }
    .commitment-box1 {
      margin-top: 20px;
      height: 250px;
      border-top: 1px solid #000;
      border-left: 1px solid #000;
      border-right: 1px solid #000;
      .one,
      .two {
        height: 50%;
        border-bottom: 1px solid #000;
        text-indent: 30px;
        font-size: 20px;
        position: relative;
        .commitment-person {
          font-size: 20px;
          position: absolute;
          right: 200px;
          bottom: 10px;
        }
        .remark {
          height: 100%;
          width: 200px;
          border-right: 1px solid #000;
          font-size: 22px;
          line-height: 100px;
          text-align: center;
        }
      }
    }
    .commitment-box2 {
      margin-top: 20px;
      height: 550px;
      border-top: 1px solid #000;
      border-left: 1px solid #000;
      border-right: 1px solid #000;
      .one,
      .two {
        // height: 50%;
        border-bottom: 1px solid #000;
        text-indent: 30px;
        font-size: 20px;
        position: relative;
        .commitment-person {
          font-size: 20px;
          position: absolute;
          right: 200px;
          bottom: 10px;
        }
        .remark {
          height: 100%;
          width: 200px;
          border-right: 1px solid #000;
          font-size: 22px;
          line-height: 100px;
          text-align: center;
        }
      }
      .one {
        height: 65%;
      }
      .two {
        height: 35%;
      }
    }
    .signature {
      height: 50px;
      display: flex;
      margin-top: 30px;
      .one,
      .two,
      .three {
        flex: 1;
        font-size: 22px;
      }
    }
  }
}
</style>