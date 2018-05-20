const option = {
  title: {
    text: '查看设备运行参数趋势',
    textStyle: {
      fontSize: 13,
      fontWeight: 'normal'
    }
  },
  tooltip: {
    trigger: 'axis'
  },
  toolbox: {
    feature: {
      dataView: {
        show: false,
        readOnly: false
      },
      magicType: {
        show: true,
        type: ['line', 'bar']
      },
      restore: {
        show: false
      },
      saveAsImage: {
        show: false
      }
    },
    right: 25
  },
  legend: {
    show: false,
    data: []
  },
  xAxis: [{
    type: 'category',
    data: [],
    axisPointer: {
      type: 'shadow'
    }
  }],
  yAxis: [{
    type: 'value',
    name: '水量',
    min: 0,
    max: 100,
    interval: 50,
    axisLabel: {
      formatter: '{value}'
    }
    // axisTick: {
    //   alignWithLabel: true
    // }
  }],
  series: [{
    name: '',
    type: 'bar',
    data: []
  }]
}

export default option
