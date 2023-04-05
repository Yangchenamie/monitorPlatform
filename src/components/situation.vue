<template>
    <div class="container">
        <div class="header">
            <div></div>
            <span>今日情况</span>
            <div class="divfr"></div>
            <div class="divfr" style="right: -4px;"></div>
        </div>
        <div class="content">
            <div class="situation1"></div>
            <div class="situation2"></div>
            <div class="situation3"></div>
            <div class="situation4"></div>
            <div class="situation5"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import moment from 'moment';
import { onMounted, getCurrentInstance, ComponentInternalInstance } from 'vue';
const { proxy } = getCurrentInstance() as ComponentInternalInstance

let angle = 0; // 角度
// let dataValue = 58;
interface situationData {
    machineNum: number,
    saleNum: number,
    videoNum: number,
    onlineNum: number,
    incomeNum: number
}


async function getData(): Promise<situationData> {
    const date = moment(new Date()).format("YYYY-MM-DD");
    // console.log(date);
    // 装载数量
    const machine = await proxy?.$http({
        url: "/driver/member/getDay"
    })
    console.log(machine);
    const machineNum = machine?.data.data.number

    // 查看某天的销售量
    const sale = await proxy?.$http({
        url: `/shop/order/selectDay/${date}`
    })
    const saleNum = sale?.data.data.map.number
    console.log('sale',sale);

    // 查看今天的广告播放量
    const video = await proxy?.$http({
        url: "/shop/videoCount/day"
    })
    const videoNum = video?.data.data.map.number
    console.log('video',video);
    

    // 某天的在线量
    const online = await proxy?.$http({
        url: `/shop/count/getDay/${date}`,
    })
    const onlineNum = online?.data.data.map.number
    console.log('online',online);
    
    // 今天的收益额
    const income = await proxy?.$http({
        url: `/shop/order/selectM/${date}`
    })
    const incomeNum = income?.data.data.map.number
    console.log('income',incomeNum);
    
    return {
        machineNum, saleNum,videoNum, onlineNum, incomeNum
    }
}

onMounted(async () => {
    const datas =await getData()

    console.log(datas);

    const chart1 = echarts.init(document.querySelector('.situation1') as HTMLElement)
    const chart2 = echarts.init(document.querySelector('.situation2') as HTMLElement)
    const chart3 = echarts.init(document.querySelector('.situation3') as HTMLElement)
    const chart4 = echarts.init(document.querySelector('.situation4') as HTMLElement)
    const chart5 = echarts.init(document.querySelector('.situation5') as HTMLElement)
    const optionFun = (dataValue: number | string, text: string) => {
        const option = {

            // backgroundColor: '#002837',
            title: {
                text: `{v|${dataValue}}\n{t|${text}}`,
                x: 'center',
                y: 'center',
                textStyle: {
                    rich: {
                        v: { fontSize: 18, color: 'rgba(0, 224, 219, 1)' },
                        t: { fontSize: 12, color: '#fff' }
                    }
                }
            },
            series: [
                /** 绘制内部圆弧-1 <right-top> */
                {
                    type: 'custom',
                    coordinateSystem: 'none',
                    renderItem: (params: any, api: { getWidth: () => number; getHeight: () => number; }) => {
                        return {
                            type: 'arc',
                            shape: {
                                cx: api.getWidth() / 2,
                                cy: api.getHeight() / 2,
                                r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.6,
                                startAngle: (270 + angle) * Math.PI / 180,
                                endAngle: (360 + angle) * Math.PI / 180
                            },
                            style: {
                                fill: 'transparent',
                                stroke: 'rgba(1, 248, 68, 0.4)',
                                lineWidth: 2
                            },
                            silent: true
                        }
                    },
                    data: [0]
                },
                /** 绘制内部圆弧-2 <left-bottom> */
                {
                    type: 'custom',
                    coordinateSystem: 'none',
                    renderItem: (params: any, api: { getWidth: () => number; getHeight: () => number; }) => {
                        return {
                            type: 'arc',
                            shape: {
                                cx: api.getWidth() / 2,
                                cy: api.getHeight() / 2,
                                r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.6,
                                startAngle: (90 + angle) * Math.PI / 180,
                                endAngle: (180 + angle) * Math.PI / 180
                            },
                            style: {
                                fill: 'transparent',
                                stroke: 'rgba(1, 248, 68, 0.4)',
                                lineWidth: 2
                            },
                            silent: true
                        }
                    },
                    data: [0]
                },
                /** 绘制外部圆弧-1 <right-bottom> */
                {
                    type: 'custom',
                    coordinateSystem: 'none',
                    renderItem: (params: any, api: { getWidth: () => number; getHeight: () => number; }) => {
                        return {
                            type: 'arc',
                            shape: {
                                cx: api.getWidth() / 2,
                                cy: api.getHeight() / 2,
                                r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.66,
                                startAngle: (355 + -angle) * Math.PI / 180,
                                endAngle: (120 + -angle) * Math.PI / 180
                            },
                            style: {
                                fill: 'transparent',
                                stroke: 'rgba(1, 248, 68, 0.4)',
                                lineWidth: 2.6
                            },
                            silent: true
                        }
                    },
                    data: [0]
                },
                /** 绘制外部圆弧-2 <left-top> */
                {
                    type: 'custom',
                    coordinateSystem: 'none',
                    renderItem: (params: any, api: { getWidth: () => number; getHeight: () => number; }) => {
                        return {
                            type: 'arc',
                            shape: {
                                cx: api.getWidth() / 2,
                                cy: api.getHeight() / 2,
                                r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.66,
                                startAngle: (175 + -angle) * Math.PI / 180,
                                endAngle: (300 + -angle) * Math.PI / 180
                            },
                            style: {
                                fill: 'transparent',
                                stroke: 'rgba(1, 248, 68, 0.4)',
                                lineWidth: 2.6
                            },
                            silent: true
                        }
                    },
                    data: [0]
                },
                /** 绘制外部圆弧-1-开始圆点 <right-bottom> */
                {
                    type: 'custom',
                    coordinateSystem: 'none',
                    renderItem: (params: any, api: { getWidth: () => number; getHeight: () => number; }) => {
                        let x0 = api.getWidth() / 2;
                        let y0 = api.getHeight() / 2;
                        let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.66;
                        return {
                            type: 'circle',
                            shape: {
                                /** 角度355° 外弧1开始角度 */
                                cx: x0 + r * Math.cos((355 + -angle) * Math.PI / 180),
                                cy: y0 + r * Math.sin((355 + -angle) * Math.PI / 180),
                                r: 4
                            },
                            style: {
                                fill: 'rgba(1, 248, 68, 0.4)',
                                stroke: 'rgba(1, 248, 68, 0.4)'
                            },
                            silent: true
                        }
                    },
                    data: [0]
                },
                /** 绘制外部圆弧-2-开始圆点 <left-top> */
                {
                    type: 'custom',
                    coordinateSystem: 'none',
                    renderItem: (params: any, api: { getWidth: () => number; getHeight: () => number; }) => {
                        let x0 = api.getWidth() / 2;
                        let y0 = api.getHeight() / 2;
                        let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.66;
                        return {
                            type: 'circle',
                            shape: {
                                /** 角度175° 外弧2开始角度 */
                                cx: x0 + r * Math.cos((175 + -angle) * Math.PI / 180),
                                cy: y0 + r * Math.sin((175 + -angle) * Math.PI / 180),
                                r: 4
                            },
                            style: {
                                fill: 'rgba(1, 248, 68, 0.4)',
                                stroke: 'rgba(1, 248, 68, 0.4)'
                            },
                            silent: true
                        }
                    },
                    data: [0]
                },
                /** 刻度仪表盘 */
                {
                    type: 'gauge',
                    center: ['50%', '50%'],
                    radius: '68.5%', // 错位调整此处
                    startAngle: 0,
                    endAngle: 360,
                    axisLine: { show: false },
                    splitLine: { show: false },
                    axisTick: {
                        splitNumber: 10,
                        // length: 8,  // 刻度长度
                        length: '4%',
                        lineStyle: {
                            color: 'rgba(1, 248, 68, 0.4)',
                            width: 1.5
                        }
                    },
                    axisLabel: { show: false }
                },
                /** 内心圆 */
                {
                    type: 'custom',
                    coordinateSystem: 'none',
                    renderItem: (params: any, api: { getWidth: () => number; getHeight: () => number; }) => {
                        return {
                            type: 'circle',
                            shape: {
                                cx: api.getWidth() / 2,
                                cy: api.getHeight() / 2,
                                r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.38,
                                startAngle: (175 + angle) * Math.PI / 180,
                                endAngle: (300 + angle) * Math.PI / 180
                            },
                            style: {
                                fill: 'transparent',
                                stroke: '#00374C80',
                                lineWidth: 2.6
                            },
                            silent: true
                        }
                    },
                    data: [0]
                },
                /** 饼图 */
                {
                    name: '已完成',
                    type: 'pie',
                    startAngle: 90,
                    z: 0,
                    label: {
                        position: 'center'
                    },
                    radius: ['56%', '44%'],
                    silent: true,
                    animation: false, // 关闭饼图动画
                    data: [{
                        value: 50,
                        itemStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0.2,
                                x2: 1,
                                y2: 0,
                                colorStops: [
                                    { offset: 0, color: 'rgba(0, 218, 216, 1)' },
                                    { offset: 1, color: '#01f744' }
                                ]
                            }
                        }
                    }]
                },
                /** 饼图上刻度 */
                {
                    type: 'gauge',
                    center: ['50%', '50%'],
                    radius: '63%', // 错位调整此处
                    startAngle: 0,
                    endAngle: 360,
                    splitNumber: 12,
                    axisLine: { show: false },
                    splitLine: {
                        // length: 39,
                        length: '24%',
                        lineStyle: {
                            width: 12,
                            color: '#002837'
                        }
                    },
                    axisTick: { show: false },
                    axisLabel: { show: false }
                },
            ]
        }
        return option
    }
    const option1 = optionFun(datas.machineNum, "装机数量")
    const option2 = optionFun(datas.saleNum, "销售数量")
    const option3 = optionFun(datas.videoNum, "广告播放量")
    const option4 = optionFun(datas.onlineNum, "在线数量")
    const option5 = optionFun(datas.incomeNum, "收益额")
    setInterval(() => {
        angle = angle + 2;
        chart1.clear()
        chart1.setOption(option1, true);
    }, 100)
    setInterval(() => {
        angle = angle + 2;
        chart2.clear()
        chart2.setOption(option2, true);
    }, 100)
    setInterval(() => {
        angle = angle + 2;
        chart3.clear()
        chart3.setOption(option3, true);
    }, 100)
    setInterval(() => {
        angle = angle + 2;
        chart4.clear()
        chart4.setOption(option4, true);
    }, 100)
    setInterval(() => {
        angle = angle + 2;
        chart5.clear()
        chart5.setOption(option5, true);
    }, 100)
    window.addEventListener('resize', function () {//执行
        chart1.resize();
        chart2.resize();
        chart3.resize();
        chart4.resize();
        chart5.resize();
    })
})

</script>

<style scoped lang="less">
.container {
    width: 100%;
    margin: auto;
    min-width: 320px;

    .header {
        // width: 650px;
        width: 92%;
        position: relative;
        text-align: left;
        border-bottom: 1px solid rgba(0, 218, 216, 1);
        margin-left: 3%;

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
        display: flex;

        // margin: auto;
        >div {
            // width: 130px;
            flex: 1;
            height: 180px;
            flex-wrap: wrap;
        }

    }

}
</style>