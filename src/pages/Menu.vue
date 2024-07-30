<template>
    <a-menu v-model:selectedKeys="current" mode="horizontal">

         <!-- 首页 -->
         <a-menu-item key="home">
            <template #icon>
                <LoginOutlined />
            </template>
            <RouterLink to="/home" active-class="active"> 退出 </RouterLink>
        </a-menu-item>

<!-- 
        <a-menu-item key="users">
            <template #icon>
                <appstore-outlined />
            </template>
            <RouterLink to="/users" class="active"> 用户管理 </RouterLink>
        </a-menu-item>


        <a-menu-item key="posts">
            <template #icon>
                <ProfileOutlined />
            </template>
            <RouterLink to="/posts" class="active"> 博文管理 </RouterLink>
        </a-menu-item>



        <a-menu-item key="comments">
            <template #icon>
                <ProfileOutlined />
            </template>
            <RouterLink to="/comments" class="active"> 评论管理 </RouterLink>
        </a-menu-item>


        <a-menu-item key="activity">
            <template #icon>
                <ProfileOutlined />
            </template>
            <RouterLink to="/activity" class="active"> 活动管理 </RouterLink>
        </a-menu-item>


        <a-menu-item key="notes">
            <template #icon>
                <CalendarOutlined />
            </template>
            <RouterLink to="/notes"> 公告管理 </RouterLink>
        </a-menu-item>


        <a-menu-item key="job">
            <template #icon>
                <UserSwitchOutlined />
            </template>
            <RouterLink to="/job" class="active"> 内推管理 </RouterLink>
        </a-menu-item> -->

    </a-menu>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { MailOutlined, AppstoreOutlined, SettingOutlined, HomeOutlined, CalendarOutlined, UserSwitchOutlined, LoginOutlined,ProfileOutlined } from '@ant-design/icons-vue';
export default defineComponent({
    // setup() {
    //     const current = ref<string[]>(['app']);
    //     return {
    //         current,
    //     };
    // },
    components: {
        MailOutlined,
        AppstoreOutlined,
        SettingOutlined,
        HomeOutlined,
        CalendarOutlined,
        UserSwitchOutlined,
        ProfileOutlined,
        LoginOutlined
    },
});
</script>