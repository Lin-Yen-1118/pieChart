<template>
  <div ref="pieContainer" class="container"></div>
</template>
<script setup>
import { onMounted, onUnmounted, ref, reactive } from 'vue';
import { getPieData } from '@/api/pie.js';
import { useRefreshTime } from '@/utils/refreshTime.js';
import usePie from '@/composable/usePie.js';

let pieData = ref('');

const pieContainer = ref(null);

function pieChartFn() {
  const { setOption, resize } = usePie(pieContainer.value);
  let currentData = ref('');

  let arr = reactive([]);

  let rawPieData = reactive([...pieData.value]);

  rawPieData.map(({ name, value, itemStyle }) => {
    let newData = {
      name: name,
      value: value,
      itemStyle: itemStyle,
      label: {
        formatter: function (params) {
          return (
            '{customStyle|}' +
            '{per|}' +
            `${params.name}: ${params.value}個 / ${params.percent}%`
          );
        },
        rich: {
          per: {
            color: 'transparent',
            padding: [5, 5],
            borderRadius: 4,
            width: '10px',
            margin: '5px',
          },
          customStyle: {
            backgroundColor: itemStyle.color,
            height: 12,
            padding: [0, 12, 0, 12],
            width: '20',
            color: '#eee',
          },
        },
        fontSize: 14,
        fontWeight: 700,
        backgroundColor: '#FFFFFF',
        padding: [10, 10, 8, 8],
        shadowColor: 'rgba(197, 197, 205, 1)',
        shadowBlur: 2,
        shadowOffsetX: 1,
        shadowOffsetY: 1,
        borderWidth: 1,
        borderColor: '#FFFFFF',
      },
    };

    arr.push(newData);

    currentData.value = arr;
  });

  setOption(arr);

  window.addEventListener('resize', () => {
    resize();
  });
}

// 取得 api
async function getAsyncDataAPI() {
  // 取得 PIE api
  try {
    const newPieData = await getPieData();
    pieData.length = 0;
    pieData.value = newPieData.data;
  } catch (err) {
    console.log('err:', err);
  }
}

let { timer, refreshTime } = useRefreshTime();

onMounted(async () => {
  const getAPI = async () => {
    getAsyncDataAPI();
    pieChartFn();
    // 刷新資料
    clearInterval(timer);
    timer = setInterval(async () => {
      getAPI();
    }, refreshTime);
  };
  await getAPI();
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>
<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
html,
body {
  width: 100%;
  height: 100%;
  background-color: #e9e9e9;
  display: flex;
  justify-content: center;
  align-items: center;
}
#app {
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
}
</style>
