/**
 * Created by Administrator on 2017/5/26.
 */
const option = {
  title: {
    text: '',
    subtext: '',
    x: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a}<br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: [{name: '电能', textStyle: {color: '#b3c7df'}},
      {name: '水', textStyle: {color: '#b3c7df'}},
      {name: '燃气', textStyle: {color: '#b3c7df'}},
      {name: '热能', textStyle: {color: '#b3c7df'}}
    ]
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        {
          value: 335,
          name: '电能',
          itemStyle: {
            normal: {color: '#ff7d86'}
          }
        },
        {
          value: 310,
          name: '水',
          itemStyle: {
            normal: {color: '#4ac3ff'}
          }
        },
        {
          value: 234,
          name: '燃气',
          itemStyle: {
            normal: {color: '#c4d4e8'}
          }
        },
        {
          value: 135,
          name: '热能',
          itemStyle: {
            normal: {color: '#ffea07'}
          }
        }
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}
export default option
