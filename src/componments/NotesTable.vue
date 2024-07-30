<template>
  <a-table 
  :columns="columns" 
  :data-source="data" 
  :expand-icon-column-index="columns.length - 1">
      <template #bodyCell="{ column }">
          <template v-if="column.key === 'icon'">
              <align-left-outlined />
          </template> 
          <template v-if="column.key === 'content'">查看详情</template> 
          <template v-if="column.key === 'option'">
            <a-button 
            type="primary" 
            style="background-color: green;">编辑公告</a-button>

            <a-button 
            type="primary" 
            style="margin-left: 20px;" 
            danger>删除公告</a-button>
          </template>
      </template>
      <template #expandedRowRender="{ record }">
        <p style="text-align: center">{{ record.content }}</p>
      </template>
  </a-table>
</template>


<script setup>
  import { AlignLeftOutlined,} from '@ant-design/icons-vue';
  import { ref } from 'vue';
  
  //公告数据结构
  const columns = [{
    key: 'icon',
    title: '',
    width:100,
  }, 
  {
    key: 'id',
    title: 'Id',
    dataIndex: 'id',
    align:'center',
  }, {
    key: 'title',
    title: '题目',
    dataIndex: 'title',
    align:'center',
  }, {
    key: 'createTime',
    title: '创建时间',
    dataIndex: 'create_time',
    align:'center',
  },{
    key: 'content',
    title: '公告详情',
    dataIndex: "content",
    align:'center',
    width: 100,
  },{
    key: 'option',
    title: '操作',
    align:'center',
  }];

  /*获取数据库数据；*/
  const data = ref([
  {
    key:"data1",
    id: 1,
    title: '标题',
    content: '内容111',
    create_time: '2023-05-05'
  },
  {
    key:"data2",
    id: 2,
    title: '标题',
    content: '内容222',
    create_time: '2023-05-05',
  },
  {
    key:"data3",
    id: 3,
    title: '标题',
    content: '内容333',
    create_time: '2023-05-05',
  },
]);

</script>