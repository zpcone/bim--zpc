const option = {
  title: {
    text: '能源雷达图',
    textStyle: {
      color: '#b3c7df',
      fontStyle: 'normal',
      fontWeight: 'bolder',
      fontFamily: 'sans-serif',
      fontSize: 18
    }
  },
  tooltip: {},
  legend: {
    data: []
  },
  radar: {
    indicator: [
      {name: '电能 '},
      {name: '水 '},
      {name: '燃气 '},
      {name: '热能 '}
    ]
  },
  series: [{
    type: 'radar',
    data: [
      {
        // 下边的数据是取得平均值
        value: [4300, 10000, 28000, 35000],
        name: '能源消耗'
      }
    ]
  }]
}
export default option
