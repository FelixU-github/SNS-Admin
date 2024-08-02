<template>
  <div class="dashboard-container">
    
    <div class="header">
      <h3>内推管理台 （根据标题或发布人昵称查询）</h3>
    </div>
    <hr>

  <div>
    <div class="container">
      <div class="searchbar">
        <select v-model="searchType" style="margin-right: 10px;">
          <option value="title">内推 id</option>
          <option value="nickname">用户昵称</option>
        </select>
        <input v-model="searchValue" placeholder="请输入搜索内容" style="margin-right: 10px;" />
        <button @click="handleSearch">搜索</button>
      </div>
    </div>

    <br>
    <!-- 这里是表格 -->
    <a-table :columns="columns" :data-source="dataSource" :pagination="pagination" :loading="loading"
      :scroll="{ y: 500, x: 100 }" @change="handleTableChange">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'operation'">
          <div class="operation-buttons">

            <button @click="changeStatus(record, '正常')">正常</button>
            <button @click="changeStatus(record, '删除')">删除</button>
          </div>
        </template>

      </template>
    </a-table>
  </div>
</div>

</template>


<script lang="ts">
import { defineComponent, ref, onMounted,inject } from "vue";
import axios from "axios";


interface DataItem {
  postId: number;
  uid: number;
  categoryName: string;
  title: string;
  content: string;
  readCount: number;
  postTop: string;
  createTime: string;
  status: string;
  nickname: string;
}

export default defineComponent({
  setup() {
    const columns = ref([
      {
        title: "博文id",
        dataIndex: "postId",
        key: "postId",
        fixed: "left",
        width: 100,
        resizable: true,
        align: "center"
      },
      {
        title: "用户id",
        dataIndex: "uid",
        key: "uid",
        width: 100,
        resizable: false,
        align: "center"
      },
      {
        title: "用户昵称",
        dataIndex: "nickname",
        key: "nickname",
        width: 100,
        resizable: false,
        align: "center"
      },
      {
        title: "博文分类",
        dataIndex: "categoryName",
        key: "categoryName",
        width: 100,
        resizable: false,
        align: "center"
      },
      {
        title: "博文标题",
        dataIndex: "title",
        key: "title",
        width: 150,
        resizable: false,
        align: "center"
      },
      {
        title: "招聘内容",
        dataIndex: "content",
        key: "content",
        width: 200,
        resizable: false,
        align: "center"
      },
      {
        title: "阅读量",
        dataIndex: "readCount",
        key: "readCount",
        width: 100,
        resizable: false,
        align: "center"

      },

      {
        title: "创建时间",
        dataIndex: "createTime",
        key: "createTime",
        width: 150,
        resizable: false,
        align: "center"
      },
      {
        title: "博文状态",
        dataIndex: "status",
        key: "status",
        width: 100,
        resizable: false,
        align: "center"
      },
      {
        title: "操作",
        key: "operation",
        fixed: "right",
        width: 150,
        resizable: true,
        align: "center"
      }
    ]);
    const dataSource = ref<DataItem[]>([]);
    const loading = ref(true);
    const searchType = ref("title");
    const searchValue = ref("");
    const isModalVisible = ref(false);
    const pagination = ref({
      current: 1,
      pageSize: 8,
      total: 0,
      showTotal: (total: number) => `总共 ${total} 条`,
      showQuickJumper: true,
      showSizeChanger: false
    });
    const token = inject('token');
    const fetchData = async (searchType: string, searchValue: string) => {
      loading.value = true;
      try {
        
        const response = await axios.get("/tag/api/admin/jobs", {
          headers: {
            token: token.value
          },
          params: {
            page: pagination.value.current,
            pageSize: pagination.value.pageSize,
            [searchType]: searchValue
          }
        });
        const { code, data, msg } = response.data;
        if (code === 200) {
          dataSource.value = data.rows.map((row: any) => ({
            postId: row.postId,
            uid: row.uid,
            categoryName: row.categoryName,
            title: row.title,
            content: row.content,
            readCount: row.readCount,
            postTop: row.postTop,
            createTime: row.createTime,
            status: row.status,
            nickname: row.nickname

          }));
          pagination.value.total = data.total;
        } else {
          console.error("获取数据失败:", code, msg);
        }
      } catch (error) {
        console.error("请求失败:", error);
      } finally {
        loading.value = false;
      }
    };



    const changeStatus = async (record: DataItem, status: string) => {
      try {
        
        const response = await axios.put(`/tag/api/admin/jobs`,null, {
          headers: {
            token: token.value
          },
          params: {
            postId: record.postId,
            status: status
          }
        });
        const { code, msg } = response.data;
        if (code === 200) {
          fetchData(searchType.value, searchValue.value);
        } else {
          console.error("更改状态失败:", code, msg);
        }
      } catch (error) {
        console.error("请求更改状态失败:", error);
      }
    };

    const handleSearch = () => {
      pagination.value.current = 1; // 重置到第一页
      fetchData(searchType.value, searchValue.value);
    };

    // const handleDetails = (record: DataItem) => {
    //   fetchUserDetails(record.postId);
    //   isModalVisible.value = true;
    // };

    const handleOk = () => {
      isModalVisible.value = false;
    };

    const handleCancel = () => {
      isModalVisible.value = false;
    };

    const handleTableChange = (paginationConfig: any) => {
      pagination.value.current = paginationConfig.current;
      fetchData(searchType.value, searchValue.value);
    };

    const prevPage = () => {
      if (pagination.value.current > 1) {
        pagination.value.current -= 1;
        fetchData(searchType.value, searchValue.value);
      }
    };

    const nextPage = () => {
      if (pagination.value.current < Math.ceil(pagination.value.total / pagination.value.pageSize)) {
        pagination.value.current += 1;
        fetchData(searchType.value, searchValue.value);
      }
    };

    onMounted(() => fetchData(searchType.value, searchValue.value));

    return {
      dataSource,
      columns,
      // handleDetails,
      handleSearch,
      searchType,
      searchValue,
      isModalVisible,
      handleOk,
      handleCancel,
      loading,
      changeStatus,
      pagination,
      handleTableChange,
      prevPage,
      nextPage
    };
  }
});

</script>


<style scoped>
.container {
  display: flex;
  justify-content: center;
  margin-top: 10px;

}

.pagination-buttons {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  width: 100%;
  margin-left: auto;
  padding-right: 20px;
}

.searchbar {
  display: flex;
  gap: 10px;
}

.operation-buttons {
  display: flex;
  justify-content: space-evenly;

}

.dashboard-container {
  border: 2px solid #ccc; /* 添加边框 */
  background-color: #ffffff; /* 添加背景色 */
  padding: 20px; /* 添加内边距 */
  border-radius: 10px; /* 添加圆角 */
}
</style>