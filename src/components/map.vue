<template>
    <!-- <h4>map</h4> -->
    <div id="china"></div>
</template>


<script setup lang="ts">
import { onMounted } from 'vue';
// import echarts from 'echarts'
import * as echarts from 'echarts' //echarts 5 需要这样导入
import '../../public/static/map/china'

onMounted(()=>{
    const chart = echarts.init(document.querySelector('#china') as HTMLElement)
    // var data = [
    //     {
    //         name:"内蒙古",
    //         itemStyle:{
    //             areaColor:"rgba(0, 218, 216, 1)"
    //         },
    //         value:[110.3456,41.4889]
    //     }
    // ]
    chart.setOption({
    geo: {
      map: "china",
      aspectScale: 0.8,
      layoutCenter: ["50%", "50%"],
      layoutSize: "120%",
      itemStyle: {
        areaColor: {
          type: "linear-gradient",
          x: 0,
          y: 1200,
          x2: 1000,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "rgba(0, 218, 216, 1)", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "rgba(0, 218, 216, 1)", // 50% 处的颜色
            },
          ],
          global: true, // 缺省为 false
        },
        shadowColor: "rgba(0, 218, 216, 1)",
        shadowOffsetX: 0,
        shadowOffsetY: 6,
        opacity: 0.2,
      },
      emphasis: {
        areaColor: "rgba(0, 218, 216, 1)",
      },
      select:{
        itemStyle:{
            areaColor:"rgba(0, 218, 216, 1)",


        }
      },

      regions: [
        {
          name: "南海诸岛",
          itemStyle: {
            areaColor: "rgba(0, 218, 216, 1)",
            borderColor: "rgba(0, 218, 216, 1)",
            opacity: 0,
            label: {
              show: false,
              color: "rgba(0, 218, 216, 1)",
            },
          },
          label: {
            show: false,
            color: "#FFFFFF",
            fontSize: 12,
          },
        },
      ],
    },
    series: [
      {
        type: "map",
        map: "china",
        aspectScale: 0.8,
        layoutCenter: ["50%", "50%"], //地图位置
        layoutSize: "120%",
        zoom: 1, //当前视角的缩放比例
        // roam: true, //是否开启平游或缩放
        scaleLimit: {
          //滚轮缩放的极限控制
          min: 1,
          max: 2,
        },
        label: {
          show: true,
          color: "#FFFFFF",
          fontSize: 12,
        },
        itemStyle: {
        //   color:"rgba(255, 115, 11, 1)",
          areaColor: "transparent",
          borderColor: "rgba(0, 218, 216, 1)",
          borderWidth: 1.2,
        },
        emphasis: {
          areaColor: "rgba(0, 218, 216, 1)",
          label: {
            show: true,
            color: "#fff",
          },
        },
        // data: data,
      },
      {
        type: "scatter",
        coordinateSystem: "geo",
        //   symbol: 'image://http://ssq168.shupf.cn/data/biaoji.png',
        // symbolSize: [30,120],
        // symbolOffset:[0, '-40%'] ,
        symbol: "pin",
        symbolSize: [45, 45],
        label: {
          show: true,
          color: "#fff",
          formatter(value: any) {
            return value.data.value[2];
          },
        },
        itemStyle: {
          color: "rgba(0, 218, 216, 1)", //标志颜色
        },
        // data: data,
      },
    ],
  });
})
</script>

<style scoped lang="less">
body{
    width: 100%;
}
#china {
    width: 680px;
    height: 500px;
    margin: auto;
}
</style>