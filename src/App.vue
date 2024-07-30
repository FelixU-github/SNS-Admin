<template>

  <div class="app">
    <h1 class="tittle">哈工大树洞后台管理系统</h1>
  </div>
  
  

  <!-- 导航 -->
  <div class="navigate">
    <Menu />
    <!-- <RouterLink to="/home" active-class=""> Home </RouterLink>
    <RouterLink to="/news" class="active"> News </RouterLink>
    <RouterLink to="/about" class="active"> About </RouterLink>
    <RouterLink to="/notes" class="active"> Notes </RouterLink> -->
  </div>
  <hr>
  <!--  展示区 -->
  <div class="main-contant">
     
      <RouterView class="router-view"></RouterView>
    
  </div>
</template>



<script lang="ts" setup name="App">
    import { RouterView,RouterLink } from 'vue-router';
    import Menu from './pages/Menu.vue'
</script>


<style>
.app{
    background-color: rgb(234, 234, 234);
    /* box-shadow: 0 0 10px; */
    /* border-radius: 10px; */
    padding: 20px;
    
}

.navigate{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 10px;
    /* border-radius: 10px; */
    /* box-shadow: 0 0 10px; */
   
}



.router-view{
    display: flex;
    justify-content:  space-between;
    border-radius: 10px;
    box-shadow: 0 0 10px;
    width: 100%;
    height: 400px;
    
}

</style>

  