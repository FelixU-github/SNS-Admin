<template>
    <div class="news">
        <h2>
            <li v-for="news in newslist" :key="news.id">
                <RouterLink to="/news/detail?">{{ news.title}}</RouterLink>
            </li>
        </h2>
    
        <div class="news-content">
            <RouterView>

            </RouterView>
        </div>
    </div>
    <br>

    
    
</template>

<script setup lang="ts" name="News">
    import { reactive ,inject} from 'vue';

    const newslist = reactive([
        {
            id: 1,
            title: 'News-1-Test',
            content: 'News-1-Content'
        },
        {
            id: 2,
            title: 'News-2-Test',
            content: 'News-2-Content'
        },
        {
            id: 3,
            title: 'News-3-Test',
            content: 'News-3-Content'
        },
        {
            id: 4,
            title: 'News-4-Test',
            content: 'News-4-Content'
        }
    ]);

</script>

<style>
.news {
    background-color: rgb(197, 173, 173);
    padding: 20px;
    content: 100%;
    border-radius: 10px;
    box-shadow: 0 0 10px;
}
.news-content {
    display: flex;
    justify-content: flex-start; /* 水平靠左 */
    align-items: center;         /* 垂直居中 */
    padding: 10px;
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    box-shadow: 0 0 10px;
}


</style>

