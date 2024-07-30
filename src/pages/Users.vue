<template>
  <div>
    <h1>查询用户（根据用户名或昵称查询）</h1>
    <div style="display: flex; justify-content: flex-end; margin-bottom: 10px;">
      <select v-model="searchType" style="margin-right: 10px;">
        <option value="username">用户名</option>
        <option value="nickname">用户昵称</option>
      </select>
      <input v-model="searchValue" placeholder="请输入搜索内容" style="margin-right: 10px;" />
      <button @click="handleSearch">搜索</button>
    </div>
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :pagination="{ pageSize: 10 }"
      :scroll="{ y: 500, x: 100 }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'operation'">
          <button @click="handleDetails(record)">详情</button>
          <button @click="changeStatus(record, '正常')">正常</button>
          <button @click="changeStatus(record, '禁用')">禁用</button>
        </template>
      </template>
    </a-table>
    <a-modal
      v-model:visible="isModalVisible"
      title="用户详情"
      @ok="handleOk"
      @cancel="handleCancel"
    >
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
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";

interface DataItem {
  key: number;
  userId: number;
  username: string;
  nickname: string;
  avatar: string;
  status: string;
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
        title: "用户ID",
        dataIndex: "userId",
        fixed: "left",
        width: 100,
        resizable: false,
        align: "center"
      },
      {
        title: "用户名",
        dataIndex: "username",
        fixed: "left",
        width: 100,
        resizable: false,
        align: "center"
      },
      {
        title: "用户昵称",
        dataIndex: "nickname",
        key: "nickname",
        width: 100,
        resizable: false
      },
      {
        title: "头像",
        key: "avatar",
        dataIndex: "avatar",
        width: 100,
        resizable: false,
        align: "center"
      },
      {
        title: "用户状态",
        key: "status",
        dataIndex: "status",
        width: 100,
        resizable: false,
        align: "center"
      },
      {
        title: "操作",
        key: "operation",
        fixed: "right",
        width: 200,
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

    const fetchData = async (searchType: string, searchValue: string) => {
      try {
        const token =
          "eyJ0eXAiOiJ0b2tlbiIsImFsZyI6IkhTNTEyIn0.eyJzdWIiOiI5IiwiaWF0IjoxNzIyMjc0ODM5LCJleHAiOjE3MjI4Nzk2Mzl9.Jw2sno033CsgO75s5S9vWtbtG4hg2sA4EXjw2faJQnmnVKEm68jZHSHSgui1BwxtcgqB0rcHw96RcirmBEj09A";
        const response = await axios.get("/tag/api/admin/users", {
          headers: {
            token: token
          },
          params: {
            page: 1,
            pageSize: 10,
            [searchType]: searchValue
          }
        });
        const { code, data, msg } = response.data;
        if (code === 200) {
          dataSource.value = data.rows.map((row: any) => ({
            key: row.userId,
            userId: row.userId,
            username: row.username,
            nickname: row.nickname,
            avatar: row.avatar,
            status: +row.status === 0 ? '正常' : +row.status === 1 ? '禁用' : +row.status === 2 ? '已删除' : '未知状态'
          }));
        } else {
          console.error("获取数据失败:", code, msg);
        }
      } catch (error) {
        console.error("请求失败:", error);
      } finally {
        loading.value = false;
      }
    };

    const fetchUserDetails = async (userId: number) => {
      try {
        const token =
          "eyJ0eXAiOiJ0b2tlbiIsImFsZyI6IkhTNTEyIn0.eyJzdWIiOiI5IiwiaWF0IjoxNzIyMjc0ODM5LCJleHAiOjE3MjI4Nzk2Mzl9.Jw2sno033CsgO75s5S9vWtbtG4hg2sA4EXjw2faJQnmnVKEm68jZHSHSgui1BwxtcgqB0rcHw96RcirmBEj09A";
        const response = await axios.get(`/tag/api/admin/users/${userId}`, {
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
        const token =
          "eyJ0eXAiOiJ0b2tlbiIsImFsZyI6IkhTNTEyIn0.eyJzdWIiOiI5IiwiaWF0IjoxNzIyMjc0ODM5LCJleHAiOjE3MjI4Nzk2Mzl9.Jw2sno033CsgO75s5S9vWtbtG4hg2sA4EXjw2faJQnmnVKEm68jZHSHSgui1BwxtcgqB0rcHw96RcirmBEj09A";
        const response = await axios.put(`/tag/api/admin/users`, null, {
          headers: {
            token: token
          },
          params: {
            userId: record.userId,
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
      fetchData(searchType.value, searchValue.value);
    };

    const handleDetails = (record: DataItem) => {
      fetchUserDetails(record.userId);
      isModalVisible.value = true;
    };

    const handleOk = () => {
      isModalVisible.value = false;
    };

    const handleCancel = () => {
      isModalVisible.value = false;
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
      changeStatus
    };
  }
});
</script>

<style scoped>
/* 自定义样式 */
</style>