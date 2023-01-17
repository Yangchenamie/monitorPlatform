import {createRouter,createWebHashHistory} from 'vue-router'

// import loginPage from '../components/loginPage.vue'
// import register from '../components/register.vue'
const loginPage = ()=>import('../components/loginPage.vue')
const register = ()=>import('../components/register.vue')

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
        }
    ]
 const router = createRouter({
    history:createWebHashHistory(),
    routes
 })

export default router