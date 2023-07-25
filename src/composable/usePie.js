// 按需引入
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
]);

const usePie = (element) => {
  // 初始化，傳入HTML element
  const pieChart = echarts.init(element);

  // 封裝相關參數依需求訂製
  const setOption = (data) => {
    const option = {
      title: {
        text: '器材數量和佔比率',
        top: '0',
        textStyle: { fontWeight: '700' },
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'horizontal',
        align: 'left',
        left: '160',
        top: '0',
        itemGap: 25,
        itemHeight: 12,
        pageTextStyle: { fontWeight: 'bolder' },
      },
      grid: {
        left: '0px',
        right: '0px',
        bottom: '0px',
        top: '0px',
        containLabel: true,
      },
      series: [
        {
          name: '器材數量和佔比率',
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
          data: data,
        },
      ],
    };
    return pieChart.setOption(option);
  };

  // 封裝resize，RWD會使用到
  const resize = () => pieChart.resize();

  return { setOption, resize };
};

export default usePie;
