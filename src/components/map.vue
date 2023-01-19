<template>
  <!-- <h4>map</h4> -->
  <div id="china"></div>
</template>


<script setup lang="ts">
import { onMounted } from 'vue';
// import echarts from 'echarts'
import * as echarts from 'echarts' //echarts 5 需要这样导入
import '../../public/static/map/china'

onMounted(() => {
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
  const data = [
    {
      name: "内蒙古",
      value: [110.3467, 41.4899],
      list: "司机用户：388"
    },
    {
      name: "武汉",
      value: [114.31, 30.52],
      list: "司机用户：388"
    }, {
      name: "丹东",
      value: [124.37, 40.13],
      list: "司机用户：388"
    }, {
      name: "张家口",
      value: [114.87, 40.82],
      list: "司机用户：388"
    }, {
      name: "深圳",
      value: [114.07, 22.62],
      list: "司机用户：388"
    },
    {
      name: "金华",
      value: [119.64, 29.12],
      list: "司机用户：388"
    }, {
      name: "西安",
      value: [108.95, 34.27],
      list: "司机用户：388"
    }
  ]

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
        areaColor: "rgba(0, 72, 91, 1)",
      },
      select: {
        itemStyle: {
          areaColor: "rgba(0, 72, 91, 1)",
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
        // coordinateSystem: 'geo',
        // rippleEffect: {
        //   scale: 5,
        //   brushType: 'stroke'
        // },
        data: data,
        label: {
          // show: true,
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
        type: "effectScatter",
        coordinateSystem: "geo",
        //   symbol: 'image://http://ssq168.shupf.cn/data/biaoji.png',
        // symbolSize: [30,120],
        // symbolOffset:[0, '-40%'] ,
        symbol: "circle",
        symbolSize: [10, 10],
        // tooltip:{
        //   padding:[0,0,0,10]
        // },
        //涟漪效果
        rippleEffect: {
          scale: 3,
          brushType: 'stroke'
        },
        label: {
          // show: true,
          // color: "#fff",
          position: 'right',
          fontSize: 12,
          width:89,
          height:35,
          // offset:[20,0],
          // align:"center",
          padding:[0,0,0,7],
          color:"rgba(255, 140, 26, 1)",
          backgroundColor:"rgba(204, 204, 204, 1)",
          formatter(value: any) {
            return value.data.list;
          },
        },
        itemStyle: {
          color: "rgba(255, 115, 11, 1)", //标志颜色
        },
        emphasis: {
          // areaColor: "rgba(0, 218, 216, 1)",
          label: {
            show: true,
            // color: "#fff",
          },
        },
        data: data,
      },
    ],
  });
})
</script>

<style scoped lang="less">
#china {
  width: 100%;
  height: 500px;
  margin: auto;
}
</style>