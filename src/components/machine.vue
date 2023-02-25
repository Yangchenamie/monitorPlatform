<template>
    <div class="container">
        <div class="header">
            <div></div>
            <span>装机数量</span>
            <div class="divfr"></div>
            <div class="divfr" style="right: -4px;"></div>
        </div>
        <div class="content">
            <div id="machine">

            </div>
            <div class="statistics">
                <div>
                    <p>5.88w </p>
                    <span>装机总数</span>
                </div>
                <div>
                    <p>+234</p>
                    <span>较上一个月</span>
                </div>
                <div>
                    <p>2%</p>
                    <span>装机率</span>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted } from 'vue';

onMounted(() => {
    const chart = echarts.init(document.querySelector('#machine') as HTMLElement)

    let result = [
        { name: '一月', ai: 2500 },
        { name: '二月', ai: 5000 },
        { name: '三月', ai: 2900 },
        { name: '四月', ai: 2600 },
        { name: '五月', ai: 3000 },
        { name: '六月', ai: 7000 },
        { name: '七月', ai: 7500 },
        { name: '八月', ai: 2600 },
        { name: '九月', ai: 3600 },
        { name: '十月', ai: 6200 },
        { name: '十一月', ai: 4300 },
        { name: '十二月', ai: 7500 },

    ]

    let xData = result.map((item) => {
        return item.name
    })
    let keys = ['ai'], seriesData = []
    let color = ['0, 254, 210', '0, 124, 250']
    keys.forEach((key, index) => {
        seriesData.push({
            name: "装机数量",
            data: result.map((item) => {
                return item[key]
            }),
            type: 'line',
            yAxisIndex: 0,
            symbol: 'none',
            symbolSize: 7,
            barWidth: 14,
            splitNumber: 6,
            smooth: false,
            itemStyle: {
                color: `rgba(${color[index]},1)`
            },
            lineStyle: {
                color: `rgba(${color[index]},1)`,
                width: 1
            },
            areaStyle: {
                opacity: 1,
                color: {
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    type: 'linear',
                    global: false,
                    colorStops: [
                        {
                            offset: 0,
                            color: `rgba(${color[index]},0.35)`
                        },
                        {
                            offset: 0.8,
                            color: 'rgba(6, 8, 41,.1)'
                        }
                    ]
                },
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
            }
        })
        seriesData.push({
            name: key + '数',
            data: [
                {
                    coords: result.map((item) => {
                        return [item.name, item[key]]
                    })
                }
            ],
            type: 'lines',
            coordinateSystem: 'cartesian2d',
            zlevel: 1,
            polyline: true,
            smooth: true,
            symbol: 'circle',
            effect: {
                show: true,
                trailLength: 0.4,
                symbol: 'circle',
                period: 8,
                symbolSize: 4
            },
            lineStyle: {
                normal: {
                    color: `rgba(${color[index]},1)`,
                    width: 0,
                    opacity: 0,
                    curveness: 0
                }
            }
        })
    })

    chart.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line'
            },
            backgroundColor: 'rgba(187, 232, 226, 0.2)',
            borderColor: 'rgba(3, 11, 44, 0.5)',
            textStyle: {
                color: 'rgba(255, 255, 255, 1)'
            }
        },
        grid: {
            x: 30,
            y: 10,
            x2: 30,
            y2: 20
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xData,
            axisPointer: {
                handle: {
                    show: false
                }
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#AEC6DF'
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                fontSize: 8,
                interval: 'auto'
            }
        },
        yAxis: [
            {
                type: 'value',
                splitLine: {
                    show: false
                },
                axisLabel: {
                    fontSize: 8,
                    interval: 'auto'
                }
            }
        ],
        series: seriesData
    })
    window.addEventListener('resize', function () {//执行
        chart.resize();
    })
})
</script>

<style scoped lang="less">
.container {
    width: 100%;
    margin-bottom: 30px;
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

        #machine {
            width: 100%;
            height: 200px;
            margin-top: 30px;
        }

        .statistics {
            width: 98%;
            display: flex;
            align-items: center;
            // flex-flow: row;
            justify-content: space-between;
            height: 70px;
            margin-top: 28px;

            >div {
                flex: 0.28;
                height: 100%;
                border: 0.4px solid rgba(102, 255, 255, .3);
                // opacity: 0.3;
                padding-top: 10px;
                box-sizing: border-box;

                p {
                    color: rgba(102, 255, 255, 1);
                    margin: 0;
                }

                span {
                    color: #fff;
                }
            }
        }
    }

}
</style>