<template>
    <div class="container">
        <div class="header">
            <div></div>
            <span>销售汇总</span>
            <div class="divfr"></div>
            <div class="divfr" style="right: -4px;"></div>
        </div>
        <div class="content">
            <div id="sale"></div>
            <div class="statistics">
                <div>
                    <p>{{ saleMap.orderPrice }}</p>
                    <span>销售额</span>
                    <img src="../../public/static/img/pic4.png" alt="">
                </div>
                <div>
                    <p>{{ saleMap.orderNumber }}</p>
                    <span>销售量</span>
                    <img src="../../public/static/img/pic6.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted,getCurrentInstance,ComponentInternalInstance,reactive } 
from 'vue';
const {proxy} = getCurrentInstance() as ComponentInternalInstance
const saleMap = reactive({
    orderNumber:"",
    orderPrice:""
})
async function getSaleMap() {
    const saleDate = await proxy?.$http({
        url:"/shop/order/getM"
    })
    console.log('saleDate',saleDate);
    saleMap.orderNumber = saleDate?.data.data.map.orderNumber;
    saleMap.orderPrice = saleDate?.data.data.map.orderPrice;
 }
async function getSaleList() {
    const saleData = await proxy?.$http({
        url:"/shop/order/orderP"
    })
    console.log('saleData',saleData);
    const saleList = saleData?.data.data.map
    return saleList;
}
onMounted(async() => {
    getSaleMap()
    const saleList  = await getSaleList()
    const chart = echarts.init(document.querySelector('#sale') as HTMLElement)
// x轴
let xData = saleList.tx
// y轴
let yData1 = saleList.pty
let yData2 = saleList.oty
    chart.setOption({
        // backgroundColor: '#021B6C',
        title: {
            show: false,
            text: '多线图',
            textStyle: {
                align: 'center',
                color: '#fff',
                fontSize: 20,
            },
            top: '5%',
            left: 'center',
        },
        legend: {
            // color:"rgba(0, 224, 219, 1)",
            top: '80%',
            icon: 'circle',
            right:'20%',
            // z: 2,
            orient: "vertical",
            // data: legendArr
            textStyle: {
                color: "#FFF"
            }
        },
        tooltip: {
            trigger: 'axis',
            // formatter: '{b}：{c}个',
            backgroundColor: 'rgba(187, 232, 226, 0.2)', //设置背景颜色
            textStyle: {
                color: '#fff'
            },
            borderColor: "rgba(255,255,255, .5)",
        },
        grid: {
            top: '5%',
            left: '4%',
            right: '5%',
            bottom: '37%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#26367A'
                }
            },
            splitArea: {
                // show: true,
                color: '#f00',
                lineStyle: {
                    color: '#f00'
                },
            },
            axisLabel: {
                textStyle: {
                    color: 'rgba(198, 207, 255, 1)',
                    fontSize: 12
                },
                // color: '#fff',
                // rotate: 0,
                // margin: 10,
                interval: 0,
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            },
            data: xData,
            // boundaryGap: ['10%', '10%']

        }],

        yAxis: [{
            type: 'value',
            // name: '项目数(个)',
            nameTextStyle: {
                color: '#fff',
                fontSize: '11px',
            },
            min: 0,
            max: 8,
            splitNumber: 8,
            splitLine: {
                show: true,
                interval: '0',
                lineStyle: {
                    color: ['rgba(96, 96, 96, 1)'],
                    type: 'dashed',
                    width: 1
                }
            },
            axisLine: {
                show: false,
            },
            axisLabel: {
                show: true,
                // margin: 10,
                textStyle: {
                    fontSize: 12,
                    color: 'rgba(198, 207, 255, 1)'
                }
            },
            axisTick: {
                show: false,
            },
        }],
        series: [
            {
                // color:"rgba(0, 218, 216, 1)",
                name: "销售额/元",
                type: 'line',
                // smooth: true, //是否平滑
                showAllSymbol: true,
                // symbol: 'image://./static/images/guang-circle.png',
                symbol: 'circle',
                symbolSize: 6,
                lineStyle: {
                    normal: {
                        color: "rgba(1, 251, 246, 1)",
                        shadowColor: 'rgba(1, 251, 246, 1)',
                        shadowBlur: 10,
                        // shadowOffsetY:5,
                        // shadowOffsetX: 5,
                    },
                },
                label: {
                    show: false,
                    position: 'top',
                    textStyle: {
                        color: 'rgba(1, 251, 246, 1)',
                        fontSize: 16
                    }
                },
                itemStyle: {
                    color: "rgba(1, 251, 246, 1)",
                    borderColor: "#fff",
                    borderWidth: 2,
                    shadowColor: 'rgba(1, 251, 246, 1)',
                    shadowBlur: 10,
                    // shadowOffsetY: 1,
                    // shadowOffsetX: 1,
                },
                tooltip: {
                    show: true
                },
                data: yData1
            },
            {
                // color:"rgba(0, 218, 216, 1)",
                name: "销售量",
                type: 'line',
                // smooth: true, //是否平滑
                showAllSymbol: true,
                // symbol: 'image://./static/images/guang-circle.png',
                symbol: 'circle',
                symbolSize: 6,
                lineStyle: {
                    normal: {
                        color: "rgba(211, 22, 50, 1)",
                        shadowColor: 'rgba(211, 22, 50, 1)',
                        shadowBlur: 10,
                        shadowOffsetY: 5,
                        shadowOffsetX: 5,
                    },
                },
                label: {
                    show: false,
                    position: 'top',
                    textStyle: {
                        color: 'rgba(211, 22, 50, 1)',
                        fontSize: 16
                    }
                },
                itemStyle: {
                    color: "rgba(211, 22, 50, 1)",
                    borderColor: "#fff",
                    borderWidth: 2,
                    shadowColor: 'rgba(211, 22, 50, 1)',
                    shadowBlur: 10,
                    // shadowOffsetY: 1,
                    // shadowOffsetX: 1,
                },
                tooltip: {
                    show: true
                },
                data: yData2
            }
        ]
    })
    window.addEventListener('resize', function () {//执行
        chart.resize();
    })


})
</script>

<style scoped lang="less">
.container {
    width: 100%;
    min-width: 420px;

    .header {
        // width: 650px;
        width: 95%;
        position: relative;
        text-align: left;
        border-bottom: 1px solid rgba(0, 218, 216, 1);
        // margin-left: 20px;
        box-sizing: border-box;
        margin-bottom: 20px;

        >span {
            display: inline-block;
            border-bottom: 1px solid rgba(0, 218, 216, 1);
            line-height: 31px;
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
        position: relative;

        #sale {
            width: 100%;
            height: 260px;
        }

        .statistics {
            position: absolute;
            bottom: -20px;
            display: flex;
            margin-top: 20px;
            padding-left: 30px;
            width: 50%;

            >div {
                // margin-right: 25px;
                flex:1;
                p {
                    font-size: 14px;
                    margin: 0;
                }

                span {
                    font-size: 10px;
                    display: block;
                }

                img {
                    margin-top: 3px;
                }
            }
        }
    }

}
</style>