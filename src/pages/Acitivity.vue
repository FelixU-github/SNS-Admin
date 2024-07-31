<template>
    <div>
      <div class="container">
        <div class="searchbar">
          <select v-model="searchType" style="margin-right: 10px;">
            <option value="username">用户名</option>
            <option value="nickname">用户昵称</option>
          </select>
          <input v-model="searchValue" placeholder="请输入搜索内容" style="margin-right: 10px;" />
          <button @click="handleSearch">搜索</button>
        </div>
      </div>
      <div class="container">
        <p>查询用户（根据用户名或昵称查询）</p>
      </div>
      <br>
      <!-- 这里是表格 -->
      <a-table :columns="columns" :data-source="dataSource" :pagination="pagination" :loading="loading"
        :scroll="{ y: 500, x: 100 }" @change="handleTableChange">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'operation'">
            <div class="operation-buttons">
              <button @click="handleDetails(record)">详情</button>
              <button @click="changeStatus(record, '正常')">正常</button>
              <button @click="changeStatus(record, '删除')">删除</button>
            </div>
          </template>
          <template v-else-if="column.key === 'avatar'">
            <img :src="record.avatar" alt="avatar" style="width: 50px; height: 50px;" />
          </template>
        </template>
      </a-table>
  
      <a-modal v-model:visible="isModalVisible" title="用户详情" @ok="handleOk" @cancel="handleCancel">
        <p>用户ID: {{ userDetails.userId }}</p>
        <p>用户名: {{ userDetails.username }}</p>
        <p>用户昵称: {{ userDetails.nickname }}</p>
        <p>头像: <img :src="userDetails.avatar" alt="avatar" style="width: 50px; height: 50px;" /></p>
        <p>用户状态: {{ userDetails.status }}</p>
        <p>创建时间: {{ userDetails.createTime }}</p>
        <p>更新时间: {{ userDetails.updateTime }}</p>
        <p>手机号: {{ userDetails.mobile }}</p>
        <p>性别: {{ userDetails.gender }}</p>
        <p>学校: {{ userDetails.school }}</p>
      </a-modal>
    </div>
  
    <!-- <div class="pagination-buttons">
      <button @click="prevPage">上一页</button>
      <button @click="nextPage">下一页</button>
    </div> -->
  </template>
  
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from "vue";
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
  
  interface UserDetails {
    userId: number;
    username: string;
    nickname: string;
    avatar: string;
    status: string;
    createTime: string;
    updateTime: string;
    mobile: string;
    gender: string;
    school: string;
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
          title: "博文内容",
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
      const searchType = ref("username");
      const searchValue = ref("");
      const isModalVisible = ref(false);
      const userDetails = ref<UserDetails>({
        userId: 0,
        username: "",
        nickname: "",
        avatar: "",
        status: "",
        createTime: "",
        updateTime: "",
        mobile: "",
        gender: "",
        school: ""
      });
      const pagination = ref({
        current: 1,
        pageSize: 8,
        total: 0,
        showTotal: (total: number) => `总共 ${total} 条`,
        showQuickJumper: true,
        showSizeChanger: false
      });
  
      const fetchData = async (searchType: string, searchValue: string) => {
        loading.value = true;
        try {
          const token = "eyJ0eXAiOiJ0b2tlbiIsImFsZyI6IkhTNTEyIn0.eyJzdWIiOiI5IiwiaWF0IjoxNzIyMjc0ODM5LCJleHAiOjE3MjI4Nzk2Mzl9.Jw2sno033CsgO75s5S9vWtbtG4hg2sA4EXjw2faJQnmnVKEm68jZHSHSgui1BwxtcgqB0rcHw96RcirmBEj09A";
          const response = await axios.get("/tag/api/admin/post", {
            headers: {
              token: token
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
  
      const fetchUserDetails = async (postId: number) => {
        try {
          const token = "eyJ0eXAiOiJ0b2tlbiIsImFsZyI6IkhTNTEyIn0.eyJzdWIiOiI5IiwiaWF0IjoxNzIyMjc0ODM5LCJleHAiOjE3MjI4Nzk2Mzl9.Jw2sno033CsgO75s5S9vWtbtG4hg2sA4EXjw2faJQnmnVKEm68jZHSHSgui1BwxtcgqB0rcHw96RcirmBEj09A";
          const response = await axios.get(`/tag/api/admin/users/${postId}`, {
            headers: {
              token: token
            }
          });
          const { code, data, msg } = response.data;
          if (code === 200) {
            userDetails.value = data;
          } else {
            console.error("获取用户详情失败:", code, msg);
          }
        } catch (error) {
          console.error("请求用户详情失败:", error);
        }
      };
  
      const changeStatus = async (record: DataItem, status: string) => {
        try {
          const token = "eyJ0eXAiOiJ0b2tlbiIsImFsZyI6IkhTNTEyIn0.eyJzdWIiOiI5IiwiaWF0IjoxNzIyMjc0ODM5LCJleHAiOjE3MjI4Nzk2Mzl9.Jw2sno033CsgO75s5S9vWtbtG4hg2sA4EXjw2faJQnmnVKEm68jZHSHSgui1BwxtcgqB0rcHw96RcirmBEj09A";
          const response = await axios.put(`/tag/api/admin/post`,null, {
            headers: {
              token: token
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
  
      const handleDetails = (record: DataItem) => {
        fetchUserDetails(record.postId);
        isModalVisible.value = true;
      };
  
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
        handleDetails,
        handleSearch,
        searchType,
        searchValue,
        isModalVisible,
        userDetails,
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
  </style>