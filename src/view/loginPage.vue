<template>
    <HeaderLogin></HeaderLogin>
    <div class="content">
        <div class="con-title">
            <ul>
                <div></div>
                <li :class="[active == index ? 'active' : '']" v-for="(item, index) in data"
                    @click="switchCom(item, index)">
                    {{ item.name }}
                </li>

                <div class="divfr"></div>
                <div class="divfr" style="right: -4px;"></div>
            </ul>
        </div>
        <component :is="comId" @getNamePwd="getNamePwd"></component>
        <a class="btnLogin" @click="loginName">立即登录</a>
        <div class="btnRg" @click="gotoRegister('register')">注册账号</div>
    </div>
</template>

<script setup lang="ts">
import { shallowRef, reactive, markRaw, ref, getCurrentInstance, ComponentInternalInstance } from 'vue';
import router from '../router';
import HeaderLogin from '../components/headerLogin.vue';
import LoginEmail from '../components/loginEmail.vue';
import loginPhone from '../components/loginPhone.vue'
const { proxy } = getCurrentInstance() as ComponentInternalInstance
const comId = shallowRef(LoginEmail)

const active = ref(0);
const namePwd = reactive({
    nickName: '',
    pwd: ''
})
const phoneCaptcha = reactive({
    phone: '',
    captcha: ''
})
const data = reactive([
    {
        name: "账号密码登录",
        com: markRaw(LoginEmail)
    },
    {
        name: "手机登录",
        com: markRaw(loginPhone)
    }
])
let flag: boolean = true

function getNamePwd(val: any) {
    console.log('------', JSON.parse(JSON.stringify(val)));
    if (val.nickName) {
        namePwd.nickName = val.nickName
        namePwd.pwd = val.pwd
        console.log(namePwd);
    }
    if (val.phone) {
        flag = false
        phoneCaptcha.phone = val.phone
        phoneCaptcha.captcha = val.captcha
    }

}



const sendMsg = async (phone: string) => {
    const msg = await proxy?.$http({
        url: `/edumsm/msm/send/${phone}`
    })
}

const loginName = async () => {
    let res: any;
    if (flag) {
        res = await proxy?.$http({
            url: "/manage/member/login",
            data: {
                username: namePwd.nickName,
                password: namePwd.pwd
            },
            method: 'POST'
        })
    } else res= sendMsg(phoneCaptcha.phone)
    console.log('res', res);
    if (res?.data.code == 200) {
        gotoScreenPage('screenPage')
    }

}

const switchCom = (item: any, index: number) => {
    comId.value = item.com
    active.value = index
}

const gotoRegister = (url: string) => {
    router.push({
        name: url
    })
}
const gotoScreenPage = (url: string) => {
    router.push({
        name: url
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
}

.active {
    border-bottom: 3px solid rgba(0, 218, 216, 1);
}
</style>