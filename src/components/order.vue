<template>
    <div class="container">
        <div class="header">
            <div></div>
            <span>订单情况</span>
            <div class="divfr"></div>
            <div class="divfr" style="right: -4px;"></div>
        </div>
        <div class="content">
            <table>
                <tr>
                    <th>时间</th>
                    <th>机器编号</th>
                    <th>订单额/元</th>
                </tr>
                <vue3-seamless-scroll hover-stop="true" :list="orderArr" hover="true" step="1" class="sroll">
                    <tr v-for="(item, index) in orderArr" :key="index" class="rowup">
                        <td>{{ item.gmtCreate }}1</td>
                        <td>{{ item.orderNumber }}1</td>
                        <td>{{ item.totalPrice }}</td>
                    </tr>
                </vue3-seamless-scroll>
            </table>
        </div>
    </div>
</template>


<script setup lang="ts">
import { onMounted, getCurrentInstance, ComponentInternalInstance, ref, reactive, computed } from 'vue';
const { proxy } = getCurrentInstance() as ComponentInternalInstance

const orderArr = reactive([]) as any[];



async function getOrderList() {
    await proxy?.$http({
        url: "/shop/order/getAllM"
    }).then(res => {
        console.log('res', res);

        res.data.data.list.forEach((element: any) => {
            orderArr.push(element)
        })
    })
}


onMounted(async () => {
    getOrderList()
})




</script>

<style scoped lang="less">
.sroll{
    height: 250px;
    overflow: hidden;
}
.scroll {
    height: 270px;
    width: 500px;
    margin: 100px auto;
    overflow: hidden;
}

.scroll .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 3px 0;
}

.container {
    width: 100%;
    min-width: 320px;

    .header {
        // width: 650px;
        width: 95%;
        position: relative;
        text-align: left;
        border-bottom: 1px solid rgba(0, 218, 216, 1);

        >span {
            display: inline-block;
            border-bottom: 1px solid rgba(0, 218, 216, 1);
            line-height: 35px;
            padding: 0 5px;
        }

        >div {
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

    .content {
        width: 100%;
        overflow: hidden;

        & table {
            table-layout: fixed;
            width: 95%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            border-collapse: collapse;
            // width: 90%;
            box-sizing: border-box;
            // display: flex;
            // justify-content: space-between;

            th {

                color: rgba(0, 218, 216, 1);
                text-align: center;
                font-weight: 400;
                line-height: 60px;
                // margin: 0 30px;
                // padding-right: 20px;
                // flex:1;
                padding-left: 10px;
            }

            td {

                font-size: 10px;
                text-align: center;
                height: 38px;
                // padding-right: 18px;
                line-height: 38px;
                padding-left: 10px;
                border: none;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }

            td:nth-child(1),
            th:nth-child(1) {
                // padding-left: 10px;
                flex: 0.5;

            }

            td:nth-child(2),
            th:nth-child(2) {
                flex: 0.5;

            }

            td:last-child,
            th:last-child {
                flex: 0.3;

            }

            tr {
                display: flex;
                // width: 100%;
            }

            tr:nth-child(even) {
                background-color: rgba(0, 72, 91, 1);
            }

        }
    }


}

// @keyframes rowup {
//     0% {
//         -webkit-transform: translate3d(0, 0, 0);
//         transform: translate3d(0, 0, 0);
//     }
//     100% {
//         -webkit-transform: translate3d(0, -307px, 0);
//         transform: translate3d(0, -307px, 0);
//         display: none;
//     }
// }
// .rowup{
//     -webkit-animation: 10s rowup linear infinite normal;
//     animation: 10s rowup linear infinite normal;
//     position: relative;
// }
</style>