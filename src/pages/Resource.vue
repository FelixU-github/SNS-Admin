<template>
    <a-layout>
      <a-layout-header>
        <a-menu
          v-model:selectedKeys="selectedKeys"
          theme="dark"
          mode="horizontal"
          :style="{ lineHeight: '64px'}"
        >
          <a-menu-item 
            key="1" 
            style="
            font-weight: 700; 
            font-size: larger;
            margin-right: 80%;"
            @click="selectRes(1, 30)"
          >
            资源列表
          </a-menu-item>
          <a-menu-item key="3" disabled>
            <a-label for="search">
              <ResCom id="search" :showDrawer="showDrawer" :selectRes="selectRes" />
            </a-label>
          </a-menu-item>
        </a-menu>
        <ResTable :Sourcedata="Sourcedata" :loading="loading" :deleteRes="deleteRes" />
      </a-layout-header>
    </a-layout>
  </template>

  <script setup>
  import { onMounted, ref } from 'vue';
  import ResTable from '../componments/ResTable.vue';
  import ResCom from '@/componments/ResCom.vue';
  import axios from 'axios';


  const selectedKeys = ref(['1']);

  /*数据库数据；*/
  const Sourcedata = ref([]);
  /*刷新标志 */
  const loading = ref(true);

  const token = 
    ref('eyJ0eXAiOiJ0b2tlbiIsImFsZyI6IkhTNTEyIn0.eyJzdWIiOiI5IiwiaWF0IjoxNzIyMjc0ODM5LCJleHAiOjE3MjI4Nzk2Mzl9.Jw2sno033CsgO75s5S9vWtbtG4hg2sA4EXjw2faJQnmnVKEm68jZHSHSgui1BwxtcgqB0rcHw96RcirmBEj09A');

  const fetchData = () => {
    selectRes(1, 30);
  };
  /*查询资源*/
  async function selectRes(page, pageSize, title) {
    try {
      const response = await axios.get("/tag/api/admin/resources", {
        headers: {
          token: token.value,
        },
        params: {
          page: page,
          pageSize: pageSize,
          title: title,
        }
      });
      const { code, data, msg} = response.data;
      console.log("服务器响应消息:", code, msg, data.total);  // 打印返回的 msg
      if (code === 200) {
        data.value = data.rows.map((row) => ({
          key: row.id,
          id: row.id,
          title: row.title,
          userNickname: row.userNickname,
          resource: row.resource,
          createTime: row.createTime,
          status:row.status,
        }));
        Sourcedata.value = data.value;
        if (data.total > pageSize) {
          selectRes(1, 2 * pageSize)
        }
      } else {
        console.error("获取数据失败:", code, msg);
      }
    } catch (error) {
      console.error("请求失败:", error);
    } finally {
      loading.value = false;
    }
  }

  //删除资源
  async function deleteRes(selectId) {
    loading.value = true;
    try {
      const response = await axios.put("/tag/api/admin/resources",{}, 
      {
        headers: {
          token: token.value,
        },
        params: {
          id: selectId,
          status: "删除",
        },
      });
      const { code, msg} = response.data;
      console.log("服务器响应消息:", code, msg);  // 打印返回的 msg
      if (code === 200) {
        //显示提示信息
        fetchData();
      } else {
        console.error("连接数据失败:", code, msg);
      }
    } catch (error) {
      console.error("请求失败:", error);
    } finally {
      loading.value = false;
    }
  }
  onMounted(fetchData);
</script>
