<template>
    <a-float-button @click="handleClick" type="primary" :style="{
        right: '24px',
    }">
    </a-float-button>
</template>
<script setup>
const handleClick = () => console.log('click');
</script>