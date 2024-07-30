<template>
    <a-menu v-model:selectedKeys="current" mode="horizontal">
<!-- 公告管理 -->
        <a-menu-item key="notes" >
        <template #icon>
          <CalendarOutlined />
        </template>
        <RouterLink to="/notes" > 公告管理 </RouterLink>
      </a-menu-item>
      
<!-- 用户管理 -->
      <a-menu-item key="user" >
        <template #icon>
          <appstore-outlined />
        </template>
        <RouterLink to="/about" class="active"> 用户管理 </RouterLink>
      </a-menu-item>

<!-- 首页 -->
        <a-menu-item key="home">
        <template #icon>
          <HomeOutlined />
        </template>
        <RouterLink to="/home" active-class=""> Home </RouterLink>
      </a-menu-item>

<!-- 内推管理 -->
      <a-menu-item key="job" >
        <template #icon>
        <UserSwitchOutlined />
        </template>
        <RouterLink to="/job" class="active"> 内推管理 </RouterLink>
      </a-menu-item>
<!-- 活动管理 -->
      <a-menu-item key="activity" >
        <template #icon>
        <ProfileOutlined />
        </template>
        <RouterLink to="/activity" class="active"> 活动管理 </RouterLink>
      </a-menu-item>
      
<!-- 子菜单 -->
      <a-sub-menu>
        <template #icon>
          <setting-outlined />
        </template>
        <template #title>Navigation Three - Submenu</template>
        <a-menu-item-group title="Item 1">
          <a-menu-item key="setting:1">Option 1</a-menu-item>
          <a-menu-item key="setting:2">Option 2</a-menu-item>
        </a-menu-item-group>
        <a-menu-item-group title="Item 2">
          <a-menu-item key="setting:3">Option 3</a-menu-item>
          <a-menu-item key="setting:4">Option 4</a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>

<!-- 链接 -->
      <a-menu-item key="alipay">
        
        <a href="https://antdv.com" target="_blank" rel="noopener noreferrer">
          Navigation Four - Link
        </a>
      </a-menu-item>



    </a-menu>
  </template>
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { MailOutlined, AppstoreOutlined, SettingOutlined,HomeOutlined, CalendarOutlined,UserSwitchOutlined ,ProfileOutlined } from '@ant-design/icons-vue';
  export default defineComponent({
    setup() {
      const current = ref<string[]>(['app']);
      return {
        current,
      };
    },
    components: {
      MailOutlined,
      AppstoreOutlined,
      SettingOutlined,
      HomeOutlined,
      CalendarOutlined,
      UserSwitchOutlined ,
      ProfileOutlined
    },
  });
  </script>
  
  