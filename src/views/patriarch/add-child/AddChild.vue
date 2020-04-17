<template>
  <div class="add-child">
    <div class="add-main">
      <div class="left">
        <div class="student-info">
          <div class="header">学生信息</div>
          <div class="personage-info">
            <div class="name">
              <div class="label">姓名</div>
              <Input v-model="childName" />
            </div>
            <div class="idCard">
              <div class="label">身份证号</div>
              <Input v-model="childIdCard" />
            </div>
            <div class="birthday">
              <div class="label">选择出生年月日</div>
              <DatePicker type="date" style="width: 200px" v-model="birthday"></DatePicker>
            </div>
          </div>
          <div class="residence-info">
            <div class="label">户口所在地</div>
            <div class="address-select">
              <Select style="width:145px" v-model="province" placeholder="选择省">
                <Option value="111">111</Option>
                <Option value="111">111</Option>
                <Option value="111">111</Option>
              </Select>
              <Select style="width:145px;margin-left:20px" v-model="city" placeholder="选择市">
                <Option value="111">111</Option>
                <Option value="111">111</Option>
                <Option value="111">111</Option>
              </Select>
              <Select style="width:145px;margin-left:20px" v-model="district" placeholder="选择区/县">
                <Option value="111">111</Option>
                <Option value="111">111</Option>
                <Option value="111">111</Option>
              </Select>
              <br />
              <Input
                v-model="addressDetail"
                style="width:475px;margin-top:20px"
                placeholder="详细地址"
              />
            </div>
          </div>
          <div class="now-address">
            <div class="housing-estate">
              <div class="label">现居住小区</div>
              <Select style="width:310px" v-model="housingEstate" placeholder="选择小区">
                <Option value="111">111</Option>
                <Option value="111">111</Option>
                <Option value="111">111</Option>
              </Select>
            </div>
            <div class="apply-school">
              <div class="label">预报名学校（系统自动生成）</div>
              <Input disabled style="width:310px" />
            </div>
          </div>
        </div>
        <div class="house-info">
          <div class="header">房产/居住信息</div>
          <div class="house-property">
            <div class="has-house">
              <div class="label">是否有房产</div>
              <RadioGroup v-model="hasHouse">
                <Radio label="是"></Radio>
                <Radio label="否"></Radio>
              </RadioGroup>
            </div>
            <div class="house-nature">
              <div class="label">房产性质</div>
              <Select style="width:180px;" v-model="houseNature" placeholder="请选择">
                <Option value="111">111</Option>
                <Option value="111">111</Option>
                <Option value="111">111</Option>
              </Select>
            </div>
            <div class="house-owner">
              <div class="label">房产所有人</div>
              <Input v-model="childName" style="width:180px" />
            </div>
          </div>
          <div class="get-house">
            <div class="get-time">
              <div class="label">取得/购买时间</div>
              <DatePicker type="date" style="width: 200px"></DatePicker>
            </div>
            <div class="house-code">
              <div class="label">房产登记号/房产发票号</div>
              <Input style="width:300px" />
            </div>
          </div>
        </div>
        <div class="preschool-info">
          <div class="header">学前信息</div>
          <div class="school">
            <div class="school-name">
              <div class="label">幼儿园名称</div>
              <Input style="width:300px" />
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="patriarch-info">
          <div class="header">家长信息</div>
          <div class="parent">
            <div class="identity">
              <div class="name">
                <div class="label">姓名</div>
                <Input />
              </div>
              <div class="relation">
                <div class="label">关系</div>
                <Select style="width:200px" placeholder="请选择">
                  <Option value="111">111</Option>
                  <Option value="111">111</Option>
                  <Option value="111">111</Option>
                </Select>
              </div>
              <div class="idCard">
                <div class="label">身份证号</div>
                <Input v-model="childIdCard" />
              </div>
            </div>
            <div class="work-info">
              <div class="phone">
                <div class="label">联系电话</div>
                <Input style="width:214px" />
              </div>
              <div class="work-address">
                <div class="label">工作单位</div>
                <Input style="width:300px" />
              </div>
            </div>
          </div>
          <div class="parent">
            <div class="identity">
              <div class="name">
                <div class="label">姓名</div>
                <Input />
              </div>
              <div class="relation">
                <div class="label">关系</div>
                <Select style="width:200px" placeholder="请选择">
                  <Option value="111">111</Option>
                  <Option value="111">111</Option>
                  <Option value="111">111</Option>
                </Select>
              </div>
              <div class="idCard">
                <div class="label">身份证号</div>
                <Input v-model="childIdCard" />
              </div>
            </div>
            <div class="work-info">
              <div class="phone">
                <div class="label">联系电话</div>
                <Input style="width:214px" />
              </div>
              <div class="work-address">
                <div class="label">工作单位</div>
                <Input style="width:300px" />
              </div>
            </div>
          </div>
        </div>
        <div class="other-info">
          <div class="header">其他</div>
          <div class="other-content">
            <div class="special-circumstances">
              <div class="label">特殊情况</div>
              <RadioGroup v-model="hasHouse">
                <Radio label="单亲家庭" style="width:100px;height:30px"></Radio>
                <Radio label="孤儿" style="width:100px;height:30px"></Radio>
                <Radio label="双胞胎" style="width:100px;height:30px"></Radio>
                <Radio label="残疾" style="width:100px;height:30px"></Radio>
                <Radio label="留守儿童" style="width:100px;height:30px"></Radio>
                <Radio label="其他" style="width:100px;height:30px"></Radio>
                <Radio label="无" style="width:100px;height:30px"></Radio>
              </RadioGroup>
            </div>
            <div class="other-remark">
              <div class="label">其他描述</div>
              <Input type="textarea" :autosize="{minRows: 3,maxRows: 4}" style="width:400px" />
            </div>
          </div>
        </div>
        <div class="report-info">
          <div class="header">报名承诺书</div>
          <div class="report-text">
            <p>本人承诺：如有弄虚作假，提供虚假材料的，一经发现，对其已入学子女作退学或转学处理，由此产生的不良影响，本人愿意承担一切后果。</p>
            <Checkbox>
              <span>我已阅读并接受</span>
            </Checkbox>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="save-button">保存</div>
      <div class="confirm-button">提交</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      childName: "",
      childIdCard: "",
      birthday: "",
      addressDetail: "",
      hasHouse: "",
      province: "",
      city: "",
      district: "",
      housingEstate: "",
      houseNature: ""
    };
  }
};
</script>
<style lang="less" scoped>
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
      margin: 40px 20px 0 40px;
      .student-info,
      .house-info,
      .preschool-info {
        .header {
          font-size: 16px;
          font-weight: bold;
          height: 24px;
          border-left: 4px solid #64b3ed;
          padding-left: 15px;
          margin-top: 20px;
        }
      }
      .student-info {
        flex: 5;
        .personage-info {
          height: 66px;
          display: flex;
          margin-top: 20px;
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
        .residence-info {
          padding-left: 25px;
          .label {
            margin: 10px 0;
          }
        }
        .now-address {
          display: flex;
          .housing-estate,
          .apply-school {
            flex: 1;
            padding-left: 25px;
            .label {
              margin: 20px 0;
            }
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
          .house-owner {
            flex: 1;
            .label {
              margin: 20px 0;
            }
          }
        }
        .get-house {
          padding-left: 25px;
          display: flex;
          .get-time {
            width: 33.33%;
            .label {
              margin: 20px 0;
            }
          }
          .house-code {
            flex: 1;
            .label {
              margin: 20px 0;
            }
          }
        }
      }
      .preschool-info {
        flex: 2;
        margin-top: 20px;
        .school {
          padding-left: 25px;
          .school-name {
            .label {
              margin: 20px 0 10px 0;
            }
          }
        }
      }
    }
    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      background: #ffffff;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
      background: #ffffff;
      border: 1px solid #ccd4df;
      margin: 40px 40px 0 20px;
      .patriarch-info,
      .other-info,
      .report-info {
        flex: 1;
        .header {
          font-size: 16px;
          font-weight: bold;
          height: 24px;
          border-left: 4px solid #64b3ed;
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
                margin: 15px 0;
              }
            }
            .work-address {
              flex: 1;
              padding-left: 10px;
              .label {
                margin: 15px 0;
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
  }
  .bottom {
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    .save-button,
    .confirm-button {
      width: 120px;
      height: 40px;
      border-radius: 20px;
      background-color: #64b3ed;
      line-height: 40px;
      color: #fff;
      text-align: center;
      font-size: 16px;
      cursor: pointer;
    }
    .save-button {
      margin-right: 10px;
    }
    .confirm-button {
      margin-left: 10px;
    }
  }
}
</style>