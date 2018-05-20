
const option = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  grid: {
    left: '0px',
    top: '0',
    right: '0',
    bottom: '20px',
    containLabel: true
  },
  legend: {
    orient: 'vertical',
    x: 'left',
    data: [{name: '常营华联购物中心', textStyle: {color: '#b3c7df'}},
      {name: '铁建广场', textStyle: {color: '#b3c7df'}},
      {name: '铁建-写字楼', textStyle: {color: '#b3c7df'}},
      {name: '铁建-商场', textStyle: {color: '#b3c7df'}},
      {name: '优服中心', textStyle: {color: '#b3c7df'}},
      {name: '太平洋国际大厦', textStyle: {color: '#b3c7df'}},
      {name: '北京市海淀区北京科技大学天工大厦', textStyle: {color: '#b3c7df'}},
      {name: '城乡贸易', textStyle: {color: '#b3c7df'}}
    ]
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      selectedMode: 'single',
      radius: [0, '30%'],

      label: {
        normal: {
          position: 'inner',
          show: false
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: [
        {value: 300, name: '常营华联购物中心'},
        {value: 300, name: '铁建广场'},
        {value: 300, name: '铁建-写字楼'},
        {value: 300, name: '铁建-商场'},
        {value: 300, name: '优服中心'},
        {value: 300, name: '太平洋国际大厦'},
        {value: 300, name: '北京市海淀区北京科技大学天工大厦'},
        {value: 300, name: '城乡贸易'}
      ]
    },
    {
      name: '访问来源',
      type: 'pie',
      radius: ['40%', '55%'],

      data: [
        {value: 335, name: '常营华联购物中心'},
        {value: 310, name: '铁建广场'},
        {value: 234, name: '铁建-写字楼'},
        {value: 135, name: '铁建-商场'},
        {value: 1048, name: '优服中心'},
        {value: 251, name: '太平洋国际大厦'},
        {value: 147, name: '北京市海淀区北京科技大学天工大厦'},
        {value: 102, name: '城乡贸易'}
      ]
    }
  ]
}
export default option
