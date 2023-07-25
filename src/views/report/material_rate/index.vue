<template>
  <!-- <BaseLayout>
    醫材使用率

    <div class="echarts-box">
      <div
        id="myEcharts"
        :style="{ width: '1000px', height: '300px', backgroundColor: '#fff' }"
      ></div>
    </div>
    <div class="p-2"></div>

    <div class="echarts-box">
      <div
        id="myMultipleEcharts"
        :style="{ width: '1050px', height: '300px', backgroundColor: '#fff' }"
      ></div>
    </div>
    <div class="p-2"></div>

    <div class="echarts-box">
      <div
        id="myPieEcharts"
        :style="{ width: '1000px', height: '300px', backgroundColor: '#fff' }"
      ></div>
    </div>

    <div class="p-2"></div>

    <div class="echarts-box">
      <div
        id="myFullPieEcharts"
        :style="{ width: '1000px', height: '300px', backgroundColor: '#fff' }"
      ></div>
    </div>
  </BaseLayout> -->
</template>
<script setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import * as echarts from 'echarts';

const chart = ref(null);
const echart = echarts;
const colors = ['#5470C6', '#91CC75', '#EE6666'];

function initLineChart() {
  let chart = echart.init(document.getElementById('myEcharts'), 'light');
  // 把配置和数据放这里
  chart.setOption({
    xAxis: {
      type: 'category',
      data: [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月',
      ],
    },
    tooltip: {
      trigger: 'axis',
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320, 801, 102, 230, 3070, 4129],
        type: 'line',
        smooth: true,
      },
    ],
  });
}

function initMultipleChart() {
  let chart = echart.init(
    document.getElementById('myMultipleEcharts'),
    'light'
  );
  // 把配置和数据放这里
  chart.setOption({
    xAxis: {
      type: 'category',
      data: [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月',
      ],
    },
    tooltip: {
      trigger: 'axis',
    },
    yAxis: [
      {
        type: 'value',
        name: 'Evaporation',
        position: 'right',
        alignTicks: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[0],
          },
        },
        axisLabel: {
          formatter: '{value} ml',
        },
      },
      {
        type: 'value',
        name: 'Precipitation',
        position: 'right',
        alignTicks: true,
        offset: 80,
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[1],
          },
        },
        axisLabel: {
          formatter: '{value} ml',
        },
      },
      {
        type: 'value',
        name: '使用率',
        position: 'left',
        alignTicks: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[2],
          },
        },
        axisLabel: {
          formatter: '{value} 次',
        },
      },
    ],
    series: [
      {
        name: 'Evaporation',
        type: 'bar',
        data: [
          2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,
        ],
      },
      {
        name: 'Precipitation',
        type: 'bar',
        yAxisIndex: 1,
        data: [
          2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,
        ],
      },
      {
        name: 'Temperature',
        type: 'line',
        yAxisIndex: 2,
        data: [
          2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2,
        ],
      },
    ],
  });
}

function initPieChart() {
  let chart = echart.init(document.getElementById('myPieEcharts'), 'light');

  chart.setOption({
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },

    series: [
      {
        name: 'Access From',
        type: 'pie',

        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: '設備1' },
          { value: 450, name: '設備2' },
          { value: 580, name: '設備3' },
          { value: 484, name: '設備4' },
          { value: 300, name: '設備5' },
          { value: 600, name: '設備6' },
        ],
      },
    ],
  });
}

function initFullPieChart() {
  let chart = echart.init(document.getElementById('myFullPieEcharts'), 'light');

  chart.setOption({
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },

    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',

        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        labelLine: {
          show: true,
          lineStyle: {
            color: '#C1C1C1',
            width: 2,
            type: 'solid',
          },
        },
        label: {
          formatter: function (params) {
            return `${params.name}: ${params.value}通/${params.percent}%`;
          },
          // position: 'end',
          fontSize: 14,
          fontWeight: 700,
          // color: '#000000',
        },

        data: [
          {
            value: 1048,
            name: `外線量`,
            // itemStyle: {
            //   color: '#546FC6',
            // },
          },
          { value: 450, name: '語音辨識系統使用量' },
          { value: 580, name: '人工線機話務量' },
          { value: 484, name: '外線公務電話' },
          { value: 300, name: '放棄通數' },
        ],
      },
    ],
  });
}

onMounted(() => {
  nextTick(() => {
    initLineChart();
    initMultipleChart();
    initPieChart();
    initFullPieChart();
  });
});

onUnmounted(() => {
  if (!chart.value) {
    return;
  }
  chart.value.dispose();
  chart.value = null;
});
</script>
