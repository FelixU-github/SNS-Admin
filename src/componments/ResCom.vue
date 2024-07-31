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
  </template>
  
  <script setup>
  import { defineProps, ref } from 'vue';

  const props = defineProps({
    selectRes: Function,
  });
  //搜索信息
  const value = ref('');
  const onSearch = (page, pageSize, title) => {
    props.selectRes(page, pageSize, title);
    value.value = '';
  };
  </script>