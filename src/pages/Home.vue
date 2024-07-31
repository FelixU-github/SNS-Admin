<template>
  <div class="charts-container">
    <div class="lineChart">
    <LineChart />
  </div>

  </div>

  <div>
    <MyChart />
    
  </div>
  
</template>

<script setup>
import LineChart from "@/componments/LineChart.vue";
import MyChart from "@/componments/MyChart.vue";


</script>

<style scoped>
.charts-container {
  display: flex;
  justify-content: space-between; /* 控制图表之间的间距 */
  gap: 20px; /* 控制图表之间的间距 */
}

.lineChart {
  flex: 1; /* 让图表组件平分父容器的宽度 */
  min-width: 300px; /* 控制最小宽度，防止过度收缩 */
  height: 400px; /* 控制图表高度 */
}
</style>