<template>
  <!-- 导航 -->
  <div class="navigate">
    <h3 class="tittle" >树洞后台管理系统</h3>
    <div class="separator"></div> <!-- 添加竖线的元素 -->
    <a-button type="text"><RouterLink to="/home" active-class="active"> 首页 </RouterLink>
    </a-button>
    <a-button type="text"><RouterLink to="/users" class="active"> 用户管理 </RouterLink>
    </a-button>
    <a-button type="text"><RouterLink to="/posts" class="active"> 博文管理 </RouterLink></a-button>
    <a-button type="text"><RouterLink to="/comments" class="active"> 评论管理 </RouterLink></a-button>
    <a-button type="text"><RouterLink to="/activity" class="active"> 活动管理 </RouterLink></a-button>
    <a-button type="text"><RouterLink to="/job" class="active"> 内推管理 </RouterLink></a-button>
    <a-button type="text"><RouterLink to="/notes"> 公告管理 </RouterLink></a-button>
    <div class="separator"></div> <!-- 添加竖线的元素 -->
    <avatar />
    <a-button type="text">退出</a-button>
  </div>
  <div class="spcae">
    <br>
  </div>


  <!--  展示区 -->
  <div class="main-contant">

    <RouterView class="router-view"></RouterView>

  </div>
</template>



<script lang="ts" setup name="App">
    import { RouterView,RouterLink } from 'vue-router';
    import Menu from './pages/Menu.vue'
    import avatar from './avatar/avatar.vue'
</script>


<style scoped>

.navigate {
  display: flex;
  justify-content: flex-start; /* 子元素从左到右排列 */
  justify-content: space-between; /* 将子元素分散对齐 */
  align-items: center; /* 垂直居中对齐 */
  padding: 50px; /* 为容器添加左右内边距（可选） */
  height: 70px; /* 设置容器高度以示例效果 */
  box-shadow: 0 0 10px;
  background-color: rgb(255, 255, 255);

}

.title {
  margin: 10; /* 移除标题的默认外边距 */
  flex-grow: 1; /* 使标题占据多余的空间 */
}

.menu {
  flex-grow: 10; /* 使菜单占据更多的空间 */
}

.avatar {
  margin-left: auto; /* 将头像推到容器的最右边 */
}
.router-view{
    
    justify-content:  space-between;
    border-radius: 10px;
    /* box-shadow: 0 0 10px; */
    width: 100%;
    height: 800px;
    background-color: rgb(255, 255, 255);
    
}
.header{
    
    background-color: rgb(191, 191, 191);
}
.separator {
  width: 1px;
  height: 40px; /* 可以根据需要调整高度 */
  background-color: #000; /* 竖线的颜色，可以根据需要调整 */
  margin-right: 20px; /* 给按钮留出空间 */
}


</style>

  