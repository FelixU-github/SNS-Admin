<template>
    <div>
      <h1>测试查询用户功能</h1>
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
        </template>
      </template>
    </a-table>
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
          width: 100,
          resizable: true,
          align: "center"
        }
      ]);
      const dataSource = ref<DataItem[]>([]);
      const loading = ref(true);
  
      const fetchData = async () => {
        try {
          const token =
            "eyJ0eXAiOiJ0b2tlbiIsImFsZyI6IkhTNTEyIn0.eyJzdWIiOiI5IiwiaWF0IjoxNzIyMjc0ODM5LCJleHAiOjE3MjI4Nzk2Mzl9.Jw2sno033CsgO75s5S9vWtbtG4hg2sA4EXjw2faJQnmnVKEm68jZHSHSgui1BwxtcgqB0rcHw96RcirmBEj09A";
          const response = await axios.get("/tag/api/admin/users", {
            headers: {
              token: token
            },
            params: {
              page: 1,
              pageSize: 1,
            }
          });
          const { code, data ,msg} = response.data;
          console.log("服务器响应消息:", code, msg,data.total);  // 打印返回的 msg
          if (code === 200) {
            dataSource.value = data.rows.map((row: any) => ({
              key: row.userId,
              userId: row.userId,
              username: row.username,
              nickname: row.nickname,
              avatar: row.avatar,
              status: row.status
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
  
      onMounted(fetchData);
  
      const handleDetails = (record: DataItem) => {
        // 在这里处理详情按钮点击事件
        console.log("详情按钮点击", record);
      };
  
      return {
        dataSource,
        columns,
        handleDetails,
        loading
      };
    }
  });
  </script>
  
  <style scoped>
  /* 自定义样式 */
  </style>