const option = {
  tooltip: {
    formatter: '{a} <br/>{b} : {c}'
  },
  toolbox: {
    feature: {
      dataView: {show: false, readOnly: false},
      saveAsImage: {show: false}
    }
  },
  series: [{
    name: '抄表记录',
    type: 'gauge',
    detail: {   // 数字
      formatter: '{value}',
      textStyle: {
        fontSize: 5,
        fontWeight: 'bold',
        color: '#333'
      },
      offsetCenter: [0, '35%']
    },
    data: [{
      value: 50,
      name: ''
    }],
    title: {   // 文字
      textStyle: {
        fontSize: 12,
        color: '#000'
      }
    },
    radius: '95%',
    splitNumber: 4,
    axisLine: {             // 坐标轴
      lineStyle: {
        color: [[0.09, 'lime'], [0.82, '#1e90ff'], [1, '#ff4500']],
        width: 3,
        shadowColor: '#fff',
        shadowBlur: 10
      }
    },
    axisLabel: {            // 坐标轴小标记
      textStyle: {
        fontSize: '5%',
        // fontWeight: 'bolder',
        color: '#666',
        shadowColor: '#fff',
        shadowBlur: 10
      },
      distance: 0
    },
    splitLine: {           // 分隔线
      length: 9,
      lineStyle: {
        width: 3,
        color: '#777',
        shadowColor: '#fff',
        shadowBlur: 10
      }
    },
    startAngle: 230,
    endAngle: -50,
    pointer: {             // 指针
      width: 3,
      shadowColor: '#fff',
      shadowBlur: 5
    }
  }]
}

export default option
