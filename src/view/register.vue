<template>
    <HeaderLogin></HeaderLogin>
    <div class="content">
        <div class="con-title">
            <div></div>
            <span> 注册</span>

            <div class="divfr"></div>
            <div class="divfr" style="right: -4px;"></div>
        </div>
        <div class="conInput">
            <input type="text" placeholder="手机号" v-model="msg.phone">
            <input type="text" placeholder="昵称" v-model="msg.nickName">
            <input type="password" placeholder="密码" v-model="msg.password">
            <input type="text" placeholder="验证码" v-model="msg.captcha">
            <button class="getBtn" @click="sendMsg(msg.phone)">获取</button>
            <div class="conFoot">
                <div>
                    <input type="checkbox" name="" id="">
                    <span>自动登录</span>
                </div>
            </div>
            <a class="btnLogin" @click="gotoReg">立即注册</a>
            <p>注册即表示您已阅读并同意《隐私政策》和《用户协议》</p>
            <!-- <p>已有账号？ <router-link class="gotoLogin" to="/loginPage" >立即登录</router-link></p> -->
            <p>已有账号？ <span class="gotoLogin" @click="gotoLogin('loginPage')">立即登录</span></p>
            <!-- <router-view></router-view> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, getCurrentInstance, ComponentInternalInstance } from 'vue';
import HeaderLogin from '../components/headerLogin.vue';
import router from '../router';
const { proxy } = getCurrentInstance() as ComponentInternalInstance

interface data {
    phone: string,
    nickName: string,
    password: string,
    captcha: string
}

const msg: data = reactive({
    phone: '',
    nickName: '',
    password: '',
    captcha: ''
})
const gotoLogin = (url: string) => {
    router.push({
        name: url
    })
}
const gotoReg = async () => {
    const res = await proxy?.$http({
        url: "/manage/member/add",
        data: {
            username:msg.nickName,
            password:msg.password,
            mobile:msg.phone,
            code:msg.captcha
        },
        method:'POST'
    })
    console.log(res?.data.code);
    if(res?.data.code==200){
        gotoLogin('loginPage')
    }
}

const sendMsg = async (phone: string) => {
    const msg = await proxy?.$http({
        url: `/edumsm/msm/send/${phone}`
    })
}

</script>

<style scoped lang="less">
.content {
    width: 424px;
    margin: auto;

    .con-title {
        position: relative;

        margin-bottom: 32px;
        border-bottom: 1px solid rgba(0, 218, 216, 1);
        text-align: left;

        >span {
            margin-left: 33px;
            font-size: 20px;
        }

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

    }

    .conInput {
        position: relative;

        >input {
            width: 425px;
            height: 40px;
            border: 1px solid rgba(220, 223, 230, 1);
            padding: 0;
            padding-left: 74px;
            padding-right: 100px;
            box-sizing: border-box;
            border-radius: 4px;
            margin: 18px 0;
        }

        .getBtn {
            position: absolute;
            background-color: transparent;
            right: 0;
            top: 256px;
            border: none;
            border-left: 2px solid #fff;
            padding: 0 40px;
        }


        .conFoot {
            margin-top: 22px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            >a {
                color: #fff;
                font-size: 14px;
            }

            >div>input {
                width: 16px;
                height: 16px;
                margin-right: 8px;
            }
        }

        .btnLogin {
            display: block;
            width: 240px;
            height: 40px;
            margin: 30px auto;
            line-height: 40px;
            color: #fff;
            border: 1px solid rgba(255, 255, 255, 1);
        }
    }

    .btnLogin {
        display: block;
        width: 240px;
        height: 40px;
        margin: 30px auto;
        line-height: 40px;
        color: #fff;
        border: 1px solid rgba(255, 255, 255, 1);
    }

    .btnRg {
        float: right;
        font-size: 14px;
    }

    p {
        font-size: 14px;

        .gotoLogin {
            color: rgba(240, 78, 63, 1);
        }
    }
}

.active {
    border-bottom: 3px solid rgba(0, 218, 216, 1);
}
</style>