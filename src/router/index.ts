// 创建一个路由器，并暴露出去

import {createRouter,createWebHistory} from 'vue-router'
import Home from '@/pages/Home.vue'
import About from '@/pages/About.vue'
import News from '@/pages/News.vue'
import Detail from '@/pages/Detail.vue'
import Notes from '@/pages/Notes.vue'


const router = createRouter({
    history:createWebHistory(),
    routes :[
        {
            path:'/home',
            component:Home
        },
        {
            path:'/notes',
            component:Notes
        },
        {
            name:'xinwen',
            path:'/news',
            component:News,
            children:[
                {
                    path:'detail',
                    component:Detail
                }
            ]
        },
        {
            path:'/about',
            component:About
        },
    ]
    
})

// 暴露 router 
export default router