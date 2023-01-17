<template>
    <HeaderLogin></HeaderLogin>
    <div class="content">
        <div class="con-title">
            <ul>
                <div></div>
                <li :class="[active == index ? 'active': '']" v-for="(item,index) in data" @click="switchCom(item,index)">
                    {{ item.name }}
                </li>
                
                <div class="divfr"></div>
                <div class="divfr" style="right: -4px;"></div>
            </ul>
        </div>
        <!-- <div class="conInput">
            <input type="text" placeholder="Email">
            <input type="text" placeholder="密码">
            <div class="conFoot">
                <div>
                    <input type="checkbox" name="" id="">
                    <span>自动登录</span>
                </div>
                <a href="">忘记密码</a>
            </div>
        </div> -->
        <!-- <LoginEmail></LoginEmail> -->
        <!-- <loginPhone></loginPhone> -->
        <component :is="comId"></component>
        <a class="btnLogin">立即登录</a>
        <div class="btnRg" @click="gotoRegister('register')">注册账号</div>
    </div>
</template>

<script setup lang="ts">
import echarts from 'echarts'
import { shallowRef,reactive,markRaw,ref} from 'vue';
import router from '../router';
import HeaderLogin from '../components/headerLogin.vue';
import LoginEmail from '../components/loginEmail.vue';
import loginPhone from '../components/loginPhone.vue'
// import { useRouter } from 'vue-router';
// const router = useRouter()
const comId = shallowRef(LoginEmail)

const active = ref(0);

const data = reactive([
    {
        name:"账号密码登录",
        com:markRaw(LoginEmail)
    },
    {
        name:"手机登录",
        com:markRaw(loginPhone)
    }
])

const switchCom = (item,index) => {
    comId.value = item.com
    active.value = index
}

const gotoRegister = (url:string) =>{
    router.push({
        name:url
    })
}


</script>

<style scoped lang="less">

.content {
    width: 424px;
    margin: auto;

    .con-title {
        margin-bottom: 32px;

        >ul {
            display: flex;
            border-bottom: 1px solid rgba(0, 218, 216, 1);
            padding: 0;
            position: relative;

            div {
                content: '';
                width: 2px;
                height: 7px;
                background-color: rgba(0, 218, 216, 1);
                position: absolute;
                bottom: -3px;

            }

            .divfr {
                right: 0;
            }

            >li {
                flex: 1;
                color: #fff;
                font-size: 20px;
            }
        }

    }

    // .conInput {
    //     >input {
    //         width: 425px;
    //         height: 40px;
    //         border: 1px solid rgba(220, 223, 230, 1);
    //         padding: 0;
    //         padding-left: 74px;
    //         box-sizing: border-box;
    //         border-radius: 4px;
    //         margin: 25px 0;
    //     }

    //     .conFoot {
    //         margin-top: 42px;
    //         display: flex;
    //         justify-content: space-between;
    //         align-items: center;

    //         >a {
    //             color: #fff;
    //             font-size: 14px;
    //         }

    //         >div>input {
    //             width: 16px;
    //             height: 16px;
    //             margin-right: 8px;
    //         }
    //     }
    // }

    .btnLogin {
        display: block;
        width: 240px;
        height: 40px;
        margin: 30px auto;
        line-height: 40px;
        color: #fff;
        border: 1px solid rgba(255, 255, 255, 1);
    }
    .btnRg{
        float: right;
        font-size: 14px;
    }
}

.active {
    border-bottom: 3px solid rgba(0, 218, 216, 1);
}
</style>