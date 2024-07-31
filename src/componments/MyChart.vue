<template>
  <div id="main" style="width: 100%; height: 100%;"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import axios from 'axios';

const fetchData = async () => {
  try {
      const token = "eyJ0eXAiOiJ0b2tlbiIsImFsZyI6IkhTNTEyIn0.eyJzdWIiOiI5IiwiaWF0IjoxNzIyMjc0ODM5LCJleHAiOjE3MjI4Nzk2Mzl9.Jw2sno033CsgO75s5S9vWtbtG4hg2sA4EXjw2faJQnmnVKEm68jZHSHSgui1BwxtcgqB0rcHw96RcirmBEj09A";
      const response = await axios.get('/tag/api/admin/users/sum/daily', {
          headers: {
              token: token
          }
      });

      if (response.data.code === 200) {
          const data = response.data.data;
          return data.slice(-30);
      } else {
          console.error('获取数据失败:', response.data.msg);
          return [];
      }
  } catch (error) {
      console.error('请求失败:', error);
      return [];
  }
};

onMounted(async () => {
  const chartDom = document.getElementById('main');
  const myChart = echarts.init(chartDom);

  const data = await fetchData();

  const dates = data.map(item => item.date);
  const counts = data.map(item => item.count);

  const option = {
      title: {
          text: '          本月新增用户数量（实时数据）'
      },
      xAxis: {
          type: 'category',
          data: dates
      },
      yAxis: {
          type: 'value'
      },
      series: [
          {
              data: counts,
              type: 'line',
              smooth: true
          }
      ]
  };

  myChart.setOption(option);

  window.addEventListener('resize', () => {
      myChart.resize();
  });
});
</script>

<style scoped>
#main {
  width: 100%;
  height: 400px;
}
</style>