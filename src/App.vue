<template>
  <!-- 导航 -->
  <div class="navigate">
    <a-button type="text" class="title-button-t">
      <RouterLink to="/home" class="title-link-t" active-class="active-t"> 树洞后台管理系统 </RouterLink>
    </a-button>

    <div class="separator"></div> <!-- 添加竖线的元素 -->
    
    <a-button type="text" class="title-button">
      <RouterLink to="/users" class="title-link" active-class="active"> 用户管理 </RouterLink>
    </a-button>

    <a-button type="text" class="title-button">
      <RouterLink to="/posts" class="title-link" active-class="active"> 博文管理 </RouterLink>
    </a-button>
    <a-button type="text" class="title-button">
      <RouterLink to="/comments" class="title-link" active-class="active"> 评论管理 </RouterLink>
    </a-button>
    <a-button type="text" class="title-button">
      <RouterLink to="/activity" class="title-link" active-class="active"> 活动管理 </RouterLink>
    </a-button>
    <a-button type="text" class="title-button">
      <RouterLink to="/job" class="title-link" active-class="active"> 内推管理 </RouterLink>
    </a-button>
    <a-button type="text" class="title-button">
      <RouterLink to="/notes" class="title-link" active-class="active"> 公告管理 </RouterLink>
    </a-button>
    <a-button type="text" class="title-button">
      <RouterLink to="/resource" class="title-link" active-class="active"> 资源管理 </RouterLink>
    </a-button>
    <div class="separator"></div> <!-- 添加竖线的元素 -->
    <div class="box">
      <avatar />
      <p></p>
    </div>
    <a-button type="text" active-class="active">退出</a-button>
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
  background-color: rgb(250, 251, 252);

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
.box {
  display: flex;
  flex-wrap: wrap;
}
.title-button .title-link {
  color: #333 !important; /* 设置字体颜色 */
}

.title-button .title-link.active {
  color: #adbdfc !important; /* 设置激活状态下的颜色并强制应用 */
}

.title-button-t .title-link-t {
  font-weight: bold !important; /* 设置字体加粗 */
  color: #333 !important; /* 设置字体颜色 */
}

.title-button-t .title-link-t.active-t {
  color: #adbdfc !important; /* 设置激活状态下的颜色并强制应用 */
}


</style>

  