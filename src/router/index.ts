import {createRouter,createWebHashHistory,useRouter } from 'vue-router'
const loginPage = ()=>import('../view/loginPage.vue')
const register = ()=>import('../view/register.vue')
const ScreenPage = ()=>import('../view/ScreenPage.vue')
//  const router = createRouter({
//     history:createWebHashHistory(), //hash模式：createWebHashHistory，history模式：createWebHistory
const routes =  [
        {
            path:'/',
            name:"loginPage",
            component:loginPage,
        },
        {
            path:'/register',
            name:"register",
            component:register,
        },
        {
            path:'/screenPage',
            name:"screenPage",
            component:ScreenPage,
        }
    ]
 const router = createRouter({
    history:createWebHashHistory(),
    routes
 })

export default router