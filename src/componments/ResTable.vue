<template>
  <a-table 
  :columns="columns" 
  :data-source="Sourcedata"
  :loading="loading"
  >
    <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'icon'">
          <folder-outlined style="font-size: 24px;"/>
        </template> 
        <a href="#" v-if="column.key === 'resource' && record.status === 0">{{ record.resource }}</a>
        <a href="#" v-else-if="column.key === 'resource'" disabled>{{ record.resource }}</a>
        <template v-if="column.key === 'status' && record.status === 0">
          有效资源
        </template>
        <template v-else-if="column.key === 'status'">
          资源已丢失
        </template> 
        <template v-if="column.key === 'option' && record.status === 0">
          <a-button 
            @click="showModal(record)"
            type="primary" 
            style="margin-left: 20px; font-weight: 700;" 
            danger>
            Delete
          </a-button>
          <a-modal v-model:visible="visible" title="删除提醒" @ok="handleOk">
            <hr><br>
            <p>确定删除该资源么？<strong style="font-size: large;">删除后不可恢复！</strong></p>
            <p>《{{ res.title}}》</p>
          </a-modal>
        </template>
        <template v-else-if="column.key === 'option'">
          <a-button 
            type="primary" 
            style="margin-left: 20px; font-weight: 700;" 
            danger disabled>
            Delete
          </a-button>
        </template>
    </template>
  </a-table>
</template>


<script setup>
  import { FolderOutlined } from '@ant-design/icons-vue';
  import { ref } from 'vue';

  const a = ref('###123');

  //公告数据结构
  const columns = [
  {
    key: 'icon',
    title: 'Resources',
    align:'center',
    width:100,
  }, 
  {
    key: 'title',
    title: '资源名',
    dataIndex: 'title',
    align:'center',
  }, {
    key: 'createTime',
    title: '上传时间',
    dataIndex: 'createTime',
    align:'center',
  }, {
    key: 'userNickname',
    title: '作者',
    dataIndex: 'userNickname',
    align:'center',
  }, {
    key: 'resource',
    title: '文件链接',
    dataIndex: "resource",
    align:'center',
  },
  {
    key: 'status',
    title: '资源状态',
    dataIndex: "status",
    align:'center',
    width: 150,
  },
  {
    key: 'option',
    title: '操作',
    align:'center',
  }];

  const props = defineProps({
    Sourcedata: Object,
    loading: Boolean,
    deleteRes: Function,
  });

  const deleteRes = id =>{
    props.deleteRes(id);
  }

  //删除提醒框控制
  const res= ref({
    id: 1,
    title: '',
  });//删除资源
  const visible = ref(false);//删除提醒框状态
  const showModal = (data) => {
    res.value.id = data.id;
    res.value.title = data.title;
    visible.value = true;
  };
  const handleOk = () => {
    console.log(res.value.id);
    deleteRes(res.value.id)
    visible.value = false;
  };

</script>