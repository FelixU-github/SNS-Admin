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
            margin-right: 70%;"
          >
            所有公告
          </a-menu-item>
          <a-menu-item key="3" disabled>
            <a-label for="search">
              <NotesCom id="search" :showDrawer="showDrawer" />
            </a-label>
          </a-menu-item>
        </a-menu>
        <NotesTable :Sourcedata="Sourcedata" :loading="loading" :deleteNotes="deleteNotes" />
      </a-layout-header>
    </a-layout>
    <!-- 编辑区 -->
    <a-drawer
      v-model:visible="visible"
      class="custom-class"
      style="color: red"
      title="Basic Drawer"
      placement="right"
      @after-visible-change="afterVisibleChange"
    >
      <div style="font-size: large; color: black; font-family: 黑体;">
        标题：
        <a-textarea
          v-model:value="value1"
          placeholder="在此填写公告标题"
          auto-size
        />
        <div style="margin: 24px 0"></div>
        内容：
        <a-textarea
          v-model:value="value2"
          placeholder="在此描述公告内容"
          :auto-size="{ minRows: 10, maxRows: 100 }"
        />
        <div style="margin: 24px 0"></div>
        <a-button @click="addNotes(value1, value2)" style="background-color:aquamarine;">发布</a-button>
      </div>
    </a-drawer>
  </template>

  <script setup>
  import { onMounted, ref } from 'vue';
  import NotesTable from '../componments/NotesTable.vue';
  import NotesCom from '@/componments/NotesCom.vue';
  import axios from 'axios';

  const selectedKeys = ref(['1']);

  /*数据库数据；*/
  const Sourcedata = ref([]);
  /*刷新标志 */
  const loading = ref(true);

  //编辑框弹出状态
  const visible = ref(false);
  //输入框的信息
  const value1 = ref('');
  const value2 = ref('');

  const afterVisibleChange = bool => {
      console.log('visible', bool);
    };
  const showDrawer = () => {
    visible.value = true;
    console.log(123)
  };

  const token = 
    ref('eyJ0eXAiOiJ0b2tlbiIsImFsZyI6IkhTNTEyIn0.eyJzdWIiOiI5IiwiaWF0IjoxNzIyMjc0ODM5LCJleHAiOjE3MjI4Nzk2Mzl9.Jw2sno033CsgO75s5S9vWtbtG4hg2sA4EXjw2faJQnmnVKEm68jZHSHSgui1BwxtcgqB0rcHw96RcirmBEj09A');

  const fetchData = () => {
    selectNoyes(20);
  };
  /*查询数据库*/
  async function selectNoyes(SelectNumber) {
    try {
      const response = await axios.get("/tag/api/admin/notes", {
        headers: {
          token: token.value,
        },
        params: {
          page: 1,
          pageSize: SelectNumber
        }
      });
      const { code, data, msg} = response.data;
      console.log("服务器响应消息:", code, msg, data.total);  // 打印返回的 msg
      if (code === 200) {
        data.value = data.rows.map((row) => ({
          key: row.id,
          id: row.id,
          title: row.title,
          nickname: row.nickname,
          content: row.content,
          createTime: row.createTime
        }));
        Sourcedata.value = data.value;
        if (data.total > SelectNumber) {
          selectNoyes(10 * SelectNumber)
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

  //添加公告
  async function addNotes(addTitle, addContent) {
    loading.value = true;
    try {
      const response = await axios.post("/tag/api/admin/notes", 
      {
        content: addContent,
        title: addTitle,
      }, 
      {
        headers: {
          token: token.value,
        },
      });
      const { code, data, msg} = response.data;
      console.log("服务器响应消息:", code, msg, data);  // 打印返回的 msg
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
      value1.value = '';
      value2.value = '';
    }
}
  //删除公告
  async function deleteNotes(id) {
    loading.value = true;
    try {
      const response = await axios.delete(`/tag/api/admin/notes/${id}`, {
        headers: {
          token: token.value,
        },
      });
      const { code, data, msg} = response.data;
      console.log("服务器响应消息:", code, msg, data);  // 打印返回的 msg
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