<template>
    <div class="header">
        <div class="headerTitle">
            <img src="../../public/static/img/title.png" alt="">
            <span class="title">烧烤大数据监控平台</span>
        </div>
        
    </div>
    <Map></Map>
    <Situation></Situation>
</template>

<script setup lang="ts">

import Map from '../components/map.vue';
import Situation from '../components/situation.vue';


</script>

<style scoped lang="less">
body{
    width: 100%;
}
.header {
   

    .headerTitle {
        position: relative;

        .title {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translateX(-50%);
            font-size: 32px;
            width: 100%;

        }
    }

    .picAll {
        display: flex;
        flex-flow: column;
        width: 16px;
        margin: 20px auto;

        >img {
            margin: auto;
        }

        .smallDiv {
            width: 4px;
            height: 1px;
            background-color: rgba(0, 218, 216, 1);
            margin: 3px auto 16px;
        }

        // .lozenge{
        //     width: 2px;
        //     height: 2px;
        //     transform: rotate(-135deg);
        //     background-color:grey;
        // }
    }

}
</style>