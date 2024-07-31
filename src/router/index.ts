// 创建一个路由器，并暴露出去

import {createRouter,createWebHistory} from 'vue-router'
import Home from '@/pages/Home.vue'
import Users from '@/pages/Users.vue'
import News from '@/pages/News.vue'
import Detail from '@/pages/Detail.vue'
import Notes from '@/pages/Notes.vue'
import Job from '@/pages/Job.vue'
import Posts from '@/pages/Posts.vue'
import Comments from '@/pages/Comments.vue'
import Acitivity from '@/pages/Acitivity.vue'
import Resource from '@/pages/Resource.vue'
import Surprise from '@/pages/Surprise.vue'


const router = createRouter({
    history:createWebHistory(),
    routes :[
        {
            path:'/Home',
            component:Home
        },
        {
            path:'/notes',
            component:Notes
        },
        {
            path:'/Job',
            component:Job
        },
        {
            path:'/Posts',
            component:Posts
        },

        {
            path:'/Comments',
            component:Comments
        },

        {
            path:'/Activity',
            component:Acitivity
        },

        {
            path:'/users',
            component: Users
        },
        {
            path:'/resource',
            component: Resource
        },
        {
            path:'/surprise',
            component: Surprise
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
       
    ]
    
})

// 暴露 router 
export default router