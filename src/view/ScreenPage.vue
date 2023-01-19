<template>
  <div class="header">
    <div class="headerTitle">
      <img src="../../public/static/img/title.png" alt="">
      <span class="title">烧烤大数据监控平台</span>
    </div>

  </div>
  <div class="screen-body">
    <section class="screen-left">
      <div class="left-top">
        <Online></Online>
      </div>
      <div class="left-buttom">
        <Sale></Sale>
      </div>
    </section>
    <section class="sreen-center">
      <div class="center-top">
        <Map></Map>
      </div>
      <div class="center-buttom">
        <Situation></Situation>
      </div>
    </section>
    <section class="screen-right">
      <div class="right-top">
        <Machine></Machine>
      </div>
      <div class="right-buttom">
        <Order></Order>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">

import Machine from '../components/machine.vue';
import Map from '../components/map.vue';
import Online from '../components/online.vue';
import Order from '../components/order.vue';
import Sale from '../components/sale.vue';
import Situation from '../components/situation.vue';


</script>

<style scoped lang="less">
body {
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
  }

}

.screen-body {
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 10px;

  .screen-left {
    height: 100%;
    width: 26%;
    margin-left: 1%;

    .left-top {
      // position: relative;
      height: 53%;
      margin-bottom: 40px;
    }

    .left-bottom {
      // position: relative;
      height: 31%;

    }
  }

  .screen-middle {
    height: 100%;
    width: 45%;
    margin-left: 1.6%;
    margin-right: 1.6%;

    .center-top {
      // position: relative;
      width: 100%;
      height: 56%;
      background-color: yellow;
    }

    .center-bottom {
      // position: relative;
      margin-top: 25px;
      width: 100%;
      height: 28%;
      background-color: red;
    }
  }

  .screen-right {
    height: 100%;
    width: 27%;

    // margin-left: 0.5%;
    .right-top {
      // position: relative;
      height: 46%;
    }

    .right-bottom {
      // position: relative;
      height: 38%;
      margin-top: 25px;
      background-color: green;
    }
  }
}
</style>