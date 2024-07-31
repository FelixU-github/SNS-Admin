<template>
    <div id="main" ref="chartContainer" style="width: 100%; height: 400px;"></div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  
  export default {
    name: 'EChartExample',
    mounted() {
      this.initChart();
    },
    methods: {
      initChart() {
        var chartDom = this.$refs.chartContainer;
        var myChart = echarts.init(chartDom);
        let base = +new Date(1968, 9, 3);
        let oneDay = 24 * 3600 * 1000;
        let date = [];
        let data = [Math.random() * 300];
        for (let i = 1; i < 20000; i++) {
          var now = new Date((base += oneDay));
          date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
          data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
        }
        
        var option = {
          tooltip: {
            trigger: 'axis',
            position: function (pt) {
              return [pt[0], '10%'];
            }
          },
          title: {
            left: 'center',
            text: '社区活跃度监控 （Fake Data）'
          },
          toolbox: {
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              restore: {},
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: date
          },
          yAxis: {
            type: 'value',
            boundaryGap: [0, '100%']
          },
          dataZoom: [
            {
              type: 'inside',
              start: 0,
              end: 10
            },
            {
              start: 0,
              end: 10
            }
          ],
          series: [
            {
              name: 'Fake Data',
              type: 'line',
              symbol: 'none',
              sampling: 'lttb',
              itemStyle: {
                color: 'rgb(255, 70, 131)'
              },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgb(255, 158, 68)'
                  },
                  {
                    offset: 1,
                    color: 'rgb(255, 70, 131)'
                  }
                ])
              },
              data: data
            }
          ]
        };
  
        myChart.setOption(option);
      }
    }
  };
  </script>
  
  <style>
  /* 你可以根据需要调整样式 */
  </style>