// 引入 createapp 用于创建应用
import { createApp } from "vue";
// 引入 App 根组件
import App from "./App.vue";
// 引入路由器
import router from "./router";
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// 引入 Antd
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';



// 创建应用
const app = createApp(App);
// 引入 Antd
app.use(Antd);
// Use路由器
app.use(router);
// 挂载应用
app.mount("#app");




// app.use(ElementPlus)
// app.mount('#app')
