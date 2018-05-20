const option = {
  grid: {
    left: '0',
    right: '40px',
    bottom: '2%',
    containLabel: true
  },
  title: {
    text: '',
    subtext: ''
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#283b56'
      }
    }
  },
  legend: {
    data: [{name: '电能', textStyle: {color: '#b3c7df'}},
      {name: '水', textStyle: {color: '#b3c7df'}},
      {name: '燃气', textStyle: {color: '#b3c7df'}},
      {name: '热能', textStyle: {color: '#b3c7df'}},
      {name: '温度', textStyle: {color: '#eec402'}},
      {name: '湿度', textStyle: {color: '#309049'}}
    ]
  },
  toolbox: {
    show: false,
    feature: {
      dataView: {readOnly: false},
      restore: {},
      saveAsImage: {}
    }
  },
  dataZoom: {
    show: false,
    start: 0,
    end: 100
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: true,
      axisLabel: {
        textStyle: {
          color: '#b3c7df',
          fontSize: '12'
        }
        // formatter: '{value} ml'
      },
      data: []
    },
    {
      type: 'category',
      boundaryGap: true,
      data: (function () {
        var res = []
        var len = 10
        while (len--) {
          res.push(len + 1)
        }
        return []
      })()
    }
  ],
  yAxis: [
    {
      type: 'value',
      scale: true,
      name: '金额(元)',
      min: 0,
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
        // formatter: '{value} ml'
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
      max: 100,
      min: 0,
      boundaryGap: [0.2, 0.2],
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
    // {
    //   name: '电能',
    //   type: 'bar',
    //   data: (function () {
    //     var res = []
    //     var len = 0
    //     while (len < 10) {
    //       res.push((Math.random() * 10 + 5).toFixed(1) - 0)
    //       len++
    //     }
    //     return res
    //   })()
    // },
    {
      name: '电能',
      type: 'bar',
      barWidth: 20, // 柱图宽度
      xAxisIndex: 1,
      data: (function () {
        var res = []
        var len = 10
        while (len--) {
          res.push(Math.round(Math.random() * 1000))
        }
        return res
      })()
    },
    {
      name: '水',
      type: 'bar',
      itemStyle: {
        normal: {color: '#4ac3ff'}
      },
      barWidth: 20, // 柱图宽度
      xAxisIndex: 1,
      data: (function () {
        var res = []
        var len = 10
        while (len--) {
          res.push(Math.round(Math.random() * 1000))
        }
        return res
      })()
    },
    {
      name: '燃气',
      type: 'bar',
      barWidth: 20, // 柱图宽度
      xAxisIndex: 1,
      data: (function () {
        var res = []
        var len = 10
        while (len--) {
          res.push(Math.round(Math.random() * 1000))
        }
        return res
      })()
    },
    {
      name: '热能',
      type: 'bar',
      itemStyle: {
        normal: {color: '#ffea07'}
      },
      barWidth: 20, // 柱图宽度
      data: (function () {
        var res = []
        var len = 10
        while (len--) {
          res.push(Math.round(Math.random() * 1000))
        }
        return res
      })()
    },
    {
      name: '温度',
      type: 'line',
      yAxisIndex: 1,
      lineStyle: {
        normal: {
          color: '#eec402',
          width: 2
        }
      },
      data: (function () {
        var res = []
        var len = 10
        while (len--) {
          res.push(Math.round(Math.random() * 1000))
        }
        return res
      })()
    },
    {
      name: '湿度',
      type: 'line',
      yAxisIndex: 2,
      lineStyle: {
        normal: {
          color: '#309049',
          width: 2
        }
      },
      data: (function () {
        var res = []
        var len = 10
        while (len--) {
          res.push(Math.round(Math.random() * 1000))
        }
        return res
      })()
    }
  ]
}

// app.count = 11
// setInterval(function () {
//   axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '')
//
//   var data0 = option.series[0].data
//   var data1 = option.series[1].data
//   data0.shift()
//   data0.push(Math.round(Math.random() * 1000))
//   data1.shift()
//   data1.push((Math.random() * 10 + 5).toFixed(1) - 0)
//
//   option.xAxis[0].data.shift()
//   option.xAxis[0].data.push(axisData)
//   option.xAxis[1].data.shift()
//   option.xAxis[1].data.push(app.count++)
//
//   myChart.setOption(option)
// }, 2100000000)
export default option
