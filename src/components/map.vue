<template>
  <!-- <h4>map</h4> -->
  <div class="content">
    <div id="china"></div>
  </div>
</template>


<script setup lang="ts">
import { onMounted , getCurrentInstance, ComponentInternalInstance} from 'vue';
// import echarts from 'echarts'
import * as echarts from 'echarts' //echarts 5 需要这样导入
import '../../public/static/map/china'
const { proxy } = getCurrentInstance() as ComponentInternalInstance

interface dataInter {
  name:string,
  value:[number,number]
 list:string
}
let mapData: any;
onMounted(async() => {
  const chart = echarts.init(document.querySelector('#china') as HTMLElement)

  mapData =await getMapList();
  console.log('mapData的值',mapData);
  let len:number = mapData.length;
  let arr:any[] = new Array();
  console.log(arr);
  
  for(let i=0;i<len;i++){

    let a:dataInter = {
      name:mapData[i].name,
      value:[mapData[i].location.x,mapData[i].location.y],
      list:"司机用户："+mapData[i].number
    }
    arr.push(a)
  }

  
  const data = arr
    
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
          width: 89,
          height: 35,
          // offset:[20,0],
          // align:"center",
          padding: [0, 0, 0, 7],
          color: "rgba(255, 140, 26, 1)",
          backgroundColor: "rgba(204, 204, 204, 1)",
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
  window.addEventListener('resize', function () {//执行
    chart.resize();
  })
 
  
  
})

async function getMapList(){
  const data = await proxy?.$http({
    url:"/driver/NumberMap/get"
  })
  console.log('map数据：',data);
const mapData = data?.data.data.list
console.log(mapData.length);

return mapData;
}
</script>

<style scoped lang="less">
.content {
  width: 100%;
  min-width: 500px;

  #china {
    // width: 100%;
    height: 500px;
    margin: auto;
    min-width: 500px;

    div {
      width: 100%;
      min-width: 500px;
    }
  }
}
</style>
