<template>
    <a-space direction="vertical">
      <a-input-search
        v-model:value="value"
        style="margin: 15px;"
        placeholder="input search text"
        enter-button
        @search="onSearch(1, 20, value)"
      />
    </a-space>
    <a-button @click="showDrawer" type="primary" shape="round" style=
      "margin-left: 30px; 
      background-color: aquamarine;
      color: black;
      font-weight: 700;
      font-family: 幼圆;">
      发布公告
    </a-button>
  </template>
  
  <script setup>
  import { defineProps, ref } from 'vue';

  const props = defineProps({
    showDrawer: Function,
    selectNoyes: Function,
  });
  //搜索信息
  const value = ref('');
  const showDrawer = () => {
    props.showDrawer();
  };
  const onSearch = (page, pageSize, title) => {
    props.selectNoyes(page, pageSize, title);
    value.value = '';
  };
  </script>