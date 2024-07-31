<template>
    <div id="main-1" style="width: 100%; height: 100%;"></div>
</template>

<script setup>
import { ref, onMounted ,inject} from 'vue';
import * as echarts from 'echarts';
import axios from 'axios';
const token = inject('token');
const fetchData = async () => {
    try {
        
        const response = await axios.get('/tag/api/admin/users/sum/daily', {
            headers: {
                token: token.value
            }
        });

        if (response.data.code === 200) {
            const data = response.data.data;
            return data.slice(-7);
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
    const chartDom = document.getElementById('main-1');
    const myChart = echarts.init(chartDom);

    const data = await fetchData();

    const dates = data.map(item => item.date);
    const counts = data.map(item => item.count);

    const option = {
        title: {
            text: '          本周新增用户数量 (实时数据)'
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
#main-1 {
    width: 100%;
    height: 400px;
}
</style>