<template>
  <div class="containBox">
    <div class="analysisBtn">
      <router-link :to="{ path:'/main/splitScreen/analysis'}">
        <button class="knob ">自定义统计</button>
      </router-link>
      <router-link :to="{ path:'/main/splitScreen/building'}">
        <button class="knob ">建筑能效概况</button>
      </router-link>
      <router-link :to="{ path:'/main/splitScreen/buildingStatistics'}">
        <button class="knob1">建筑能效统计</button>
      </router-link>
      <button class="monthBtn bj" @click="monthUpdate">月统计</button>
      <button class="yearBtn bc_btn" @click="yearUpdate">年统计</button>
      <Date-picker :options="date" v-model="year" @on-change="handleChange($event)" type="year" placeholder="选择年"
                   style="width: 150px;float: right"></Date-picker>
    </div>
    <div class="tree" ref="folderTree">
      <FolderTree :isData="folderTreeData" :left_tree.sync="left_tree"
                  :selectedElementsId="selectedElementsId" :width="folderTreeWidth"
                  :iconClicks="iconClicks"></FolderTree>
      <!--<Tree :data="baseData" style="color: white"></Tree>-->
    </div>
    <div class="buildingRight">
      <div class="statisticsBox">
        <div class="statisticsLeft">
          <div class="lineLeft" ref="lineLeft"></div>
        </div>
        <div class="statisticsRight">
          <div class="pieRight" ref="pieRight"></div>
        </div>
      </div>
      <div class="statisticsTableTop" v-if="monthStat">
        时间:<span>{{initYear}}年{{month}}月</span>
        气温:<span>{{tem}}</span>
        湿度:<span>{{hum}}</span>
        <table width="100%" class="add_equipment_table">
          <thead>
          <tr>
            <th width="10%">层级</th>
            <th width="10%">能耗/金额</th>
            <th width="10%">单位面积能耗/费用</th>
            <th width="10%">同比差值</th>
            <th width="10%">同比增长率</th>
            <th width="10%">环比差值</th>
            <th width="10%">环比增长率</th>
            <th width="10%">预算值</th>
            <th width="10%">预算差值</th>
            <th width="10%">差异率</th>
          </tr>
          </thead>
        </table>
        <div class="add_analysis_list">
          <table width="100%" class="add_equipment_table">
            <tbody>
            <tr>
              <td width="10%" rowspan="2">总数</td>
              <td width="10%">{{rerturnTableData.energy_consumption}}Kwh</td>
              <td width="10%">{{rerturnTableData.energy_consumption_per}}Kwh/㎡</td>
              <td width="10%">{{rerturnTableData.an_energy_consumption * rerturnTableData.an_energy_consumption_per}}
              </td>
              <td width="10%">{{rerturnTableData.an_energy_consumption_per}}</td>
              <td width="10%">
                {{rerturnTableData.mom_energy_consumption * rerturnTableData.mom_energy_consumption_per}}
              </td>
              <td width="10%">{{rerturnTableData.mom_energy_consumption_per}}</td>
              <td width="10%">{{rerturnTableData.budget_consumption}}</td>
              <td width="10%">{{rerturnTableData.budget_consumption_difference}}</td>
              <td width="10%">差异率?</td>
            </tr>
            <tr>
              <td width="10%">{{rerturnTableData.money}}元</td>
              <td width="10%">{{rerturnTableData.money_per}}</td>
              <td width="10%">{{rerturnTableData.an_money * rerturnTableData.an_money_per}}</td>
              <td width="10%">{{rerturnTableData.an_money_per}}</td>
              <td width="10%">{{rerturnTableData.mom_money * rerturnTableData.mom_money_per}}</td>
              <td width="10%">{{rerturnTableData.mom_money_per}}</td>
              <td width="10%">{{rerturnTableData.budget_money}}</td>
              <td width="10%">{{rerturnTableData.budget_money_difference}}</td>
              <td width="10%">差异率?</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="statisticsTableTop" v-if="yearStat">
        时间:<span>{{initYear}}年{{month}}月</span>
        气温:<span>{{tem}}</span>
        湿度:<span>{{hum}}</span>
        <table width="100%" class="add_equipment_table">
          <thead>
          <tr>
            <th width="15%">层级</th>
            <th width="15%">能耗/金额</th>
            <th width="15%">单位面积能耗/费用</th>
            <th width="15%">环比差值</th>
            <th width="10%">环比增长率</th>
            <th width="10%">预算值</th>
            <th width="10%">预算差值</th>
            <th width="10%">差异率</th>
          </tr>
          </thead>
        </table>
        <div class="add_analysis_list">
          <table width="100%" class="add_equipment_table">
            <tbody>
            <tr>
              <td width="15%" rowspan="2">总数</td>
              <td width="15%">{{rerturnTableData.energy_consumption}}Kwh</td>
              <td width="15%">{{rerturnTableData.energy_consumption_per}}Kwh/㎡</td>
              <td width="15%">环比差值</td>
              <td width="10%">{{rerturnTableData.mom_energy_consumption_per}}</td>
              <td width="10%">{{rerturnTableData.budget_consumption}}</td>
              <td width="10%">{{rerturnTableData.budget_consumption_difference}}</td>
              <td width="10%">差异率</td>
            </tr>
            <tr>
              <td width="15%">{{rerturnTableData.money}}元</td>
              <td width="15%">{{rerturnTableData.money_per}}</td>
              <td width="15%">环比差值</td>
              <td width="10%">{{rerturnTableData.mom_money_per}}</td>
              <td width="10%">{{rerturnTableData.budget_money}}</td>
              <td width="10%">{{rerturnTableData.budget_money_difference}}</td>
              <td width="10%">差异率</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="statisticsTableBottom" v-if="monthStat">
        <table width="100%" class="add_equipment_table">
          <thead>
          <tr>
            <th width="15%">层级</th>
            <th width="15%">能耗/金额</th>
            <th width="15%">占比</th>
            <th width="15%">同比差值</th>
            <th width="15%">同比增长率</th>
            <th width="15%">环比差值</th>
            <th width="10%">环比增长率</th>
          </tr>
          </thead>
        </table>
        <div class="add_analysis_list">
          <table width="100%" class="add_equipment_table">
            <tbody v-for="(item,index) in rerturnTableData2">
            <!--<tr v-for="(item,index) in rerturnTableData2">-->
            <!--<td width="15%">层级</td>-->
            <!--<td width="15%">{{item.energy_consumption}}</td>-->
            <!--<td width="15%">{{item.energy_consumption_per}}</td>-->
            <!--<td width="15%">同比差值</td>-->
            <!--<td width="15%">{{item.an_energy_consumption_per}}</td>-->
            <!--<td width="15%">环比差值</td>-->
            <!--<td width="10%">{{item.mom_energy_consumption_per}}</td>-->
            <!--</tr>-->
            <tr>
              <td width="15%" rowspan="2">{{item.name}}</td>
              <td width="15%">{{item.energy_consumption}}</td>
              <td width="15%">{{item.energy_consumption_per}}</td>
              <td width="15%">{{item.an_money_per * item.an_energy_consumption}}</td>
              <td width="15%">{{item.an_energy_consumption_per}}</td>
              <td width="15%">{{item.mom_energy_consumption * item.mom_money_per}}</td>
              <td width="10%">{{item.mom_energy_consumption_per}}</td>
            </tr>
            <tr>
              <td width="15%">{{item.money}}</td>
              <td width="15%">{{item.money_per}}</td>
              <td width="15%">{{item.an_money * item.an_money_per}}</td>
              <td width="15%">{{item.an_money_per}}</td>
              <td width="15%">{{item.mom_money * item.mom_money_per}}</td>
              <td width="10%">{{item.mom_money_per}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="statisticsTableBottom" v-if="yearStat">
        <table width="100%" class="add_equipment_table">
          <thead>
          <tr>
            <th width="15%">层级</th>
            <th width="15%">能耗/金额</th>
            <th width="15%">占比</th>
            <th width="15%">环比差值</th>
            <th width="10%">环比增长率</th>
          </tr>
          </thead>
        </table>
        <div class="add_analysis_list">
          <table width="100%" class="add_equipment_table">
            <tbody v-for="(item,index) in rerturnTableData2">
            <tr>
              <td width="20%" rowspan="2">{{item.name}}</td>
              <td width="20%">{{item.energy_consumption}}</td>
              <td width="20%">{{item.energy_consumption_per}}</td>
              <td width="20%">{{item.mom_energy_consumption * item.mom_money_per}}</td>
              <td width="20%">{{item.mom_energy_consumption_per}}</td>
            </tr>
            <tr>
              <td width="20%">{{item.money}}</td>
              <td width="20%">{{item.money_per}}</td>
              <td width="20%">{{item.mom_money * item.mom_money_per}}</td>
              <td width="20%">{{item.mom_money_per}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  //  import buildTopStatistics from '../comm/commBuildTopStatistics' // 引入建筑能效头部公用组件
  import $ from 'jquery'
  import echarts from 'echarts' // 引入echarts
  import FolderTree from '../model/folderTree' // 引入柱状图
  import statisticsCol from '../modules/statisticsCol' // 引入柱状图
  import statisticsPie from '../modules/statisticsPie' // 引入折线图
  export default {
    data () {
      return {
        date: {
          disabledDate (date) {
            return date && date.valueOf() > Date.now()
          }
        },
        folderTreeWidth: '',
        left_tree: 0,
//        analysisArr: new Array(4),
        baseData: [{
          expand: true,
          title: '<span style="color: #7ea5f2;">电能</span>',
          children: [{
            title: '<span id="tree" style="color: #7ea5f2">知春路-海淀黄庄</span>',
            expand: true,
            children: [{
              title: '<span style="color: #7ea5f2;">太平洋国际大厦</span>',
              disableCheckbox: true
            }, {
              title: '<span style="color: #7ea5f2">地下三层</span>'
            }, {
              title: '<span style="color:  #7ea5f2">地下二层</span>'
            }, {
              title: '<span style="color:  #7ea5f2">地下一层</span>'
            }, {
              title: '<span style="color:  #7ea5f2">一层</span>'
            }, {
              title: '<span style="color:  #7ea5f2">二层</span>'
            }]
          }]
        }],
        monthStat: true,
        yearStat: false,
//        保存层级数据
        levelOne: [],
        levelTwoEle: [],
        levelTwoWat: [],
        levelTwoRan: [],
        levelTwoHot: [],
//        ---------
        levelThree: [],
        levelFor: [],
        levelFiv: [],
        returnStatistics: {}, // 保存后台返回数据
        rerturnTableData: {}, // 保存最下边图表的数据
        rerturnTableData2: [], // 层级图标的数据
        returnStratum: {}, // 保存层级数据
        tem: '',
        hum: '',
        year: '',
        statistics_type: 1,
        ppath: 1
      }
    },
    computed: {
//  动态添加后台获取的数据，加入树形结构配置
      folderTreeData: function () {
        var sum = []
        var childOne = []
        var childTwo = []
        for (var k = 0; k < this.levelThree.length; k++) {
          var objTwo = {}
          objTwo.name = this.levelThree[k].name
          objTwo.type = 0
          objTwo.id = 0
          childTwo.push(objTwo)
        }
        for (var j = 0; j < this.levelTwoEle.length; j++) {
          var objOne = {}
          objOne.name = this.levelTwoEle[j].name
          objOne.type = 0
          objOne.id = 0
          objOne.child = childTwo
          childOne.push(objOne)
        }
        for (var i = 0; i < this.levelOne.length; i++) {
          var obj = {}
          obj.name = this.levelOne[i].name
          obj.type = 0
          obj.id = 0
          obj.child = childOne
          sum.push(obj)
        }
        return sum
      },
      month: function () {
        var date = new Date()
        var month = date.getMonth() + 1
        return month
      },
      initYear: function () {
        var date = new Date()
        var years = date.getFullYear()
        if (this.year) {
          return this.year
        } else {
          return years
        }
      }
    },
    components: {FolderTree},
    mounted () {
      this.getStatisticData()
      this.getsStratum()
    },
    watch: {
      'initYear': function () {
        this.getStatisticData()
      },
      'statistics_type': function () {
        this.getStatisticData()
      },
      'month': function () {
        this.getStatisticData()
      },
      'ppath': function () {
        this.getStatisticData()
      }
    },
    methods: {
      iconClicks () {
        let divWidth = this.$refs.folderTree.scrollWidth
        this.folderTreeWidth = divWidth
      },
      monthUpdate () {
        $('.monthBtn').addClass('bj')
        $('.yearBtn').removeClass('bj')
        if ($('.monthBtn').is('.bj')) {
          $('.yearBtn').addClass('bc_btn')
          $('.monthBtn').removeClass('bc_btn')
        }
        this.statistics_type = 1
        this.monthStat = true
        this.yearStat = false
      },
      yearUpdate () {
        $('.yearBtn').addClass('bj')
        $('.monthBtn').removeClass('bj')
        if ($('.yearBtn').is('.bj')) {
          $('.monthBtn').addClass('bc_btn')
          $('.yearBtn').removeClass('bc_btn')
        }
        this.statistics_type = 2
        this.monthStat = false
        this.yearStat = true
      },
      handleChange (date) {
        this.year = date
      },
//   获取建筑能效统计字段
      getStatisticData () {
        const _this = this
        this.axios.get(this.Comm.baseUrl, {
          params: {
            shop_id: this.Comm.shopIds.id,
            module: this.Comm.modules.module2,
            opt: 'efficiency_statistics',
            statistics_type: this.statistics_type,
            year: this.initYear,
            month: this.month,
            ppath: this.ppath
          }
        })
          .then((response) => {
            var result = response.data
            this.returnStatistics = result.data
            this.rerturnTableData = result.data.current_data.total
            this.rerturnTableData2 = result.data.current_data.lists
            this.tem = this.returnStatistics.current_data.env.tem
            this.hum = this.returnStatistics.current_data.env.hum
            this.baseData[0].children[0].title = this.rerturnTableData2[0].name
            _this.loadDatas(this.returnStatistics)
          })
      },
//   获取建筑 层级 字段
      getsStratum () {
        this.axios.get(this.Comm.baseUrl, {
          params: {
            shop_id: this.Comm.shopIds.id,
            module: this.Comm.modules.module2,
            opt: 'energy_level'
          }
        })
          .then((response) => {
            var result = response.data
            this.returnStratum = result.data  // 保存层级数据
            for (var i = 0; i < this.returnStratum.length; i++) {
              if (this.returnStratum[i].level === 1) { // 保存水电燃热-1层级
                this.levelOne.push(this.returnStratum[i])
              }
              if (this.returnStratum[i].level === 2 && this.returnStratum[i].pId === 1) { // 保存电能的子层级
                this.levelTwoEle.push(this.returnStratum[i])
              }
              if (this.returnStratum[i].level === 2 && this.returnStratum[i].pId === 2) { // 水能子层级
                this.levelTwoWat.push(this.returnStratum[i])
              }
              if (this.returnStratum[i].level === 2 && this.returnStratum[i].pId === 3) { // 燃气子层级
                this.levelTwoRan.push(this.returnStratum[i])
              }
              if (this.returnStratum[i].level === 2 && this.returnStratum[i].pId === 4) { // 热能子层级
                this.levelTwoHot.push(this.returnStratum[i])
              }
              if (this.returnStratum[i].level === 3 && this.returnStratum[i].pId.indexOf(0) === 1) {
                this.levelThree.push(this.returnStratum[i])
              }
              console.log(this.levelThree)
              if (this.returnStratum[i].level === 4) {
                this.levelFor.push(this.returnStratum[i])
              }
              if (this.returnStratum[i].level === 5) {
                this.levelFiv.push(this.returnStratum[i])
              }
            }
            console.log(this.levelOne)
            console.log(this.levelTwo)
          })
      },
//   加载图表数据
      loadDatas (data) {
        var arr1 = []
        for (var key in (data.consumption_data)) {
          arr1.push(key)
        }
        statisticsCol.xAxis[0].data = arr1
        statisticsCol.series[0].data = Object.values(data.consumption_data)
        statisticsCol.series[1].data = Object.values(data.energy_budget_data)
        statisticsCol.series[2].data = Object.values(data.money_data)
        statisticsCol.series[3].data = Object.values(data.money_budget_data)
        statisticsCol.series[4].data = Object.values(data.temperature_data)
        statisticsCol.series[5].data = Object.values(data.humidity_data)
//        下边是右侧图表的数据
        var rightE = data.current_data.lists
        var arrOuter = [] // 饼状图外层-费用统计的数据
        var arrInner = [] // 饼状图内层-能量用量统计的数据
        for (var i = 0; i < rightE.length; i++) {
          var objOuter = {}
          objOuter.name = rightE[i].name
          objOuter.value = rightE[i].money
          arrOuter.push(objOuter)
        }
        for (var k = 0; k < rightE.length; k++) {
          var objInner = {}
          objInner.name = rightE[k].name
          objInner.value = rightE[k].energy_consumption
          arrInner.push(objInner)
        }
        statisticsPie.series[0].data = arrInner
        statisticsPie.series[1].data = arrOuter
        const buildLeft = this.$refs.lineLeft
        const buildCenter = this.$refs.pieRight
        this.chartLeft = echarts.init(buildLeft)
        this.chartCenter = echarts.init(buildCenter)
        this.chartLeft.setOption(statisticsCol)
        this.chartCenter.setOption(statisticsPie)
      }
    }
  }
</script>
<style scoped>
  .containBox {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #1b212d;
    padding: 0 20px;
    overflow-y: scroll;
  }

  .statisticsBox {
    position: absolute;
    left: 10px;
    right: 10px;
    height: 700px;
    top: 10px;
    margin-top: 10px;
  }

  #ivu-tree-title :hover {
    background-color: #1b212d;
  }

  /*左边图表的样式*/
  .statisticsLeft {
    margin-right:10px;
    float: left;
    width: calc(60% - 10px);
    height: 350px;
    background: #1F2734;
  }

  .lineLeft {
    width: 100%;
    height: 100%;
    padding: 20px;
  }

  /*右边图表的样式*/
  .statisticsRight {
    /*margin-left: 20px;*/
    float: left;
    width: 40%;
    height: 350px;
    background: #1F2734;
  }

  .pieRight {
    padding: 20px;
    width: 100%;
    height: 100%;
  }

  /*下边是table的样式*/
  .statisticsTableTop {
    position: absolute;
    top: 390px;
    left: 20px;
    right: 20px;
    /*height:10%;*/
    /*border:1px solid gray;*/
  }

  .statisticsTableTop span {
    color: #f5f5f6;
  }

  .add_analysis_list table {
    border: 1px solid #3c4659;
  }

  .add_analysis_list th {
    border: 1px solid #3c4659;
  }

  .add_analysis_list td {
    border: 1px solid #3c4659;
  }
  .statisticsTableBottom {
    position: absolute;
    margin-bottom: 20px;
    top: 530px;
    left: 20px;
    right: 20px;
  }
  .tree {
    padding: 10px 0;
    overflow: auto;
    color: white;
    width: 200px;
    position: absolute;
    top: 57px;
    bottom: 0;
    background-color: #1b222d;
  }

  /*.buildingLeft{*/
  /*position: absolute;*/
  /*top:57px;*/
  /*width: 200px;*/
  /*bottom:0;*/
  /*background-color: #1b222d;*/
  /*}*/
  .buildingRight {
    position: absolute;
    top: 57px;
    left: 220px;
    right: 20px;
    bottom: 20px;
  }

  .analysisBtn {
    position: relative;
    height: 57px;
    border-bottom: 1px solid gray;
    padding-top: 20px;
  }

  .yearBtn, .monthBtn {
    border: 1px solid #63a2ff;
    line-height: 32px;
    padding: 0 20px;
    border-radius: 5px 5px 5px 5px;
    color: #fff;
    float: right;
    margin-left: 20px;
  }

  .bc_btn {
    background-color: #323942;
  }

  .knob1 {
    line-height: 32px;
    padding: 0 20px;
    border-radius: 5px 5px 0 0;
    color: #fff;
    background: #63a2ff;
    margin-right: 20px;
  }

  .add_equipment_table tbody tr td:first-child {
    padding-left: 0 !important;
  }

</style>
