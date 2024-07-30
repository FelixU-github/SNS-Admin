<template>
  <!-- 这里定义了一个用于绘制图表的 DOM 容器 -->
  <div id="main" style="width: 600px; height: 400px;"></div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
// 引入 ECharts 库
import * as echarts from 'echarts';

// 在组件挂载后初始化 ECharts 图表
onMounted(() => {
  // 获取 DOM 容器
  var chartDom = document.getElementById('main');
  // 确保获取到 DOM 容器后再进行初始化
  if (chartDom) {
    // 初始化 ECharts 实例
    var myChart = echarts.init(chartDom);
    // 定义图表的配置项和数据
    var option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 210],
          type: 'line'
        }
      ]
    };
    // 使用刚指定的配置项和数据显示图表
    myChart.setOption(option);
  }
});
</script>

<style scoped>
/* 为图表容器设置样式 */
#main {
  width: 100%;
  height: 100%;
}
</style>
