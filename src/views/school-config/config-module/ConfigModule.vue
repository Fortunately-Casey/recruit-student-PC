<template>
  <div id="config-module">
    <div class="main">
      <div class="left">
        <div class="birthday-config">
          <div class="header">报名出生年月配置</div>
          <div class="date">
            <div class="label">选择时间段</div>
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:400px"
            ></el-date-picker>
          </div>
        </div>
        <div class="start-time">
          <div class="header">报名开始时间配置</div>
          <div class="date">
            <div class="label">选择时间段</div>
            <el-date-picker
              v-model="value2"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:450px"
            ></el-date-picker>
          </div>
        </div>
        <div class="level-config">
          <div class="header">面谈等级配置</div>
          <div class="levels">
            <div class="label">输入等级</div>
            <div class="add-input">
              <Input v-model="level" size="large" style="width:150px" />
              <div class="add" @click="addLevel">添加</div>
            </div>
            <div class="level-list">
              <div class="level-item" v-for="(item,index) in levelList" :key="index">
                {{item}}
                <Icon type="md-close" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="relation-config">
          <div class="header">小区学校对应关系配置</div>
          <div class="relation">
            <el-transfer
              filterable
              :filter-method="filterMethod"
              :titles="['小区列表', '已选择小区']"
              filter-placeholder="请输入小区名称"
              v-model="value"
              :data="data"
            ></el-transfer>
            <div class="label">新增小区</div>
            <div class="add-input">
              <Input v-model="estate" size="large" style="width:450px" />
              <div class="add" @click="addEstate">添加</div>
            </div>
            <div class="estate-list">
              <div class="estate-item" v-for="(item,index) in estateList" :key="index">
                {{item}}
                <span>删除</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="confirm-button">提交</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: "",
      value2: "",
      levelList: ["A+", "A", "B", "C"],
      level: "",
      value: [],
      estate: "",
      data: this.generateData(),
      estateList: ["棕榈湾"]
    };
  },
  methods: {
    generateData() {
      const data = [];
      const cities = [
        "棕榈湾",
        "碧桂园",
        "尚海城",
        "万通城",
        "翠湖湾",
        "翰景园",
        "佳期漫"
      ];
      const pinyin = [
        "zonglvwan",
        "biguiyuan",
        "shanghaicheng",
        "wantongcheng",
        "cuihuwan",
        "hanjingyuan",
        "jiaqiman"
      ];
      cities.forEach((city, index) => {
        data.push({
          label: city,
          key: index,
          pinyin: pinyin[index]
        });
      });
      return data;
    },
    filterMethod(query, item) {
      return item.pinyin.indexOf(query) > -1;
    },
    addLevel() {
      this.levelList.push(this.level);
    },
    addEstate() {
      this.estateList.push(this.estate);
    }
  }
};
</script>

<style lang="less" scoped>
@font-color: #64b3ed;
#config-module {
  flex: 1;
  display: flex;
  flex-direction: column;
  .main {
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
      .birthday-config,
      .start-time,
      .level-config {
        // flex: 1;
        .header {
          font-size: 16px;
          font-weight: bold;
          height: 24px;
          border-left: 4px solid #64b3ed;
          padding-left: 15px;
          margin-top: 20px;
        }
        .date,
        .levels {
          padding: 0 20px 0px 25px;
          .label {
            margin: 20px 0 10px 0;
          }
          .add-input {
            position: relative;
            width: 150px;
            .add {
              position: absolute;
              right: 20px;
              top: 50%;
              transform: translateY(-50%);
              cursor: pointer;
              color: @font-color;
            }
          }
          .level-list {
            display: flex;
            margin-top: 10px;
            flex-wrap: wrap;
            .level-item {
              width: 100px;
              height: 38px;
              background: #ffffff;
              border: 1px solid #ccd4df;
              border-radius: 4px;
              font-size: 14px;
              color: #a0aec0;
              letter-spacing: 1.7px;
              margin-right: 20px;
              line-height: 38px;
              padding-left: 20px;
              margin-bottom: 10px;
              i {
                float: right;
                font-size: 18px;
                color: #f56565;
                cursor: pointer;
                margin-top: 10px;
              }
            }
          }
        }
      }
      .birthday-config {
        flex: 2;
      }
      .start-time {
        flex: 2;
      }
      .level-config {
        flex: 3;
      }
    }
    .right {
      flex: 1;
      background: #ffffff;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
      border: 1px solid #ccd4df;
      margin: 20px 40px 0 20px;
      display: flex;
      flex-direction: column;
      .relation-config {
        flex: 1;
        .header {
          font-size: 16px;
          font-weight: bold;
          height: 24px;
          border-left: 4px solid #64b3ed;
          padding-left: 15px;
          margin-top: 20px;
        }
        .relation {
          padding: 10px 0 0 25px;
          .label {
            margin: 20px 0 10px 0;
          }
          .add-input {
            width: 450px;
            position: relative;
            .add {
              position: absolute;
              right: 20px;
              top: 50%;
              transform: translateY(-50%);
              cursor: pointer;
              color: @font-color;
            }
          }
          .estate-list {
            width: 450px;
            height: 100px;
            overflow-y: auto;
            margin: 10px 0;
            .estate-item {
              height: 40px;
              position: relative;
              line-height: 40px;
              padding-left: 10px;
              span {
                color: #f56565;
                position: absolute;
                right: 20px;
                top: 50%;
                transform: translateY(-50%);
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
  .bottom {
    flex: 1;
    position: relative;
    .confirm-button {
      background: @font-color;
      border-radius: 21px;
      width: 110px;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 16px;
      cursor: pointer;
      letter-spacing: 10px;
      text-indent: 10px;
    }
  }
}
</style>