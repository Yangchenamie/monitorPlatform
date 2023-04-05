<template>
    <div class="conInput">
        <input type="text" placeholder="Email" v-model="namePwd.nickName">
        <input type="password" placeholder="密码" v-model="namePwd.pwd">
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


const namePwd = reactive({
    nickName:'',
    pwd:''
})

const emits = defineEmits(['getNamePwd'])

watch(namePwd,()=>{
    console.log(namePwd);
    emits("getNamePwd",namePwd)
})
</script>

<style scoped lang="less">
.conInput {
    >input {
        width: 425px;
        height: 40px;
        border: 1px solid rgba(220, 223, 230, 1);
        padding: 0;
        padding-left: 74px;
        padding-right: 100px;
        box-sizing: border-box;
        border-radius: 4px;
        margin: 25px 0;
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