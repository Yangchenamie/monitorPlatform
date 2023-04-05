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
                    <p>{{ datas.countNum }} </p>
                    <span>装机总数</span>
                </div>
                <div>
                    <p>+{{ datas.compareNum }}</p>
                    <span>较上一个月</span>
                </div>
                <div>
                    <p>{{ datas.machineRate }}</p>
                    <span>装机率</span>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, getCurrentInstance, ComponentInternalInstance,reactive } from 'vue';
const { proxy } = getCurrentInstance() as ComponentInternalInstance
let datas  = reactive({
    machineRate:'',
    compareNum:'',
    countNum:""
});
interface data {
    name:string,
    num:number
}
async function getData(){
    const rate = await proxy?.$http({
        url:"/driver/member/probability"
    })
    console.log(rate);
    datas.machineRate = rate?.data.data.num
    // console.log(machineRate);

    const compare = await proxy?.$http({
        url:"/driver/member/compare"
    })
    console.log(compare);
    datas.compareNum = compare?.data.data.mum

    const count = await proxy?.$http({
        url:"/driver/member/count"
    })
    datas.countNum = count?.data.data.number
}
async function getMachineMap() {
    const data = await proxy?.$http({
        url:'/driver/member/months'
    })
    console.log('装机图',data);
    const machineMap = data?.data.data.map
    return machineMap;
}

onMounted(async() => {
    getData()
    const machineMap = await getMachineMap()
    console.log('machineMap:',machineMap);
    
    let len :number = machineMap.tx.length
    let arr:any[] = new Array()
    for(let i=0;i<len;i++){
        let data:data = {
            name:machineMap.tx[i],
            num:machineMap.ty[i]
        }
        arr.push(data)
    }
    console.log(arr);

    

    const chart = echarts.init(document.querySelector('#machine') as HTMLElement)

    


    let result = arr

    let xData = result.map((item) => {
        return item.name
    })
    let keys = ['num']
    console.log(keys);
    
    let seriesData: { name: string; data: any[] | { coords: any[][]; }[]; type: string; yAxisIndex?: number; symbol: string; symbolSize?: number; barWidth?: number; splitNumber?: number; smooth: boolean; itemStyle?: { color: string; }; lineStyle: { color: string; width: number; } | { normal: { color: string; width: number; opacity: number; curveness: number; }; }; areaStyle?: { opacity: number; color: { x: number; y: number; x2: number; y2: number; type: string; global: boolean; colorStops: { offset: number; color: string; }[]; }; shadowColor: string; shadowBlur: number; }; coordinateSystem?: string; zlevel?: number; polyline?: boolean; effect?: { show: boolean; trailLength: number; symbol: string; period: number; symbolSize: number; }; }[] = []
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