const option = {
  title: {
    text: '',
    subtext: ''
  },
  grid: {
    left: '0',
    right: '0',
    bottom: '2%',
    containLabel: true
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['传统物业系统', '智能楼宇运营系统'],
    align: 'left',
    left: 100
  },
  toolbox: {
    show: false,
    feature: {
      dataView: {show: true, readOnly: false},
      magicType: {show: true, type: ['line', 'bar']},
      restore: {show: true},
      saveAsImage: {show: true}
    }
  },
  calculable: true,
  xAxis: [
    {
      type: 'category',
      data: ['解决运营问题能力', '运营投入', '运营收入', '数据真实性', '运营过程透明度', '专业技术含量', '用户体验']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '传统物业系统',
      type: 'bar',
      data: [20, 80, 5, 45, 50, 30, 0],
      markPoint: {
        data: [
          {type: 'max', name: '最大值'},
          {type: 'min', name: '最小值'}
        ]
      },
      markLine: {
        data: [
          {type: 'average', name: '平均值'}
        ]
      }
    },
    {
      name: '智能楼宇运营系统',
      type: 'bar',
      data: [80, 40, 99, 95, 99, 85, 99],
      markPoint: {
        data: [
          {name: '年最高', value: 182.2, xAxis: 7, yAxis: 183},
          {name: '年最低', value: 2.3, xAxis: 11, yAxis: 3}
        ]
      },
      markLine: {
        data: [
          {type: 'average', name: '平均值'}
        ]
      }
    }
  ]
}
export default option
