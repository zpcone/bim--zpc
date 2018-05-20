const option = {
  grid: {
    left: '20px',
    right: '100px',
    bottom: '20px',
    containLabel: true
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999'
      }
    }
  },
  toolbox: {
    feature: {
      dataView: {show: false, readOnly: false},
      magicType: {show: false, type: ['line', 'bar']},
      restore: {show: false},
      saveAsImage: {show: false}
    }
  },
  legend: {
    data: [{name: '能耗量', textStyle: {color: '#b3c7df'}},
      {name: '能耗预算', textStyle: {color: '#b3c7df'}},
      {name: '费用', textStyle: {color: '#b3c7df'}},
      {name: '费用预算', textStyle: {color: '#b3c7df'}},
      {name: '温度', textStyle: {color: '#b3c7df'}},
      {name: '湿度', textStyle: {color: '#b3c7df'}}
    ]
  },
  xAxis: [
    {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      axisLabel: {
        textStyle: {
          color: '#b3c7df',
          fontSize: '12'
        }
        // formatter: '{value} ml'
      },
      axisPointer: {
        type: 'shadow'
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '能耗量(Kwh)',
      min: 0,
      interval: 0.2,
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
      name: '金额（元）',
      min: 0,
      interval: 100,
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
      min: -50,
      max: 50,
      interval: 10,
      offset: 60,
      boundaryGap: [0.2, 0.2],
      position: 'right',
      axisLine: {
        lineStyle: {
          color: '#f5e489'
        }
      },
      axisLabel: {
        textStyle: {
          color: '#b3c7df',
          fontSize: '12'
        }
        // formatter: '{value} ml'
      }
    },
    {
      type: 'value',
      name: '湿度（%）',
      max: 100,
      min: 0,
      boundaryGap: [0.25, 0.2],
      position: 'right',
      offset: 120,
      axisLine: {
        lineStyle: {
          color: '#309049'
        }
      },
      axisLabel: {
        formatter: '{value} %'
      }
    }
  ],
  series: [
    {
      name: '能耗量',
      yAxisIndex: 0,
      itemStyle: {
        normal: {color: '#96e7ee'}
      },
      type: 'bar',
      barWidth: 30, // 柱图宽度
      data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
    },
    {
      name: '能耗预算',
      yAxisIndex: 1,
      type: 'line',
      data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
    },
    {
      name: '费用',
      yAxisIndex: 1,
      itemStyle: {
        normal: {color: '#ff5e6f'}
      },
      type: 'bar',
      barWidth: 30, // 柱图宽度
      data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
    },
    {
      name: '费用预算',
      yAxisIndex: 1,
      type: 'line',
      data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
    },
    {
      name: '温度',
      yAxisIndex: 2,
      type: 'line',
      itemStyle: {
        normal: {
          lineStyle: {
            color: '#309049'
          }
        }
      },
      data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
    },
    {
      name: '湿度',
      yAxisIndex: 3,
      type: 'line',
      itemStyle: {
        normal: {
          lineStyle: {
            color: '#eec402'
          }
        }
      },
      data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
    }
  ]
}
export default option
