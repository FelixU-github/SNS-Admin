<template>
  <a-table 
  :columns="columns" 
  :data-source="Sourcedata"
  :loading="loading"
  >
    <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'icon'">
          <container-outlined style="font-size: 24px; margin-left: 20px;"/>
        </template> 
        <template v-if="column.key === 'content'">查看详情</template> 
        <template v-if="column.key === 'option'">
          <a-button 
            @click="deleteNotes(record.id)"
            type="primary" 
            style="margin-left: 20px; font-weight: 700;" 
            danger>
            Delete
          </a-button>
        </template>
    </template>
    <template #expandedRowRender="{ record }">
      <div>
        <a-card :title="record.title">
          {{ record.content }}
        </a-card>
      </div>
    </template>
  </a-table>
</template>


<script setup>
  import { ContainerOutlined,} from '@ant-design/icons-vue';
  import { Table } from 'ant-design-vue';
  import { ref } from 'vue';

  const a = ref('###123');

  //公告数据结构
  const columns = [
  {
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
    dataIndex: 'createTime',
    align:'center',
  }, {
    key: 'nickname',
    title: '发布人(管理员)',
    dataIndex: 'nickname',
    align:'center',
  }, {
    key: 'content',
    title: '公告详情',
    dataIndex: "content",
    align:'center',
    width: 100,
  },
  Table.EXPAND_COLUMN,
  {
    key: 'option',
    title: '操作',
    align:'center',
  }];

  const props = defineProps({
    Sourcedata: Object,
    loading: Boolean,
    deleteNotes: Function,
  });

  const deleteNotes = id =>{
    props.deleteNotes(id);
  }
</script>