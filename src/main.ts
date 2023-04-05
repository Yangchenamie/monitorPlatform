import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import axios, { AxiosInstance } from 'axios'
import vue3SeamlessScroll from 'vue3-seamless-scroll';
axios.defaults.baseURL = "http://1.12.244.193:80"
const app = createApp(App)
// 全局自定义属性
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $http: AxiosInstance;
    }
  }
app.config.globalProperties.$http = axios

// createApp(App).use(router).mount('#app')
app.use(router).use(vue3SeamlessScroll).mount('#app')
