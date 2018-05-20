const option = {
  grid: {
    left: '20px',
    right: '40px',
    bottom: '2%',
    containLabel: true
  },
  title: {
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: [{name: '用量', textStyle: {color: '#b3c7df'}},
      {name: '气温', textStyle: {color: '#eec402'}},
      {name: '湿度', textStyle: {color: '#309049'}}
    ]
  },
  toolbox: {
    // feature: {
    //   saveAsImage: {}
    // }
  },
  xAxis: {
    type: 'category',
    boundaryGap: true,
    data: ['hello', '2017-06-03', '2017-06-04', '2017-06-05', '2017-06-06', '2017-06-07', '2017-06-08'],
    axisLabel: {
      textStyle: {
        color: '#b3c7df',
        fontSize: '12'
      }
      // formatter: '{value} ml'
    }
  },
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
      data: [150, 232, 201, 154, 190, 330, 410]
    }
    // {
    //   name: '直接访问',
    //   type: 'line',
    //   stack: '总量',
    //   data: [320, 332, 301, 334, 390, 330, 320]
    // },
    // {
    //   name: '搜索引擎',
    //   type: 'line',
    //   stack: '总量',
    //   data: [820, 932, 901, 934, 1290, 1330, 1320]
    // }
  ]
}
export default option
