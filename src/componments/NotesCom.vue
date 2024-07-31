<template>
    <a-space direction="vertical">
      <a-input-search
        v-model:value="value"
        style="margin: 15px;"
        placeholder="input search text"
        enter-button
        @search="onSearch"
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
  import { defineProps } from 'vue';

  const props = defineProps({
    addNotes: Function,
    showDrawer: Function,
  });
  const showDrawer = () => {
    props.showDrawer();
  };
  const onSearch = searchValue => {
  };
  const addNotes = (title, content) => {
    props.addNotes(title, content);
  };
  </script>