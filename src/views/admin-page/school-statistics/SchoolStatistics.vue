<template>
  <div id="statistic">
    <div class="left">
      <div class="top">
        <div id="chart1"></div>
      </div>
      <div class="bottom">
        <div id="chart3"></div>
      </div>
    </div>
    <div class="right">
      <div class="top">
        <div id="chart2"></div>
      </div>
      <div class="bottom">
        <div id="chart4"></div>
      </div>
    </div>
  </div>
</template>

<script>
let echarts = require("echarts");
export default {
  data() {
    return {};
  },
  mounted() {
    let vm = this;
    this.$nextTick(function() {
      vm.createStreet();
      vm.createSchool();
      vm.createHasHouse();
      vm.createProvince();
    });
  },
  methods: {
    createStreet() {
      var myChart = echarts.init(document.getElementById("chart1"));
      let option = {
        color: ["#64B3ED"],
        title: {
          text: "预报名人数统计（街道）"
        },
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
          data: [
            "江海街道",
            "老洪港街道",
            "小海街道",
            "新开街道",
            "竹行街道",
            "中兴街道"
          ]
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
            data: [120, 200, 150, 80, 70, 110],
            type: "bar",
            stack: "人数",
            barWidth: 70
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    createSchool() {
      var myChart = echarts.init(document.getElementById("chart2"));
      let option = {
        color: "#667FEA",
        title: {
          text: "预报名人数统计（学校）"
        },
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
            rotate: 30
          },
          axisLine: {
            lineStyle: {
              color: "#728096"
            }
          },
          data: [
            "竹行中学",
            "东方中学",
            "通师附小",
            "竹行小学",
            "实小新河校区",
            "实小育才校区",
            "实小能达校区",
            "实验小星湖校区",
            "小海中学"
          ]
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
            data: [621, 720, 341, 433, 666, 591, 372, 986, 611],
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
    createHasHouse() {
      var myChart = echarts.init(document.getElementById("chart3"));
      let option = {
        color: ["#64B3ED", "#F6AD55", "#ED64A6"],
        title: {
          text: "预报名人数统计（有房、无房）"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
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
            rotate: 30
          },
          axisLine: {
            lineStyle: {
              color: "#728096"
            }
          },
          data: [
            "竹行中学",
            "东方中学",
            "通师附小",
            "竹行小学",
            "实小新河校区",
            "实小育才校区",
            "实小能达校区",
            "实验小星湖校区",
            "小海中学"
          ]
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
            name: "有房",
            data: [589, 559, 345, 556, 475, 567, 452, 466, 411],
            type: "bar",
            stack: "有房",
            barWidth: 20
            // itemStyle: {
            //   normal: {
            //     label: {
            //       show: true, //开启显示
            //       position: "top", //在上方显示
            //       textStyle: {
            //         //数值样式
            //         color: "#4A5569",
            //         fontSize: 14
            //       }
            //     }
            //   }
            // }
          },
          {
            name: "无房",
            data: [120, 0, 12, 12, 2, 9, 8, 19, 4],
            type: "bar",
            stack: "无房",
            barWidth: 20
            // itemStyle: {
            //   normal: {
            //     label: {
            //       show: true, //开启显示
            //       position: "top", //在上方显示
            //       textStyle: {
            //         //数值样式
            //         color: "#4A5569",
            //         fontSize: 14
            //       }
            //     }
            //   }
            // }
          },
          {
            name: "期房",
            data: [0, 36, 0, 0, 0, 0, 0, 0, 0],
            type: "bar",
            stack: "期房",
            barWidth: 20,
            barGap: "-100%"
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    createProvince() {
      var myChart = echarts.init(document.getElementById("chart4"));
      let option = {
        color: ["#667FEA", "skyblue"],
        title: {
          text: "预报名人数统计（本省、外省）"
        },
        tooltip: {
          trigger: "item",
          formatter: "人数 <br/>{b} : {c} 人({d}%)"
        },
        series: [
          {
            data: [
              {
                value: 10322,
                name: "本省"
              },
              {
                value: 1035,
                name: "省外"
              }
            ],
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
      #chart1,
      #chart2,
      #chart3,
      #chart4 {
        flex: 1;
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