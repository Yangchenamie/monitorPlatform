<template>
    <div class="conInput">
        <input type="text" placeholder="手机号" v-model="phoneCaptcha.phone">
        <input type="text" placeholder="验证码" v-model="phoneCaptcha.captcha">
        <button class="getBtn">获取</button>
        <div class="conFoot">
            <div>
                <input type="checkbox" name="" id="">
                <span>自动登录</span>
            </div>
            <a href="">忘记密码</a>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive,watch,defineEmits } from 'vue';


const phoneCaptcha = reactive({
    phone:'',
    captcha:''
})

const emits = defineEmits(['getNamePwd'])

watch(phoneCaptcha,()=>{
    console.log(phoneCaptcha);
    emits("getNamePwd",phoneCaptcha)
})
</script>

<style scoped lang="less">
.conInput {
    position: relative;
    >input {
        width: 425px;
        height: 40px;
        border: 1px solid rgba(220, 223, 230, 1);
        padding: 0;
        padding-left: 74px;
        padding-right: 140px;
        box-sizing: border-box;
        border-radius: 4px;
        margin: 25px 0;
    }
    .getBtn{
        position:absolute;
        background-color: transparent;
        right: 0;
        top: 124px;
       
       border: none;
       border-left: 2px solid #fff;
       padding: 0 40px;
    }

    .conFoot {
        margin-top: 42px;
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
}

</style>