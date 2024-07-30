<template>

  
    <div class="person">
        <div id="main" style="width: 50%; height: 400px;">

        </div>
    </div>


</template>



<script lang="ts" setup name="Person">
import { onMounted } from 'vue';
import * as echarts from 'echarts';
// 在组件挂载后初始化 ECharts 图表
onMounted(() => {
  var chartDom = document.getElementById('main');
  if (chartDom) {
    var myChart = echarts.init(chartDom);
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
          data: [150, 232, 224, 218, 135, 147, 260],
          type: 'line'
        }
      ]
    };
    myChart.setOption(option);
  }
});





</script>

<style scoped>
.person {
    background-color: rgb(255, 255, 255);
    box-shadow: 0 0 10px;
    border-radius: 10px;
    padding: 20px;
}


</style>