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
                    <p>4.88%</p>
                    <span>销售额</span>
                    <img src="../../public/static/img/pic4.png" alt="">
                </div>
                <div>
                    <p>2.32%</p>
                    <span>订单数</span>
                    <img src="../../public/static/img/pic5.png" alt="">
                </div>
                <div>
                    <p>1.20%</p>
                    <span>投诉量</span>
                    <img src="../../public/static/img/pic6.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted } from 'vue';

let dataArr = [
    {
        name: '销售额/万元',
        list: [
            {
                name: '3月',
                value: 5
            },
            {
                name: '4月',
                value: 4
            },
            {
                name: '5月',
                value: 3
            },
            {
                name: '6月',
                value: 5
            },
            {
                name: '7月',
                value: 4
            },
            {
                name: '8月',
                value: 3
            }
        ]
    },
    {
        name: '订单数/万单',
        list: [
            {
                name: '3月',
                value: 4
            },
            {
                name: '4月',
                value: 6
            },
            {
                name: '5月',
                value: 2
            },
            {
                name: '6月',
                value: 5.5
            },
            {
                name: '7月',
                value: 5
            },
            {
                name: '8月',
                value: 3
            }
        ]
    },
    {
        name: '投诉量/次',
        list: [
            {
                name: '3月',
                value: 0
            },
            {
                name: '4月',
                value: 0
            },
            {
                name: '5月',
                value: 1
            },
            {
                name: '6月',
                value: 0
            },
            {
                name: '7月',
                value: 1
            },
            {
                name: '8月',
                value: 1
            }
        ]
    }
]
// x轴
let nameArr = dataArr[0].list.map(it => it.name)
onMounted(() => {
    const chart = echarts.init(document.querySelector('#sale') as HTMLElement)

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
            top: '70%',
            icon: 'circle',
            right:'12%',
            // z: 2,
            orient: "vertical",
            // data: legendArr
            textStyle: {
                color: "#FFF"
            }
        },
        color: ["rgba(0, 224, 219, 1)", "rgba(211, 22, 50, 1)", "rgba(247, 181, 0, 1)"],
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
            data: nameArr,
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
                name: dataArr[0].name,
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
                data: dataArr[0].list.map(it => it.value)
            },
            {
                // color:"rgba(0, 218, 216, 1)",
                name: dataArr[1].name,
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
                data: dataArr[1].list.map(it => it.value)
            },
            {
                // color:"rgba(0, 218, 216, 1)",
                name: dataArr[2].name,
                type: 'line',
                // smooth: true, //是否平滑
                showAllSymbol: true,
                // symbol: 'image://./static/images/guang-circle.png',
                symbol: 'circle',
                symbolSize: 6,
                lineStyle: {
                    normal: {
                        color: "rgba(247, 181, 0, 1)",
                        shadowColor: 'rgba(247, 181, 0, 1)',
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
                    color: "rgba(247, 181, 0, 1)",
                    borderColor: "#fff",
                    borderWidth: 2,
                    shadowColor: 'rgba(247, 181, 0, 1)',
                    shadowBlur: 20,
                    // shadowOffsetY: 1,
                    // shadowOffsetX: 1,
                },
                tooltip: {
                    show: true
                },
                data: dataArr[2].list.map(it => it.value)
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
    // margin: auto;
    // margin-top: 30px;

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
            width: 60%;

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