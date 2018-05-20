<template>
  <div class="clearfix">
    <div class="gauges">
      <div class="gaugeBox" @click='getBarData(1)'>
        <div class="gauge"  ref="gauge1"></div>
      </div>
      <div class="gaugeBox" @click='getBarData(2)'>
        <div class="gauge"  ref="gauge2"></div>
      </div>
      <div class="gaugeBox" @click='getBarData(3)'>
        <div class="gauge"  ref="gauge3"></div>
      </div>
       <div class="gaugeBox" @click='getBarData(4)'>
        <div class="gauge"  ref="gauge4"></div>
      </div>
    </div>
    <div class="barBox" v-if='showBar'>
      <div class="bar"  ref="bar"></div>
      <button class='btn_square btn_dark1' @click="closeBar">取 消</button>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import gauge from './../modules/gaugeData.js'
  import colAndLine from './../modules/colAndLineData.js'

  export default {
    data () {
      return {
        id: this.$route.params.id,
        returnData: [],
        gaugeData1: {},
        gaugeData2: {},
        gaugeData3: {},
        gaugeData4: {},
        barData: null,
        showBar: false
      }
    },
    mounted () {
      this.getChartData()
      let _this = this
      window.onresize = function () {
        _this.loadGauges()
      }
    },
    methods: {
      getChartData () {
        this.axios.get(this.Comm.baseUrl, {
          params: {
            shop_id: this.Comm.shopIds.id,
            module: this.Comm.modules.module2,
            opt: 'meter_record_lists',
            id: '53',  // 53有数据
            startTime: '',
            endTime: ''
          }
        })
        .then((response) => {
          this.returnData = response.data.data
          // 仪表
          this.gaugeData1 = JSON.parse(JSON.stringify(gauge))
          this.gaugeData2 = JSON.parse(JSON.stringify(gauge))
          this.gaugeData3 = JSON.parse(JSON.stringify(gauge))
          this.gaugeData4 = JSON.parse(JSON.stringify(gauge))
          this.gaugeData1.series[0].data[0].value = this.returnData[0].lists[0].total_num / 1000
          this.gaugeData1.series[0].data[0].name = '表总数'
          this.gaugeData1.series[0].name = '表总数'
          this.gaugeData1.series[0].detail.formatter = '{value}*10³Kwh'
          this.gaugeData1.series[0].splitNumber = 9
          this.gaugeData1.series[0].min = 0
          this.gaugeData1.series[0].max = 9
          this.gaugeData2.series[0].data[0].value = this.returnData[0].lists[0].temperature
          this.gaugeData2.series[0].data[0].name = '气温'
          this.gaugeData2.series[0].name = '气温'
          this.gaugeData2.series[0].detail.formatter = '{value}℃'
          this.gaugeData2.series[0].splitNumber = 10
          this.gaugeData2.series[0].min = -50
          this.gaugeData2.series[0].max = 50
          this.gaugeData3.series[0].data[0].value = this.returnData[0].lists[0].humidity
          this.gaugeData3.series[0].data[0].name = '湿度'
          this.gaugeData3.series[0].name = '湿度'
          this.gaugeData3.series[0].detail.formatter = '{value}%'
          this.gaugeData3.series[0].splitNumber = 10
          this.gaugeData3.series[0].min = 0
          this.gaugeData3.series[0].max = 100
          this.gaugeData4.series[0].data[0].value = this.returnData[0].lists[0].wind_force
          this.gaugeData4.series[0].data[0].name = '风力'
          this.gaugeData4.series[0].name = '风力'
          this.gaugeData4.series[0].detail.formatter = '{value}级'
          this.gaugeData4.series[0].splitNumber = 12
          this.gaugeData4.series[0].min = 0
          this.gaugeData4.series[0].max = 12
          this.loadGauges()
          this.getBarData(1)
        })
      },
      getBarData (type) {
        if (!this.barData) {
          this.barData = JSON.parse(JSON.stringify(colAndLine))
        } else {
          this.barData.xAxis[0].data = []
          this.barData.series[0].data = []
          const _this = this
          var reverseData = this.returnData[0].lists.reverse()
          reverseData.forEach(function (el, index) {
            var createTime = new Date(el.create_time * 1000).toISOString()
            _this.barData.xAxis[0].data.push(createTime.slice(2, 10) + '\n' + createTime.slice(11, 16))
            if (type === 1) {
              // _this.barData.legend.data[0] = '表总数'
              // _this.barData.series[0].name = '表总数'
              // _this.barData.title.text = '表总数'
              _this.barData.series[0].data.push(el.total_num / 1000)
              _this.barData.yAxis[0].min = 0
              _this.barData.yAxis[0].max = 9
              _this.barData.yAxis[0].interval = 3
              _this.barData.yAxis[0].name = '*10³Kwh'
            } else if (type === 2) {
              // _this.barData.legend.data[0] = '温度'
              // _this.barData.series[0].name = '温度'
              _this.barData.series[0].data.push(el.temperature)
              _this.barData.yAxis[0].data = [-50, -40, -20, 0, 20, 40, 50]
              _this.barData.yAxis[0].min = -50
              _this.barData.yAxis[0].max = 50
              _this.barData.yAxis[0].interval = 20
              _this.barData.yAxis[0].name = '℃'
            } else if (type === 3) {
              // _this.barData.legend.data[0] = '湿度'
              // _this.barData.series[0].name = '湿度'
              _this.barData.series[0].data.push(el.humidity)
              _this.barData.yAxis[0].min = 0
              _this.barData.yAxis[0].max = 100
              _this.barData.yAxis[0].interval = 20
              _this.barData.yAxis[0].name = '%'
            } else if (type === 4) {
              // _this.barData.legend.data[0] = '风力'
              // _this.barData.series[0].name = '风力'
              _this.barData.series[0].data.push(el.wind_force)
              _this.barData.yAxis[0].min = 0
              _this.barData.yAxis[0].max = 12
              _this.barData.yAxis[0].interval = 3
              _this.barData.yAxis[0].name = '级'
            }
          })
          this.loadBar()
        }
      },
      loadGauges () {
        const gauge1 = this.$refs.gauge1
        this.chart = echarts.init(gauge1)
        this.chart.setOption(this.gaugeData1)
        const gauge2 = this.$refs.gauge2
        this.chart = echarts.init(gauge2)
        this.chart.setOption(this.gaugeData2)
        const gauge3 = this.$refs.gauge3
        this.chart = echarts.init(gauge3)
        this.chart.setOption(this.gaugeData3)
        const gauge4 = this.$refs.gauge4
        this.chart = echarts.init(gauge4)
        this.chart.setOption(this.gaugeData4)
      },
      loadBar () {
        this.showBar = true
        this.$nextTick(() => {
          const bar = this.$refs.bar
          this.chart = echarts.init(bar)
          this.chart.setOption(this.barData)
        })
      },
      closeBar () {
        this.showBar = false
      }
    }
  }
</script>

<style scoped>
  .gauges{
    width: 50%;
    height: 100%;
    float: left;
  }
  .gaugeBox{
    width: 50%;
    height: 50%;
    float: left;
    box-sizing: border-box;
    padding: 5px;
  }
  .barBox{
    float: right;
    width: 50%;
    height: 100%;
    padding: 10px;
    overflow: hidden;
    text-align: center;
  }
  .gauge{
    width: 100%;
    height: 100%;
  }
  .bar{
    width: 100%;
    height: calc(100% - 36px);
  }
</style>
