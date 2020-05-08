<template>
  <div id="statistic">
    <div class="left">
      <div class="top">
        <div class="header">预报名人数统计（街道）</div>
        <div id="chart1"></div>
      </div>
      <div class="bottom">
        <div class="header">预报名人数统计（有房、无房）</div>
        <div id="chart3"></div>
      </div>
    </div>
    <div class="right">
      <div class="top">
        <div class="header">预报名人数统计（学校）</div>
        <div id="chart2"></div>
      </div>
      <div class="bottom">
        <div class="header">预报名人数统计（本省、外省）</div>
        <div id="chart4"></div>
      </div>
    </div>
  </div>
</template>
<script>
let echarts = require("echarts");
import * as api from "@/service/apiList";
import http from "@/service/service";
export default {
  data() {
    return {};
  },
  mounted() {
    let vm = this;
    this.$nextTick(function() {
      this.$Spin.show();
      http.get(api.SHOWSTATISTICINFO, {}, this).then(resp => {
        this.$Spin.hide();
        let res = resp.data.data;
        vm.createStreet(res.streetStatistics);
        vm.createSchool(res.studentStatisticBySchool);
        vm.createHasHouse(res.studentStatisticByProperty);
        vm.createProvince(res.studentStatisticsByProvince);
      });
    });
  },
  methods: {
    createStreet(data) {
      var myChart = echarts.init(document.getElementById("chart1"));
      let streetList = [];
      let dataList = [];
      data.map(v => {
        streetList.push(v.streetName);
        dataList.push(v.count);
      });
      let option = {
        color: ["#64B3ED"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: {
          type: "category",
          axisTick: {
            show: false
          },
          axisLabel: {
            color: "#728096"
          },
          axisLine: {
            lineStyle: {
              color: "#728096"
            }
          },
          data: streetList
        },
        yAxis: {
          type: "value",
          splitLine: {
            lineStyle: {
              type: "dashed"
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: "#728096"
          }
        },
        series: [
          {
            data: dataList,
            type: "bar",
            stack: "人数",
            barWidth: 70
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    createSchool(data) {
      var myChart = echarts.init(document.getElementById("chart2"));
      let schoolList = [];
      let dataList = [];
      data.map(v => {
        schoolList.push(v.schoolName);
        dataList.push(v.studentSum);
      });
      let option = {
        color: "#667FEA",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: {
          type: "category",
          axisTick: {
            show: false
          },
          axisLabel: {
            color: "#728096",
            rotate: 18
          },
          axisLine: {
            lineStyle: {
              color: "#728096"
            }
          },
          data: schoolList
        },
        yAxis: {
          type: "value",
          splitLine: {
            lineStyle: {
              type: "dashed"
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: "#728096"
          }
        },
        series: [
          {
            data: dataList,
            type: "bar",
            stack: "学校",
            barWidth: 40,
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#4A5569",
                    fontSize: 14
                  }
                }
              }
            }
          }
          // {
          //   name: "收入",
          //   type: "bar",
          //   stack: "人数",
          //   label: {
          //     show: true,
          //     position: "top"
          //   },
          //   data: [621, 720, 341, 433, 666, 591, 372, 986, 611]
          // }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    createHasHouse(data) {
      var myChart = echarts.init(document.getElementById("chart3"));
      let schoolList = [];
      let hasHouse = [];
      let noHouse = [];
      let dateHouse = [];
      data.map(v => {
        schoolList.push(v.schoolName);
        hasHouse.push(v.propertyNum);
        if (v.schoolCode == "0401" || v.schoolCode == "01") {
          noHouse.push(0);
          dateHouse.push(v.otherNum);
        } else {
          noHouse.push(v.otherNum);
          dateHouse.push(0);
        }
        // dataList
      });
      let option = {
        color: ["#ED64A6","#F6AD55", "#64B3ED", ],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function(params) {
            if (
              params[0].name === "南通市东方中学" ||
              params[0].name === "实小（新河校区）"
            ) {
              return (
                params[2].name +
                "<br/>" +
                params[2].marker +
                params[2].seriesName +
                "：" +
                params[2].value +
                "<br/>" +
                params[0].marker +
                params[0].seriesName +
                "：" +
                params[0].value
              );
            } else {
              return (
                params[2].name +
                "<br/>" +
                params[2].marker +
                params[2].seriesName +
                "：" +
                params[2].value +
                "<br/>" +
                params[1].marker +
                params[1].seriesName +
                "：" +
                params[1].value
              );
            }
          }
        },
        legend: {
          data: ["有房", "无房", "期房"],
          top: 30,
          left: 35,
          textStyle: {
            color: "#728096"
          }
        },
        xAxis: {
          type: "category",
          axisTick: {
            show: false
          },
          axisLabel: {
            color: "#728096",
            rotate: 18
          },
          axisLine: {
            lineStyle: {
              color: "#728096"
            }
          },
          data: schoolList
        },
        yAxis: {
          type: "value",
          splitLine: {
            lineStyle: {
              type: "dashed"
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: "#728096"
          }
        },
        series: [
          {
            name: "期房",
            data: dateHouse,
            type: "bar",
            stack: "有房",
            barWidth: 20
          },
          {
            name: "无房",
            data: noHouse,
            type: "bar",
            stack: "有房",
            barWidth: 20
          },
          {
            name: "有房",
            data: hasHouse,
            type: "bar",
            stack: "有房",
            barWidth: 20
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    createProvince(data) {
      var myChart = echarts.init(document.getElementById("chart4"));
      let dataList = [
        {
          value: 0,
          name: "本省"
        },
        {
          value: 0,
          name: "省外"
        }
      ];
      dataList[0].value = data.localNum;
      dataList[1].value = data.otherNum;
      let option = {
        color: ["#667FEA", "skyblue"],
        tooltip: {
          trigger: "item",
          formatter: "人数 <br/>{b} : {c} 人({d}%)"
        },
        series: [
          {
            data: dataList,
            type: "pie",
            stack: "人数",
            barWidth: 70,
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#4A5569",
                    fontSize: 14
                  }
                }
              }
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }
};
</script>

<style lang="less" scoped>
#statistic {
  flex: 1;
  display: flex;
  .left,
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    .top,
    .bottom {
      flex: 1;
      background: #ffffff;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
      display: flex;
      padding-top: 10px;
      flex-direction: column;
      #chart1,
      #chart2,
      #chart3,
      #chart4 {
        padding-bottom: 10px;
        box-sizing: border-box;
        flex: 1;
      }
      .header {
        font-size: 18px;
        font-weight: bold;
        height: 24px;
        border-left: 4px solid #64b3ed;
        padding-left: 15px;
        margin-top: 5px;
      }
    }
  }
  .left {
    .top {
      margin: 20px 10px 0 40px;
    }
    .bottom {
      margin: 20px 10px 20px 40px;
    }
  }
  .right {
    .top {
      margin: 20px 20px 0 10px;
    }
    .bottom {
      margin: 20px 20px 20px 10px;
    }
  }
}
</style>