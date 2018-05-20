<template>
  <div class="buildBox">
    <div class="analysisBtn">
      <router-link :to="{ path:'/main/splitScreen/analysis'}"><button  class="knob ">自定义统计</button></router-link>
      <router-link :to="{ path:'/main/splitScreen/building'}"><button  class="knob1 ">建筑能效概况</button></router-link>
      <router-link :to="{ path:'/main/splitScreen/buildingStatistics'}"><button  class="knob">建筑能效统计</button></router-link>
      <button  class="monthBtn bj" @click="monthUpdate">月统计</button>
      <button  class="yearBtn bc_btn" @click="yearUpdate">年统计</button>
      <Date-picker :options="date" v-model="year" @on-change="handleChange($event)" type="year" placeholder="选择年" style="width: 150px;float: right"></Date-picker>
    </div>
    <div class="buildMid">
      <div class="buildLeft">
        <div class="lineLeft" ref="lineLeft"></div>
      </div>
      <div class="buildCenter">
        <div class="raderCenter" ref="raderCenter"></div>
      </div>
      <div class="buildRight">
        <div class="pieRight" ref="pieRight"></div>
      </div>
    </div>
    <div class="buildBottom" v-if="monthStatistics">
      时间:<span>{{initYear}}年{{month}}月</span>
      气温:<span>{{returnEnv.tem}}</span>
      湿度:<span>{{returnEnv.hum}}</span>
        <table width="100%" class="add_equipment_table">
          <thead>
          <tr>
            <th width="20%">能源类型</th>
            <th width="10%">能耗量</th>
            <th width="15%">费用</th>
            <th width="10%">占比(费用)</th>
            <th width="15%">费用同比</th>
            <th width="10%">同比增长率</th>
            <th width="10%">费用环比</th>
            <th width="10%">环比增长率</th>
          </tr>
          </thead>
        </table>
        <div class="add_analysis_list">
          <table width="100%" class="add_equipment_table">
            <tbody>
            <tr>
              <td width="20%">电能</td>
              <td width="10%">{{returnEle.energy_consumption}}</td>
              <td width="15%">{{returnEle.money}}</td>
              <td width="10%">{{returnEle.per}}</td>
              <td width="15%">{{returnEle.an_money}}</td>
              <td width="10%">{{returnEle.an}}</td>
              <td width="10%">{{returnEle.mom_money}}</td>
              <td width="10%">{{returnEle.mom}}</td>
            </tr>
            <tr>
              <td width="20%">水能</td>
              <td width="10%">{{returnWat.energy_consumption}}</td>
              <td width="15%">{{returnWat.money}}</td>
              <td width="10%">{{returnWat.per}}</td>
              <td width="15%">{{returnWat.an_monreturnWat}}</td>
              <td width="10%">{{returnWat.an}}</td>
              <td width="10%">{{returnWat.mom_money}}</td>
              <td width="10%">{{returnWat.mom }}</td>
            <tr>
              <td width="20%">燃气</td>
              <td width="10%">{{returnThe.energy_consumption}}</td>
              <td width="15%">{{returnThe.money }}</td>
              <td width="10%">{{returnThe.per }}</td>
              <td width="15%">{{returnThe.an_money }}</td>
              <td width="10%">{{returnThe.an }}</td>
              <td width="10%">{{returnThe.mom_money }}</td>
              <td width="10%">{{returnThe.mom }}</td>
            <tr>
              <td width="20%">热能</td>
              <td width="10%">{{returnGas.energy_consumption}}</td>
              <td width="15%">{{returnGas.money}}</td>
              <td width="10%">{{returnGas.per }}</td>
              <td width="15%">{{returnGas.an_money }}</td>
              <td width="10%">{{returnGas.an }}</td>
              <td width="10%">{{returnGas.mom_money }}</td>
              <td width="10%">{{returnGas.mom}}</td>
            </tr>
            </tbody>
          </table>
        </div>
    </div>
    <div class="buildBottom"  v-if="yearStatistics">
      时间:<span>{{initYear}}年{{month}}月</span>
      气温:<span>{{returnEnv.tem}}</span>
      湿度:<span>{{returnEnv.hum}}</span>
      <table width="100%" class="add_equipment_table">
        <thead>
        <tr>
          <th width="20%">能源类型</th>
          <th width="20%">能耗量</th>
          <th width="15%">费用</th>
          <th width="15%">占比(费用)</th>
          <th width="15%">费用同比</th>
          <th width="15%">环比增长率</th>
        </tr>
        </thead>
      </table>
      <div class="add_analysis_list">
        <table width="100%" class="add_equipment_table">
          <tbody>
          <tr>
            <td width="20%">电能</td>
            <td width="20%">{{returnEle.energy_consumption}}</td>
            <td width="15%">{{returnEle.money}}</td>
            <td width="15%">{{returnEle.per}}</td>
            <td width="15%">{{returnEle.an_money}}</td>
            <td width="15%">{{returnEle.mom}}</td>
          </tr>
          <tr>
            <td width="20%">水能</td>
            <td width="20%">{{returnWat.energy_consumption}}</td>
            <td width="15%">{{returnWat.money}}</td>
            <td width="15%">{{returnWat.per}}</td>
            <td width="15%">{{returnWat.an_money}}</td>
            <td width="15%">{{returnWat.mom }}</td>
          <tr>
            <td width="20%">燃气</td>
            <td width="20%">{{returnThe.energy_consumption}}</td>
            <td width="15%">{{returnThe.money }}</td>
            <td width="15%">{{returnThe.per }}</td>
            <td width="15%">{{returnThe.an_money }}</td>
            <td width="15%">{{returnThe.mom }}</td>
          <tr>
            <td width="20%">热能</td>
            <td width="20%">{{returnGas.energy_consumption}}</td>
            <td width="15%">{{returnGas.money}}</td>
            <td width="15%">{{returnGas.per }}</td>
            <td width="15%">{{returnGas.an_money }}</td>
            <td width="15%">{{returnGas.mom}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
//  import drag from '../comm/commDrag'
  import $ from 'jquery'
  import echarts from 'echarts' // 引入echarts
  import buildingLine from '../modules/analysis/buildingLine' // 引入折线图
  import buildingRadar from '../modules/analysis/buildingRadar' // 引入雷达图
  import buildingPie from '../modules/analysis/buildingPie' // 引入饼状图
  export default {
    name: 'building',
    data () {
      return {
        date: {
          disabledDate (date) {
            return date && date.valueOf() > Date.now()
          }
        },
        monthStatistics: true,
        yearStatistics: false,
        returnBuilding: {},
        returnHum: {},
        returnEle: {},
        returnWat: {},
        returnThe: {},
        returnGas: {},
        returnTem: {},
        returnEnv: {},
        statistics_type: 1,
        year: ''
      }
    },
    mounted () {
//      this.loadDatas()
      this.getBuildData()
    },
    watch: {
      'initYear': function () {
        this.getBuildData()
      },
      'statistics_type': function () {
        this.getBuildData()
      },
      'month': function () {
        this.getStatisticData()
      }
    },
    computed: {
      month: function () {
        var date = new Date()
        var month = date.getMonth() + 1
        return month
      },
      initYear: function () {
        var date = new Date()
        var years = date.getFullYear()
        if (this.year) {
          var selectDate = this.year.getFullYear()
          return selectDate
        } else {
          return years
        }
      }
    },
    components: {},
    methods: {
      yearUpdate () {
        $('.yearBtn').addClass('bj')
        $('.monthBtn').removeClass('bj')
        if ($('.yearBtn').is('.bj')) {
          $('.monthBtn').addClass('bc_btn')
          $('.yearBtn').removeClass('bc_btn')
        }
        this.statistics_type = 2
        this.monthStatistics = false
        this.yearStatistics = true
      },
      monthUpdate () {
        $('.monthBtn').addClass('bj')
        $('.yearBtn').removeClass('bj')
        if ($('.monthBtn').is('.bj')) {
          $('.yearBtn').addClass('bc_btn')
          $('.monthBtn').removeClass('bc_btn')
        }
        this.statistics_type = 1
        this.monthStatistics = true
        this.yearStatistics = false
      },
      handleChange (date) {
        this.year = date
      },
      average (a) {
        var sum = 0
        for (var i = 0; i < a.length; i++) {
          sum += (a[i])
        }
        var avg = (sum / a.length)
        return avg
      },
      loadDatas (data) {
        const _this = this
        var arr1 = []
        for (var key in (data.ele_data)) {
          arr1.push(key)
        }
        buildingLine.xAxis[0].data = arr1
        buildingLine.series[0].data = Object.values(data.ele_data)
        buildingLine.series[1].data = Object.values(data.wat_data)
        buildingLine.series[2].data = Object.values(data.the_data)
        buildingLine.series[3].data = Object.values(data.gas_data)
        buildingLine.series[4].data = Object.values(data.temperature_data)
        buildingLine.series[5].data = Object.values(data.humidity_data)
        var averageEle = Object.values(data.ele_data)
        var averageWat = Object.values(data.wat_data)
        var averageThe = Object.values(data.the_data)
        var averageGas = Object.values(data.gas_data)
        var num1 = _this.average(averageEle)
        var num2 = _this.average(averageWat)
        var num3 = _this.average(averageThe)
        var num4 = _this.average(averageGas)
        buildingRadar.series[0].data[0].value = [num1, num2, num3, num4]
        buildingPie.series[0].data[0].value = num1
        buildingPie.series[0].data[1].value = num2
        buildingPie.series[0].data[2].value = num3
        buildingPie.series[0].data[3].value = num4
        const buildLeft = this.$refs.lineLeft
        const buildCenter = this.$refs.raderCenter
        const buildRight = this.$refs.pieRight
        this.chartLeft = echarts.init(buildLeft)
        this.chartCenter = echarts.init(buildCenter)
        this.chartRight = echarts.init(buildRight)
        this.chartLeft.setOption(buildingLine)
        this.chartCenter.setOption(buildingRadar)
        this.chartRight.setOption(buildingPie)
      },
      /*
        建筑能效概况字段
       */
      getBuildData () {
        const _this = this
        this.axios.get(this.Comm.baseUrl, {
          params: {
            shop_id: this.Comm.shopIds.id,
            module: this.Comm.modules.module2,
            opt: 'energy_efficiency_statistics',
            statistics_type: this.statistics_type,
            year: this.initYear,
            month: this.month
          }
        })
        .then((response) => {
          var result = response.data
          this.returnBuilding = result.data
          this.returnEle = this.returnBuilding.current_data.ele
          this.returnWat = this.returnBuilding.current_data.wat
          this.returnThe = this.returnBuilding.current_data.the
          this.returnGas = this.returnBuilding.current_data.gas
          this.returnEnv = this.returnBuilding.current_data.env
//          this.returnHum = this.returnBuilding.current_data.env.hum
          _this.loadDatas(this.returnBuilding)
        })
      }
    }
  }
</script>
<style scoped>
  .buildBox{
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background: #1b212d;
    padding:20px 10px;
    overflow-y: scroll;
  }
  .buildMid{
    position: absolute;
    top: 80px;
    height: 350px;
    left: 20px;
    right: 20px;
  }
  /*左边部分图表*/
  .buildLeft{
    float: left;
    width: 48%;
    height:100%;
    background: #1F2734;
  }
  .lineLeft{
    width: 100%;
    height:100%;
    padding:20px;
  }
  /*中间部分图表*/
  .buildCenter{
    margin-left: 1%;
    float: left;
    width: 25%;
    height:100%;
    background: #1F2734;
  }
  .raderCenter{
    width: 100%;
    height:100%;
    padding:20px;
  }

  /*右边部分图表*/
  .buildRight{
    margin-left: 1%;
    float: left;
    width: 25%;
    height:100%;
    background: #1F2734;
  }
  .pieRight{
    width: 100%;
    height:100%;
    padding:20px;
  }
  .buildBottom{
    margin-left:10px;
    position: absolute;
    top: 430px;
    left: 20px;
    right: 20px;
    margin-bottom: 20px;
  }
  .buildBottom span{
    color: #f5f5f6;
  }
  .header h3 a{
    color:#b3c6dd;
  }
  .header h3{
    line-height: 45px;
    border-bottom:#314159 solid 1px;
  }
  .analysisBtn{
    height:38px;
    position: absolute;
    left: 20px;
    right: 20px;
    border-bottom: 1px solid #3c4659;
  }
  .yearBtn, .monthBtn{
    line-height:34px;
    padding:0 20px;
    border-radius:5px 5px 5px 5px;
    color:#fff;
    float: right;
    margin-left: 20px;
  }
  .add_analysis_list{
    border:1px solid #3c4659;
  }
  .yearBtn, .monthBtn{
    border:1px solid #63a2ff;
  }
  .bc_btn{
    background-color:#323942;
  }
  .knob1{
    line-height: 36px;
    padding: 0 20px;
    border-radius: 5px 5px 0 0;
    color: #fff;
    background:  #63a2ff;
    margin-right: 20px;
  }
</style>
