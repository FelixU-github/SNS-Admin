<template>
  <div class="dashboard-container">
    <div class="header">
      <h2>监控台</h2>
    </div>

    <div class="charts-container">
      <div class="lineChart">
        <LineChart />
      </div>
      <div class="lineChart">
        <MyChart />
        <!-- <Zouma /> -->
      </div>
    </div>
    <br>
    <div class="charts-container-2">
      <div class="lineChart-2">
        <DataChart />
      </div>
    </div>
  </div>
  <float-button />
</template>

<script setup>
import LineChart from "@/componments/LineChart.vue";
import MyChart from "@/componments/MyChart.vue";
import FloatButton from "@/componments/FloatButton.vue";
import { Carousel } from "ant-design-vue";
import DataChart from "@/componments/DataChart.vue";


</script>

<style scoped>
/* 最外层容器 */
.dashboard-container {
  border: 2px solid #ccc; /* 添加边框 */
  background-color: #ffffff; /* 添加背景色 */
  padding: 20px; /* 添加内边距 */
  border-radius: 10px; /* 添加圆角 */
}

/* 头部样式 */
.header {
  margin-bottom: 20px; /* 头部与下方内容的间距 */
}

h2 {
  margin: 0; /* 移除标题的默认外边距 */
  color: #333; /* 设置文本颜色 */
}

/* 图表容器 */
.charts-container {
  display: flex;
  gap: 20px; /* 控制图表之间的间距 */
  
}


.lineChart {
  flex: 1; /* 图表等分容器 */
  height: 300px; /* 控制图表高度 */
  border: 2px solid #ccc; /* 添加边框 */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* 添加阴影 */
  border-radius: 20px; /* 添加圆角 */
  padding: 20px; /* 控制内边距 */
  background-color: #f6f7f3; /* 添加背景色 */
}

.lineChart-2 {
  flex: 1; /* 图表等分容器 */
  height: 100%; /* 控制图表高度 */
  border: 2px solid #ccc; /* 添加边框 */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* 添加阴影 */
  border-radius: 20px; /* 添加圆角 */
  padding: 20px; /* 控制内边距 */
  background-color: #f6f2f2; /* 添加背景色 */
}
</style>