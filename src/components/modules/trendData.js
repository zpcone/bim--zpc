//  招标进度（个）
const option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
      type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    },
    textStyle: {
      fontFamily: '微软雅黑',
      fontWeight: 300
    },
    extraCssText: 'height: 3.5rem;line-height: 1.5em;font-size: .6em; padding:0.5rem;'
  },
  legend: {
    show: false,
    data: ['指标', '已完成']
  },
  grid: {
    show: true,
    left: '6%',
    right: '4%',
    bottom: '3%',
    top: '9%',
    containLabel: true,
    borderColor: '#d2d2d4',   // border 颜色
    borderWidth: 1       // border宽度
  },
  xAxis: [
    {
      type: 'category',
      data: ['2014-02-02', '2014-02-02', '2014-02-02', '2014-02-02', '2014-02-02'],
      offset: 5,
      axisLabel: {
        textStyle: {
          color: '#000',
          fontSize: '8',
          marginRight: 10
        }
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      axisLabel: {
        textStyle: {
          color: '#000',
          fontSize: '8',
          marginRight: 10
        }
      },
      offset: 6,
      splitLine: {
        show: true,
        lineStyle: {
          color: ['#d2d2d4'],
          width: 1,
          type: 'solid'
        }
      }
    }
  ],
  series: [
    {
      name: '指标',
      type: 'bar',
      data: [14, 14, 14, 14, 14],
      label: {
        normal: {
          show: true,
          position: 'top',
          offset: [0, -3],
          textStyle: {
            fontSize: 8,
            color: '#fff'
          }
        }
      },
      barWidth: 25 // 柱图宽度
    }
  ],
  color: ['#6552d2']
}
export default option
