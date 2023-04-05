<template>
    <div class="container">
        <div class="header">
            <div></div>
            <span>广告播放量</span>
            <div class="divfr"></div>
            <div class="divfr" style="right: -4px;"></div>
        </div>
        <div class="content">
            <div id="online"></div>
            <div class="statistics">
                <div>
                    <p>{{ data.num }}</p>
                    <span>本月视频播放量</span>
                </div>
                <div>
                    <p>{{ data.compare }}</p>
                    <span>较上个月</span>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted,getCurrentInstance,ComponentInternalInstance,ref, reactive } from 'vue';
const {proxy} = getCurrentInstance() as ComponentInternalInstance
async function getAdsList() {
    const adsData = await proxy?.$http({
        url:"/shop/videoCount/getP"
    })
    console.log('广告图',adsData);
    const adsList = adsData?.data.data.map
    console.log(adsList);
    
    data.num = adsList.cty[adsList.cty.length - 1];
    const lastNum =adsList.cty[adsList.cty.length - 2];
    const com = ((data.num - lastNum )/ lastNum * 100).toFixed(1)
    data.compare = com+"%"
    console.log('num',data.num);
    return adsList;
}

let data=reactive({
    num:0,
    compare:''
});

onMounted(async() => {
    const adsList=await getAdsList()
    const chart = echarts.init(document.querySelector('#online') as HTMLElement)


    const color = ["rgba(0, 224, 219, 1)", "rgba(0, 145, 255, 1)"]
    // 半透明的颜色值
    const colorArr1 = [
        'rgba(19, 255, 231, 0.17)',
        'rgba(48, 97, 192, 0.17)',

    ]
    // 全透明的颜色值
    const colorArr2 = [
        'rgba(17, 70, 139, 0)',
        'rgba(40, 75, 144, 0)',

    ]
   
    // x轴
    let nameArr =adsList.tx
    let ydata1 =adsList.cty
    let ydata2 =adsList.ttx   
    
    const option = {
        grid: {
            // top: '35%',
            // left: '3%',
            // right: '4%',
            // bottom: '1%',
            containLabel: true, //x轴显示
            top: '10%',
            left: '5%',
            right: '10%',
            bottom: '35%',
        },
        //工具提示
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(187, 232, 226, 0.2)',
            textStyle: {
                color: '#fff'
            },
            borderColor: "rgba(255,255,255, .5)",
        },
        color: ["rgba(0, 224, 219, 1)", "rgba(0, 145, 255, 1)"],
        legend: {
            top: '83%',
            icon: 'circle',
            right: '12%',
            // z: 2,
            orient: "vertical",
            // data: legendArr
            textStyle: {
                color: "#FFF"
            }

        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,//紧挨边缘
            data: nameArr,
            splitLine: {
                lineStyle: {
                    color: 'rgba(50, 255, 251, 1)',
                    type: "soild"
                }
            },
            axisLine: { //坐标轴轴线相关设置。数学上的x轴
                show: true,
                lineStyle: {
                    color: 'rgba(40, 75, 144, 0)',
                    type: "soild"
                },
            },
            axisLabel: { //坐标轴刻度标签的相关设置
                textStyle: {
                    color: '#fff',
                    padding: 16,
                    fontSize: 14
                },
                // formatter: function (data) {
                //     return data
                // }
            }
        }],
        yAxis: {
            type: 'value',
            boundaryGap: false,//紧挨边缘
            splitLine: {
                lineStyle: {
                    color: 'rgba(96, 96, 96, 1)',
                    type: 'dashed'
                }
            },
            nameTextStyle: {
                color: "rgba(212, 232, 254, 1)",
                fontSize: 12,
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: "#233653"
                }

            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: 'rgba(212, 232, 254, 1)',
                    padding: 16
                },
            },
            axisTick: {
                show: false,
            },
        },
        series: [
            {
                type: 'line',
                name: "广告数量",
                smooth: true,
                symbol: "none",
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: colorArr1[0]
                        },
                        {
                            offset: 1,
                            color: colorArr2[0]
                        }
                    ])
                },
                data: ydata1,
            },
            {
                type: 'line',
                name:"广告时长",
                smooth: true,
                symbol: "none",
                // symbol: 'circle',
                // showAllSymbol: true,
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: colorArr1[1]
                        },
                        {
                            offset: 1,
                            color: colorArr2[1]
                        }
                    ])
                },
                data: ydata2
            }
        ]
    }


    chart.setOption(option, true)

    window.addEventListener('resize', function () {//执行
        chart.resize();
    })
})
</script>

<style scoped lang="less">
.container {
    width: 100%;
    min-width: 420px;
    // margin-bottom: 30px;
    margin: auto;

    .header {
        // width: 650px;
        width: 95%;
        position: relative;
        text-align: left;
        border-bottom: 1px solid rgba(0, 218, 216, 1);
        // margin-left: 20px;
        box-sizing: border-box;

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

        #online {
            width: 100%;
            height: 300px;
        }

        .statistics {
            width: 60%;
            position: absolute;
            display: flex;
            bottom: 0px;
            margin-left: 5px;
            justify-content: space-around;
            min-width: 251px;

            >div {
                // padding-top: 10px;
                min-width: 118px;
                // height: 61px;
                flex: 1;
                background: url('../../public/static/img/pic3.png') no-repeat center;
                box-sizing: border-box;
                padding-top: 8px;
                // margin-right: 5px;

                p {
                    margin: 0;
                    font-size: 20px;
                    color: rgba(102, 255, 255, 1);
                }

                span {
                    font-size: 12px;
                    color: #fff;
                }
            }

        }
    }

}
</style>