/**
 * Created by Administrator on 2017/5/25.
 */
const option = {
  grid: {
    left: '0',
    right: '30px',
    bottom: '2%',
    containLabel: true
  },
  title: {
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: [{name: '用量', textStyle: {color: '#b3c7df'}},
      {name: '气温', textStyle: {color: '#eec402'}},
      {name: '湿度', textStyle: {color: '#309049'}}
    ]
  },
  toolbox: {
  },
  xAxis: [
    {
      type: 'category',
      axisLabel: {
        textStyle: {
          color: '#b3c7df',
          fontSize: '12'
        }
        // formatter: '{value} ml'
      },
      boundaryGap: true,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    }
  ],
  yAxis: [
    {
      type: 'value',
      scale: true,
      name: 'Kwh',
      boundaryGap: [0.2, 0.2],
      position: 'left',
      axisLine: {
        lineStyle: {
          color: '#b3c7df'
        }
      },
      axisLabel: {
        textStyle: {
          color: '#b3c7df',
          fontSize: '12'
        }
      }
    },
    {
      type: 'value',
      scale: true,
      name: '气温(°C)',
      max: 50,
      min: -50,
      boundaryGap: [0.2, 0.2],
      position: 'right',
      axisLine: {
        lineStyle: {
          color: '#eec402'
        }
      },
      axisLabel: {
        textStyle: {
          color: '#b3c7df',
          fontSize: '12'
        },
        formatter: '{value}'
      }
    },
    {
      type: 'value',
      name: '湿度（%）',
      min: 0,
      boundaryGap: [0.25, 0.2],
      position: 'right',
      offset: 60,
      axisLine: {
        lineStyle: {
          color: '#309049'
        }
      },
      axisLabel: {
        formatter: '{value}'
      }
    }
  ],
  series: [
    {
      name: '用量',
      type: 'bar',
      barWidth: 30, // 柱图宽度
      stack: '总量1',
      yAxisIndex: 0,
      areaStyle: {normal: {}},
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: '气温',
      type: 'line',
      stack: '总量2',
      yAxisIndex: 1,
      itemStyle: {
        normal: {
          lineStyle: {
            color: '#eec402'
          }
        }
      },
      areaStyle: {normal: {}},
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: '湿度',
      type: 'line',
      stack: '总量3',
      yAxisIndex: 2,
      itemStyle: {
        normal: {
          lineStyle: {
            color: '#309049'
          }
        }
      },
      areaStyle: {normal: {}},
      data: [150, 232, 201, 154, 190, 330, 410]
    }
  ]
}
export default option
