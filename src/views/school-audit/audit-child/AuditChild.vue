<template>
  <div class="add-child">
    <div class="add-main">
      <div class="left">
        <div class="forecast-code">
          <div class="header">
            预报名唯一码：
            <span style="font-size:18px;color:#64B3ED">{{forecastCode}}</span>
          </div>
        </div>
        <div class="student-info">
          <div class="header">学生信息</div>
          <div class="personage-info">
            <div class="name">
              <div class="label">姓名</div>
              <Input v-model="name" :disabled="isDisabled" />
            </div>
            <div class="idCard">
              <div class="label">身份证号</div>
              <Input v-model="idCard" :disabled="isDisabled" />
            </div>
            <div class="birthday">
              <div class="label">选择出生年月日</div>
              <DatePicker
                type="date"
                style="width: 200px"
                v-model="birthday"
                :disabled="isDisabled"
                @on-change="birthdayChange"
              ></DatePicker>
            </div>
          </div>
          <div class="address-info">
            <div class="residence-info">
              <Spin size="large" fix v-if="spinShow"></Spin>
              <div class="label">户口所在地</div>
              <div class="address-select">
                <Select
                  style="width:145px"
                  v-model="provinceID"
                  placeholder="选择省"
                  @on-change="seletcProvince"
                  :label-in-value="true"
                  :disabled="isDisabled"
                >
                  <Option
                    :value="item.id"
                    v-for="(item,index) in provinceList"
                    :key="index"
                  >{{item.name}}</Option>
                </Select>
                <Select
                  style="width:145px;margin-left:20px"
                  v-model="cityID"
                  placeholder="选择市"
                  :label-in-value="true"
                  @on-change="seletcCity"
                  :disabled="isDisabled"
                >
                  <Option
                    :value="item.id"
                    v-for="(item,index) in cityList"
                    :key="index"
                  >{{item.name}}</Option>
                </Select>
                <Select
                  style="width:145px;margin-left:20px"
                  v-model="areaID"
                  placeholder="选择区/县"
                  :label-in-value="true"
                  @on-change="seletcStreet"
                  :disabled="isDisabled"
                >
                  <Option
                    :value="item.id"
                    v-for="(item,index) in streetList"
                    :key="index"
                  >{{item.name}}</Option>
                </Select>
                <br />
                <Input
                  v-model="detailAddress"
                  style="width:475px;margin-top:20px"
                  placeholder="详细地址"
                  :disabled="isDisabled"
                />
              </div>
            </div>
            <div class="sex-info">
              <div class="label">性别</div>
              <RadioGroup v-model="sex">
                <Radio label="男" :disabled="isDisabled"></Radio>
                <Radio label="女" :disabled="isDisabled"></Radio>
              </RadioGroup>
            </div>
          </div>
          <div class="now-address">
            <Spin size="large" fix v-if="spinShow1"></Spin>
            <div class="housing-estate">
              <div class="label">现居住小区</div>
              <Select
                style="width:145px"
                v-model="streetId"
                placeholder="选择街道"
                @on-change="choseStreet"
                @on-open-change="selectOpen"
                :disabled="isDisabled"
              >
                <Option
                  :value="item.streetID"
                  v-for="(item,index) in street"
                  :key="index"
                >{{item.streetName}}</Option>
              </Select>
              <Select
                style="width:145px;margin-left:20px"
                v-model="communityId"
                placeholder="选择社区"
                @on-change="choseCommunity"
                @on-open-change="selectOpen"
                :disabled="isDisabled"
              >
                <Option
                  :value="item.id"
                  v-for="(item,index) in communityList"
                  :key="index"
                >{{item.name}}</Option>
              </Select>
              <Select
                style="width:145px;margin-left:20px"
                v-model="smallCommunityID"
                placeholder="选择小区"
                @on-change="choseSmallCommunity"
                @on-open-change="selectOpen"
                :label-in-value="true"
                :disabled="isDisabled"
              >
                <Option
                  :value="item.id"
                  v-for="(item,index) in smallCommunityList"
                  :key="index"
                >{{item.name}}</Option>
              </Select>
            </div>
            <div class="apply-school">
              <div class="label">预报名学校（系统自动生成）</div>
              <Input disabled style="width:200px" v-model="schoolName" />
            </div>
          </div>
          <div class="alternative-school" v-if="isShowAlternative">
            <div class="alternative">
              <div class="label">备选学校</div>
              <Select
                style="width:145px"
                v-model="alternativeSchoolID"
                placeholder="备选学校"
                @on-change="choseAlternative"
                :label-in-value="true"
                :disabled="isDisabled"
              >
                <Option
                  :value="item.schoolID"
                  v-for="(item,index) in schoolList"
                  :key="index"
                >{{item.schoolName}}</Option>
              </Select>
            </div>
            <div class="integral">
              <div class="label">积分</div>
              <Input
                placeholder="请输入积分"
                style="width:200px"
                v-if="isShowAlternative"
                v-model="point"
                :disabled="isDisabled"
              />
            </div>
          </div>
        </div>
        <div class="house-info">
          <div class="header">房产/居住信息</div>
          <div class="house-property">
            <div class="has-house">
              <div class="label">是否有房产</div>
              <RadioGroup v-model="hasHouse">
                <Radio label="是" :disabled="isDisabled || isDisableHasHouse"></Radio>
                <Radio label="否" :disabled="isDisabled || isDisableHasHouse"></Radio>
              </RadioGroup>
            </div>
            <div class="house-nature" v-if="hasHouse === '是'">
              <div class="label">房产性质</div>
              <Select
                style="width:180px;"
                v-model="houseNature"
                placeholder="请选择"
                :disabled="isDisabled"
              >
                <Option
                  :value="item.value"
                  v-for="(item,index) in houseNatureList"
                  :key="index"
                >{{item.text}}</Option>
              </Select>
            </div>
            <div class="house-owner" v-if="hasHouse === '是'">
              <div class="label">房产所有人</div>
              <Input v-model="houseOwner" style="width:180px" :disabled="isDisabled" />
            </div>
            <div class="live-date" v-if="hasHouse !== '是'">
              <div class="label">居住证有效期</div>
              <DatePicker
                type="date"
                style="width: 200px"
                v-model="permitResidencePeriod"
                :disabled="isDisabled"
              ></DatePicker>
            </div>
            <div class="contract-date" v-if="hasHouse !== '是'">
              <div class="label">劳动合同期限</div>
              <DatePicker
                type="date"
                style="width: 200px"
                v-model="laborContractPeriod"
                :disabled="isDisabled"
              ></DatePicker>
            </div>
          </div>
          <div class="get-house">
            <div class="get-time" v-if="hasHouse === '是'">
              <div class="label">取得/购买时间</div>
              <DatePicker type="date" style="width: 200px" v-model="buyDate" :disabled="isDisabled"></DatePicker>
            </div>
            <div class="house-code" v-if="hasHouse === '是'">
              <div class="label">房产登记号/房产发票号</div>
              <Input style="width:300px" v-model="houseNumbers" :disabled="isDisabled" />
            </div>
            <div class="insurance-address" v-if="hasHouse !== '是'">
              <div class="label">养老保险所在地</div>
              <Input style="width:300px" v-model="pensionUnitsAddress" :disabled="isDisabled" />
            </div>
          </div>
        </div>
        <div class="preschool-info">
          <div class="header">学前信息</div>
          <div class="school" v-if="schoolLabel">
            <div class="school-name">
              <div class="label">{{schoolLabel === 1?'幼儿园名称':"小学名称"}}</div>
              <Input style="width:300px" v-model="lastSchoolName" :disabled="isDisabled" />
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="top-info">
          <div class="patriarch-info">
            <div class="header">家长信息</div>
            <div class="parent">
              <div class="identity">
                <div class="name">
                  <div class="label">姓名</div>
                  <Input v-model="parents[0].name" :disabled="isDisabled" />
                </div>
                <div class="relation">
                  <div class="label">关系</div>
                  <Select
                    style="width:200px"
                    placeholder="请选择"
                    v-model="parents[0].relation"
                    :disabled="isDisabled"
                  >
                    <Option
                      :value="item.value"
                      v-for="(item,index) in parentOption"
                      :key="index"
                    >{{item.text}}</Option>
                  </Select>
                </div>
                <div class="idCard">
                  <div class="label">身份证号</div>
                  <Input v-model="parents[0].idCard" :disabled="isDisabled" />
                </div>
              </div>
              <div class="work-info">
                <div class="phone">
                  <div class="label">联系电话</div>
                  <Input style="width:214px" v-model="parents[0].linkPhone" :disabled="isDisabled" />
                </div>
                <div class="work-address">
                  <div class="label">工作单位</div>
                  <Input
                    style="width:300px"
                    v-model="parents[0].workAddress"
                    :disabled="isDisabled"
                  />
                </div>
              </div>
            </div>
            <div class="parent">
              <div class="identity">
                <div class="name">
                  <div class="label">姓名</div>
                  <Input v-model="parents[1].name" :disabled="isDisabled" />
                </div>
                <div class="relation">
                  <div class="label">关系</div>
                  <Select
                    style="width:200px"
                    placeholder="请选择"
                    v-model="parents[1].relation"
                    :disabled="isDisabled"
                  >
                    <Option
                      :value="item.value"
                      v-for="(item,index) in parentOption"
                      :key="index"
                    >{{item.text}}</Option>
                  </Select>
                </div>
                <div class="idCard">
                  <div class="label">身份证号</div>
                  <Input v-model="parents[1].idCard" :disabled="isDisabled" />
                </div>
              </div>
              <div class="work-info">
                <div class="phone">
                  <div class="label">联系电话</div>
                  <Input style="width:214px" v-model="parents[1].linkPhone" :disabled="isDisabled" />
                </div>
                <div class="work-address">
                  <div class="label">工作单位</div>
                  <Input
                    style="width:300px"
                    v-model="parents[1].workAddress"
                    :disabled="isDisabled"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="other-info">
            <div class="header">其他</div>
            <div class="other-content">
              <div class="special-circumstances">
                <div class="label">特殊情况</div>
                <RadioGroup v-model="specialCondition" :disabled="isDisabled">
                  <Radio :disabled="isDisabled" label="单亲家庭" style="width:100px;height:30px"></Radio>
                  <Radio :disabled="isDisabled" label="孤儿" style="width:100px;height:30px"></Radio>
                  <Radio :disabled="isDisabled" label="双胞胎" style="width:100px;height:30px"></Radio>
                  <Radio :disabled="isDisabled" label="残疾" style="width:100px;height:30px"></Radio>
                  <Radio :disabled="isDisabled" label="留守儿童" style="width:100px;height:30px"></Radio>
                  <Radio :disabled="isDisabled" label="其他" style="width:100px;height:30px"></Radio>
                  <Radio :disabled="isDisabled" label="无" style="width:100px;height:30px"></Radio>
                </RadioGroup>
              </div>
              <div class="other-remark">
                <div class="label">其他描述</div>
                <Input
                  type="textarea"
                  :autosize="{minRows: 3,maxRows: 4}"
                  style="width:400px"
                  v-model="otherRemark"
                  :disabled="isDisabled"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="audit-info">
          <div class="header">审核意见</div>
          <div class="levels">
            <div class="label">面谈等级：</div>
            <div class="level-list">
              <Spin fix v-if="isShowLevelList"></Spin>
              <div
                class="level-item"
                :class="chosedLevel === index ?'chosed-level':''"
                v-for="(item,index) in levelList"
                :key="index"
                @click="choseLevel(item,index)"
              >{{item.level}}</div>
            </div>
          </div>
          <div class="audit-result">
            <div class="label">审核结果：</div>
            <div class="result-list">
              <div class="result-item" :class="crossIndex ==0?'cross':''" @click="choseAudit(0)">
                <div class="cross-icon" :class="crossIndex == 0?'cross1':'cross2'"></div>通过
              </div>
              <div class="result-item" :class="crossIndex ==1?'uncross':''" @click="choseAudit(1)">
                <div class="cross-icon" :class="crossIndex == 1?'uncross1':'uncross2'"></div>不通过
              </div>
              <Input
                style="width:300px;transform:translateY(2px)"
                placeholder="理由"
                v-model="auditRemark"
                :disabled="isDisabled"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="confirm-button" @click="commitVerity" v-if="!isDisabled">提交</div>
    </div>
    <Modal v-model="isShowCommit" title="提交" @on-ok="commit">
      <p slot="header" style="color:#fff;text-align:left">
        <span>提交</span>
      </p>
      <p>确认要提交该学生的审核信息吗？</p>
    </Modal>
  </div>
</template>

<script>
import * as api from "@/service/apiList";
import http from "@/service/service";
import { Todate } from "@/common/tool/tool";

export default {
  data() {
    return {
      crossIndex: 0,
      chosedLevel: 0,
      isShowLevelList: false,
      point: "",
      ID: "",
      isDisabled: false,
      spinShow: false,
      spinShow1: false,
      isShowSuccess: false,
      name: "",
      idCard: "",
      sex: "",
      birthday: "",
      provinceID: "",
      provincesName: "",
      cityID: "",
      cityName: "",
      areaID: "",
      areaName: "",
      detailAddress: "",
      smallCommunityName: "",
      smallCommunityID: "",
      schoolName: "",
      schoolID: "",
      hasHouse: "是",
      houseNature: 1,
      houseNatureList: [
        {
          text: "父母房产",
          value: 1
        },
        {
          text: "祖父母房产",
          value: 2
        },
        {
          text: "期房",
          value: 3
        }
      ],
      houseOwner: "",
      buyDate: new Date(),
      houseNumbers: "",
      pensionUnitsAddress: "",
      permitResidencePeriod: new Date(),
      laborContractPeriod: new Date(),
      schoolLabel: "",
      lastSchoolName: "",
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
          relation: 2,
          workAddress: ""
        }
      ],
      parentOption: [
        {
          text: "父亲",
          value: 1
        },
        {
          text: "母亲",
          value: 2
        },
        {
          text: "爷爷",
          value: 3
        },
        {
          text: "奶奶",
          value: 4
        },
        {
          text: "外公",
          value: 5
        },
        {
          text: "外婆",
          value: 6
        },
        {
          text: "其他监护人",
          value: 7
        }
      ],
      specialCondition: "无",
      otherRemark: "",
      // ========================
      isShowCommit: false,
      isShowAlternative: false,
      provinceList: [],
      cityList: [],
      streetList: [],
      street: [],
      streetId: "",
      communityList: [],
      communityId: "",
      smallCommunityList: [],
      schoolList: [],
      alternativeSchoolID: "",
      alternativeSchoolName: "",
      forecastCode: "",
      levelList: [],
      level: "",
      auditRemark: "",
      levelID: "",
      isDisableHasHouse: false
    };
  },
  created() {
    this.getProvinceArea();
    this.getStreetList();
    this.getSchoolList();
    if (this.$route.query.id) {
      this.getStudentDetail(this.$route.query.id);
    }
  },
  mounted() {
    this.$nextTick(function() {});
  },
  methods: {
    getLevelList() {
      let vm = this;
      this.isShowLevelList = true;
      http.get(api.GETLISTLEVEL, {}, this).then(resp => {
        this.isShowLevelList = false;
        this.levelList = resp.data.data;
        if (vm.levelID) {
          vm.levelList.map((v, i) => {
            if (v.id == vm.levelID) {
              vm.level = v;
              vm.chosedLevel = i;
            }
          });
        } else {
          this.level = resp.data.data[0];
        }
      });
    },
    getStudentDetail(id) {
      let vm = this;
      this.$Spin.show();
      http
        .get(
          api.GETSTUDENTDETAIL,
          {
            ID: id
          },
          this
        )
        .then(resp => {
          this.$Spin.hide();
          let res = resp.data.data;
          this.getLevelList();
          if (res.auditStatus == 1 || res.auditStatus == 2) {
            vm.isDisabled = true;
          } else {
            vm.isDisabled = false;
          }
          vm.forecastCode = res.forecastCode;
          vm.ID = res.id;
          vm.name = res.name;
          vm.sex = res.sex == 1 ? "男" : "女";
          vm.idCard = res.idCard;
          vm.birthday = res.birthday ? new Date(res.birthday) : "";
          vm.provinceID = res.provinceID;
          vm.cityID = res.cityID;
          vm.areaID = res.areaID;
          vm.cityName = res.cityName;
          vm.provincesName = res.provincesName;
          vm.areaName = res.areaName;
          vm.detailAddress = res.detailAddress;
          vm.smallCommunityName = res.smallCommunityName;
          vm.smallCommunityID = res.smallCommunityID;
          vm.schoolName = res.schoolName;
          vm.schoolID = res.schoolID;
          vm.lastSchoolName = res.preSchoolInformation
            ? res.preSchoolInformation
            : res.primarySchoolName;
          vm.schoolLabel = res.school ? res.school.label : "";
          vm.parents = res.parents;
          vm.hasHouse = res.property ? "是" : "否";
          vm.houseNature = res.houseNature;
          vm.houseOwner = res.houseOwner;
          vm.buyDate = res.buyDate ? new Date(res.buyDate) : new Date();
          vm.houseNumbers = res.houseNumbers;
          vm.permitResidencePeriod = res.permitResidencePeriod
            ? new Date(res.permitResidencePeriod)
            : new Date();
          vm.laborContractPeriod = res.laborContractPeriod
            ? new Date(res.laborContractPeriod)
            : new Date();
          vm.pensionUnitsAddress = res.pensionUnitsAddress;
          vm.specialCondition = vm.returnSpecialText(res.specialCondition);
          vm.otherRemark = res.otherRemark;
          vm.alternativeSchoolName = res.alternativeSchoolName;
          vm.alternativeSchoolID = Number(res.alternativeSchoolID);
          vm.streetId = res.smallCommunity ? res.smallCommunity.streetID : "";
          vm.communityId = res.smallCommunity
            ? res.smallCommunity.communityID
            : "";
          vm.auditRemark = res.auditRemark;
          vm.crossIndex = res.auditStatus == 0 ? 0 : res.auditStatus - 1;
          vm.levelID = res.levelID;
          vm.point = res.point;
          if (res.schoolCode == "0401") {
            this.isDisableHasHouse = true;
            this.isShowAlternative = true;
            this.hasHouse = "是";
          } else {
            this.isShowAlternative = false;
            this.isDisableHasHouse = false;
          }
          if (vm.streetId) {
            this.spinShow1 = true;
            http
              .get(
                api.GETCOMMUNITYLIST,
                {
                  streetID: vm.streetId
                },
                this
              )
              .then(resp => {
                this.spinShow1 = false;
                this.communityList = resp.data.data;
              });
          }
          if (vm.communityId) {
            this.spinShow1 = true;
            http
              .get(
                api.GETSMALLCOMMUNITYBYCOMMUNITYID,
                {
                  communityID: vm.communityId
                },
                this
              )
              .then(resp => {
                this.spinShow1 = false;
                this.smallCommunityList = resp.data.data;
              });
          }
          if (vm.provinceID) {
            http
              .get(
                api.GETCITYLIST,
                {
                  parentID: vm.provinceID
                },
                this
              )
              .then(resp => {
                this.spinShow = false;
                vm.cityList = resp.data.data;
              });
          }
          if (vm.cityID) {
            http
              .get(
                api.GETCITYLIST,
                {
                  parentID: vm.cityID
                },
                this
              )
              .then(resp => {
                this.spinShow = false;
                vm.streetList = resp.data.data;
              });
          }
        });
    },
    choseLevel(item, index) {
      if (this.isDisabled) {
        return;
      }
      this.chosedLevel = index;
      this.level = item;
    },
    choseAudit(index) {
      if (this.isDisabled) {
        return;
      }
      this.crossIndex = index;
    },
    // 获取备选学校
    getSchoolList() {
      http.get(api.GETSCHOOLLIST, {}, this).then(resp => {
        this.schoolList = resp.data.data;
      });
    },
    // 获取街道
    getStreetList() {
      this.spinShow1 = true;
      http.get(api.GETSTREETLIST, {}, this).then(resp => {
        this.spinShow1 = false;
        this.street = resp.data.data;
      });
    },
    // 获取省
    getProvinceArea() {
      this.spinShow = true;
      http.get(api.GETPROVINCEAREA, {}, this).then(resp => {
        this.spinShow = false;
        this.provinceList = resp.data.data;
      });
    },
    // 选择省
    seletcProvince(value) {
      let vm = this;
      this.spinShow = true;
      this.provincesName = value.label;
      http
        .get(
          api.GETCITYLIST,
          {
            parentID: vm.provinceID
          },
          this
        )
        .then(resp => {
          vm.spinShow = false;
          vm.cityList = resp.data.data;
          vm.areaID = "";
          vm.streetList = [];
        });
    },
    // 选择市
    seletcCity(value) {
      let vm = this;
      if (!value) {
        return;
      }
      this.spinShow = true;
      this.cityName = value.label;
      http
        .get(
          api.GETCITYLIST,
          {
            parentID: vm.cityID
          },
          this
        )
        .then(resp => {
          this.spinShow = false;
          vm.streetList = resp.data.data;
        });
    },
    seletcStreet(value) {
      if (!value) {
        return;
      }
      this.areaName = value.label;
    },
    // 选择街道
    choseStreet(value) {
      this.spinShow1 = true;
      http
        .get(
          api.GETCOMMUNITYLIST,
          {
            streetID: value
          },
          this
        )
        .then(resp => {
          this.spinShow1 = false;
          this.communityList = resp.data.data;
          this.smallCommunityID = "";
          this.smallCommunityList = [];
        });
    },
    // 选择社区
    choseCommunity(value) {
      this.spinShow1 = true;
      if (!value) {
        this.spinShow1 = false;
        return;
      }
      http
        .get(
          api.GETSMALLCOMMUNITYBYCOMMUNITYID,
          {
            communityID: value
          },
          this
        )
        .then(resp => {
          this.spinShow1 = false;
          this.smallCommunityID = "";
          this.smallCommunityList = resp.data.data;
        });
    },
    // 选择小区匹配预选学校
    choseSmallCommunity(value) {
      if (!value) {
        this.spinShow1 = false;
        return;
      }
      this.smallCommunityName = value.label;
      this.spinShow1 = true;
      http
        .get(
          api.GETSCHOOLBYSMALLCOMMUNITYID,
          {
            smallCommunityID: this.smallCommunityID,
            birthday: this.todate(this.birthday)
          },
          this
        )
        .then(resp => {
          this.spinShow1 = false;
          if (resp.data.data) {
            this.schoolName = resp.data.data.schoolName;
            this.schoolLabel = resp.data.data.label;
            this.schoolID = resp.data.data.schoolID;
            if (resp.data.data.schoolCode == "0401") {
              this.isDisableHasHouse = true;
              this.isShowAlternative = true;
              this.hasHouse = "是";
            } else {
              this.isShowAlternative = false;
              this.isDisableHasHouse = false;
            }
          } else {
            this.$Message.warning("未匹配到预报名学校！");
          }
        });
    },
    birthdayChange() {
      if (this.smallCommunityID) {
        http
          .get(
            api.GETSCHOOLBYSMALLCOMMUNITYID,
            {
              smallCommunityID: this.smallCommunityID,
              birthday: this.todate(this.birthday)
            },
            this
          )
          .then(resp => {
            this.spinShow1 = false;
            if (resp.data.data) {
              this.schoolName = resp.data.data.schoolName;
              this.schoolLabel = resp.data.data.label;
              this.schoolID = resp.data.data.schoolID;
              if (resp.data.data.schoolCode == "0401") {
                this.isDisableHasHouse = true;
                this.isShowAlternative = true;
                this.hasHouse = "是";
              } else {
                this.isShowAlternative = false;
                this.isDisableHasHouse = false;
              }
            } else {
              this.$Message.warning("未匹配到预报名学校！");
            }
          });
      }
    },
    selectOpen() {
      if (!this.birthday) {
        this.$Message.warning("在选择出生日期后才能进行预选学校匹配！");
      }
    },
    choseAlternative(value) {
      this.alternativeSchoolName = value.label;
      this.alternativeSchoolID = value.value;
    },
    todate(date) {
      return Todate(date);
    },
    commitVerity() {
      let vm = this;
      if (
        !vm.name ||
        !vm.idCard ||
        !vm.birthday ||
        !vm.provincesName ||
        !vm.cityName ||
        !vm.areaName ||
        !vm.detailAddress ||
        !vm.schoolName
      ) {
        this.$Message.warning("请填写完整的学生信息！");
        return;
      }
      if (vm.schoolName === "实验小学") {
        if (!vm.alternativeSchoolName) {
          this.$Message.warning("请填写备选学校！");
          return;
        }
      }
      if (vm.hasHouse === "是") {
        if (!vm.houseOwner || !vm.houseNumbers) {
          this.$Message.warning("请填写完整的房产居住信息！");
          return;
        }
      } else {
        if (!vm.pensionUnitsAddress) {
          this.$Message.warning("请填写完整的房产居住信息！");
          return;
        }
      }
      if (!vm.lastSchoolName) {
        this.$Message.warning("请填写完整的学前信息！");
        return;
      }
      if (!vm.otherRemark) {
        this.$Message.warning("请填写完整的其他信息！");
        return;
      }
      if (
        !vm.parents[0].idCard ||
        !vm.parents[0].linkPhone ||
        !vm.parents[0].name ||
        !vm.parents[0].workAddress
      ) {
        this.$Message.warning("至少填写一个完整的家长信息！");
        return;
      }
      if (!vm.auditRemark) {
        this.$Message.warning("请填写审核理由！");
        return;
      }
      if (!vm.point && vm.isShowAlternative) {
        this.$Message.warning("请填写积分！");
        return;
      }
      this.isShowCommit = true;
    },
    commit() {
      this.saveConfirm(true);
    },
    saveConfirm(commit) {
      let vm = this;
      let params = {
        id: vm.ID,
        name: vm.name,
        idCard: vm.idCard,
        sex: vm.sex === "男" ? 1 : 2,
        birthday: vm.todate(vm.birthday),
        provinceID: vm.provinceID,
        provincesName: vm.provincesName,
        cityID: vm.cityID,
        cityName: vm.cityName,
        areaID: vm.areaID,
        areaName: vm.areaName,
        detailAddress: vm.detailAddress,
        smallCommunityName: vm.smallCommunityName,
        smallCommunityID: vm.smallCommunityID,
        schoolID: vm.schoolID,
        schoolName: vm.schoolName,
        preSchoolInformation: vm.schoolLabel === 1 ? vm.lastSchoolName : "",
        primarySchoolName: vm.schoolLabel === 2 ? vm.lastSchoolName : "",
        parents: vm.parents,
        property: vm.hasHouse === "是" ? true : false,
        houseNature: vm.hasHouse === "是" ? vm.houseNature : "",
        houseOwner: vm.hasHouse === "是" ? vm.houseOwner : "",
        buyDate: vm.hasHouse === "是" ? vm.todate(vm.buyDate) : "",
        houseNumbers: vm.hasHouse === "是" ? vm.houseNumbers : "",
        permitResidencePeriod:
          vm.hasHouse === "否" ? vm.todate(vm.permitResidencePeriod) : "",
        laborContractPeriod:
          vm.hasHouse === "否" ? vm.todate(vm.laborContractPeriod) : "",
        pensionUnitsAddress: vm.hasHouse === "否" ? vm.pensionUnitsAddress : "",
        specialCondition: vm.returnSpecial(vm.specialCondition),
        otherRemark: vm.otherRemark,
        operateCommit: commit,
        alternativeSchoolName: vm.alternativeSchoolName,
        alternativeSchoolID: vm.alternativeSchoolID,
        levelID: vm.level.id,
        auditStatus: vm.crossIndex + 1,
        auditRemark: vm.auditRemark,
        point: vm.point
      };
      this.$Spin.show();
      http.post(api.SAVEANDCOMMIT, params, this).then(resp => {
        this.$Spin.hide();
        if (resp.data.success) {
          this.$Message.success(commit ? "提交成功" : "保存成功");
          vm.$router.push({
            path: "/schoolAudit/auditList"
          });
        } else {
          this.$Message.warning(resp.data.message);
        }
      });
    },
    returnSpecial(special) {
      let result;
      switch (special) {
        case "单亲家庭":
          result = 1;
          break;
        case "孤儿":
          result = 2;
          break;
        case "留守儿童":
          result = 3;
          break;
        case "双胞胎":
          result = 4;
          break;
        case "残疾":
          result = 5;
          break;
        case "其他":
          result = 6;
          break;
        case "无":
          result = 7;
          break;
      }
      return result;
    },
    returnSpecialText(special) {
      let result;
      switch (special) {
        case 1:
          result = "单亲家庭";
          break;
        case 2:
          result = "孤儿";
          break;
        case 3:
          result = "留守儿童";
          break;
        case 4:
          result = "双胞胎";
          break;
        case 5:
          result = "残疾";
          break;
        case 6:
          result = "其他";
          break;
        case 7:
          result = "无";
          break;
      }
      return result;
    }
  }
};
</script>
<style lang="less" scoped>
@font-color: #64b3ed;
.add-child {
  height: 100%;
  display: flex;
  flex-direction: column;
  .add-main {
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
      .forecast-code,
      .student-info,
      .house-info,
      .preschool-info {
        .header {
          font-size: 16px;
          font-weight: bold;
          height: 24px;
          line-height: 24px;
          border-left: 4px solid @font-color;
          padding-left: 15px;
          margin-top: 15px;
        }
      }
      .student-info {
        flex: 5;
        .personage-info {
          height: 66px;
          display: flex;
          margin-top: 5px;
          .name,
          .idCard,
          .birthday {
            flex: 1;
            padding: 0 20px 0px 25px;
            .label {
              margin-bottom: 10px;
            }
          }
        }
        .address-info {
          display: flex;
          .residence-info {
            flex: 1;
            position: relative;
            padding-left: 25px;
            .label {
              margin: 10px 0;
            }
          }
          .sex-info {
            width: 33.33%;
            padding-left: 25px;
            .label {
              margin: 10px 0;
            }
          }
        }
        .now-address {
          position: relative;
          display: flex;
          .housing-estate {
            flex: 1;
            padding-left: 25px;
            .label {
              margin: 15px 0 10px 0;
            }
          }
          .apply-school {
            width: 250px;
            padding-left: 25px;
            .label {
              margin: 15px 0 10px 0;
            }
          }
        }
        .alternative-school {
          padding-left: 25px;
          display: flex;
          .alternative {
            flex: 1;
          }
          .integral {
            flex: 1;
          }
          .label {
            margin: 15px 0 10px 0;
          }
        }
      }
      .house-info {
        flex: 3;
        .house-property {
          padding-left: 25px;
          display: flex;
          .has-house,
          .house-nature,
          .house-owner,
          .live-date,
          .contract-date {
            flex: 1;
            .label {
              margin: 15px 0 10px 0;
            }
          }
        }
        .get-house {
          padding-left: 25px;
          display: flex;
          .get-time {
            width: 33.33%;
            .label {
              margin: 10px 0 10px 0;
            }
          }
          .house-code,
          .insurance-address {
            flex: 1;
            .label {
              margin: 10px 0 10px 0;
            }
          }
        }
      }
      .preschool-info {
        flex: 2;
        .school {
          padding-left: 25px;
          .school-name {
            .label {
              margin: 10px 0 10px 0;
            }
          }
        }
      }
    }
    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin: 20px 40px 0 20px;
      .top-info {
        background: #ffffff;
        border: 1px solid #ccd4df;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
        .patriarch-info,
        .other-info,
        .audit-info {
          flex: 1;
          .header {
            font-size: 16px;
            font-weight: bold;
            height: 24px;
            border-left: 4px solid @font-color;
            padding-left: 15px;
            margin-top: 20px;
          }
        }
        .patriarch-info {
          .parent {
            margin-top: 20px;
            .identity {
              display: flex;
              .name,
              .relation,
              .idCard {
                flex: 1;
                padding: 0 20px 0px 25px;
                .label {
                  margin-bottom: 10px;
                }
              }
            }
            .work-info {
              display: flex;
              padding-left: 25px;
              .phone {
                width: 33.33%;
                .label {
                  margin: 15px 0 10px 0;
                }
              }
              .work-address {
                flex: 1;
                padding-left: 10px;
                .label {
                  margin: 15px 0 10px 0;
                }
              }
            }
          }
        }
        .other-info {
          .other-content {
            display: flex;
            padding-left: 25px;
            .special-circumstances {
              width: 33.33%;
              .label {
                margin: 15px 0;
              }
            }
            .other-remark {
              flex: 1;
              .label {
                margin: 15px 0;
              }
            }
          }
        }
        .report-info {
          .report-text {
            padding-left: 25px;
            padding-top: 5px;
            p {
              width: 500px;
              margin-bottom: 10px;
            }
            span {
              color: #a0aec0;
            }
          }
        }
      }
      .audit-info {
        margin-top: 15px;
        flex: 1;
        background: #ffffff;
        border: 1px solid #ccd4df;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
        .header {
          font-size: 16px;
          font-weight: bold;
          height: 24px;
          border-left: 4px solid @font-color;
          padding-left: 15px;
          margin-top: 20px;
        }
        .levels,
        .audit-result {
          display: flex;
          height: 35px;
          margin-top: 10px;
          .label {
            line-height: 35px;
            width: 100px;
            margin-left: 25px;
          }
          .level-list {
            display: flex;
            position: relative;
            .level-item {
              min-width: 60px;
              height: 35px;
              background: #ffffff;
              border: 1px solid #ccd4df;
              border-radius: 4px;
              font-size: 14px;
              color: #a0aec0;
              letter-spacing: 1.7px;
              margin-right: 20px;
              line-height: 35px;
              padding-left: 20px;
              margin-bottom: 10px;
              cursor: pointer;
            }
            .chosed-level {
              border-color: #64b3ed;
              background-color: #64b3ed;
              color: #fff;
            }
          }
          .result-list {
            flex: 1;
            display: flex;
            line-height: 35px;
            .result-item {
              width: 100px;
              height: 35px;
              background: #ffffff;
              border: 1px solid #ccd4df;
              border-radius: 4px;
              font-size: 14px;
              color: #a0aec0;
              letter-spacing: 1.7px;
              margin-right: 20px;
              line-height: 35px;
              padding-left: 40px;
              margin-bottom: 10px;
              cursor: pointer;
              position: relative;
              .cross-icon {
                width: 14px;
                height: 14px;
                position: absolute;
                left: 15px;
                top: 50%;
                transform: translateY(-50%);
              }
              .cross1 {
                background: url("../../../assets/image/cross1.png") no-repeat;
                background-size: 100% 100%;
              }
              .cross2 {
                background: url("../../../assets/image/cross2.png") no-repeat;
                background-size: 100% 100%;
              }
              .uncross1 {
                background: url("../../../assets/image/uncross1.png") no-repeat;
                background-size: 100% 100%;
              }
              .uncross2 {
                background: url("../../../assets/image/uncross2.png") no-repeat;
                background-size: 100% 100%;
              }
            }
            .cross {
              color: #fff;
              border-color: #48bb78;
              background-color: #48bb78;
            }
            .uncross {
              color: #fff;
              border-color: #f56565;
              background-color: #f56565;
            }
          }
        }
      }
    }
  }
  .bottom {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    .save-button,
    .confirm-button,
    .print-button {
      width: 120px;
      height: 40px;
      border-radius: 20px;
      background-color: @font-color;
      line-height: 40px;
      color: #fff;
      text-align: center;
      font-size: 16px;
      cursor: pointer;
    }
    .print-button {
      width: 140px;
    }
    .save-button {
      margin-right: 10px;
    }
    .confirm-button {
      margin-left: 10px;
    }
  }
}
/deep/.ivu-modal-content .ivu-modal-header {
  background-color: @font-color!important;
  padding-top: 10px;
  padding-bottom: 0px;
  border-radius: 5px 5px 0 0;
  p {
    height: 30px;
  }
}
/deep/.ivu-icon.ivu-icon-ios-close {
  color: #fff;
}
/deep/.ivu-input-disabled {
  color: #2d3748;
}
/deep/.ivu-select-disabled .ivu-select-selection {
  color: #2d3748;
}
</style>