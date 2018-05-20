<template>
    <div class="analysisWrap">
      <div class="analysisBtn">
        <router-link :to="{ path:'/main/splitScreen/analysis'}"><button  class="knob knob1" activeClass="active">自定义统计</button></router-link>
        <router-link :to="{ path:'/main/splitScreen/building'}"><button  class="knob" activeClass="active">建筑能效概况</button></router-link>
        <router-link :to="{ path:'/main/splitScreen/buildingStatistics'}"><button  class="knob" activeClass="active">建筑能效统计</button></router-link>
      </div>
      <div class="leftBtn"></div>
      <div class="analysisTop">
          <div class="wrapper">
            <div class="container">
              <ul class="banner" >
                <li id="jd001" @click="idUpdate(item)" v-for="(item, index) in listData">
                  <div class="bannerW">
                    <span>{{item.name}}</span>
                    <div class="bannerW_top">
                      <span>昨日 {{item.num_prev}} Kwh</span><br>
                      <span>{{item.an_desc}}</span><br>
                      <span>{{item.mom_desc}}</span>
                    </div>
                    <div class="bannerW_bottom">
                      <span>今日 0 Kwh</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        <ul class="thumbnail">
          <Page :total="num * 2" @on-change="handleChange" show-elevator></Page>
        </ul>
      </div>
      <div class="rightBtn"></div>
      <div class="analysisMid">
          <div class="leftBox" id="main">
            <div class="diagramLeft"  ref="diagramBoxLeft"></div>
          </div>
          <div class="rightBox">
            <div class="diagramRight"  ref="diagramBoxRight"></div>
          </div>
      </div>
      <div class="analysisBottom">
          <table width="100%" class="add_equipment_table">
            <thead>
            <tr>
              <th width="20%">时间</th>
              <th width="10%">用量（Kwh)</th>
              <th width="15%">环比差（Kwh)</th>
              <th width="10%">环比</th>
              <th width="15%">同比差（Kwh)</th>
              <th width="10%">同比</th>
              <th width="10%">气温（℃）</th>
              <th width="10%">湿度（%）</th>
            </tr>
            </thead>
          </table>
          <div class="add_analysis_list">
            <table width="100%" class="add_equipment_table">
              <tbody>
              <tr  v-for="">
                <td width="20%">{{currentData.date}}</td>
                <td width="10%">{{currentData.num_self}}</td>
                <td width="15%">{{currentData.mom	}}</td>
                <td width="10%">{{currentData.mom_per}}</td>
                <td width="15%">{{currentData.an}}</td>
                <td width="10%">{{currentData.an_per}}</td>
                <td width="10%">{{currentData.temperature}}</td>
                <td width="10%">{{currentData.humidity}}</td>
              </tr>
              </tbody>
            </table>
          </div>
      </div>
    </div>
</template>

<script>
//  import $ from 'jquery'
  import echarts from 'echarts' // 引入echarts
//  import banner from '../comm/commBanner' // 引入轮播图组件
  import analysisData from '../modules/analysis/analysisData' // 引入折线图
  import stackData from '../modules/analysis/stackData' // 引入折线图
  export default {
    name: 'analysis',
    data () {
      return {
//        analysisArr: new Array(5),
        returnAnalysis: {},  // 后台返回数据
        currentData: {}, // 底部表格数据
        listData: [], // 保存顶部li中的数据
        num: '',
        page: 1,
        id: ''
      }
    },
//    computed: {
//      id: function () {
//        return (this.listData[0].id)
//      }
//    },
    components: {
    },
    watch: {
      'page': function () {
        this.getSearchType()
        this.id = this.listData[0].id
      },
      'id': function () {
        this.getSearchType()
      }
    },
    mounted () {
      this.getSearchType()
    },
    methods: {
      idUpdate (item) {
        this.id = item.id
      },
      handleChange (date) { // 获取页数
        this.page = date
      },
//      scaleUp () {
//        this.classA = false
//      },
//      scaleDown () {
//        this.classA = true
//      },
      /*
       * 自定义能效统计字段
       */
      getSearchType () {
        const _this = this
        this.axios.get(this.Comm.baseUrl, {
          params: {
            shop_id: this.Comm.shopIds.id,
            module: this.Comm.modules.module2,
            opt: 'efficiency_statistics_custom',
            page: this.page,
            pagesize: '5',
            id: this.id, // 默认为列表中的第一个
            current_date: '' // 默认为列表中的第一天
          }
        })
          .then((response) => {
            var result = response.data
            this.returnAnalysis = result.data
            this.num = result.total_number
            this.currentData = this.returnAnalysis.current_data
            this.listData = this.returnAnalysis.diy_lists
            console.log(this.returnAnalysis)
            _this.loadDatas(this.returnAnalysis.diy_detail)
          })
      },
      loadDatas (data) {
        var arr1 = []
        for (var key in (data.num)) {
          arr1.push(key)
        }
        stackData.series[0].data = Object.values(data.num)
        stackData.series[1].data = Object.values(data.temperature)
        stackData.series[2].data = Object.values(data.humidity)
        stackData.xAxis[0].data = arr1
        analysisData.series[0].data = Object.values(data.num)
        analysisData.series[1].data = Object.values(data.temperature)
        analysisData.series[2].data = Object.values(data.humidity)
        analysisData.xAxis.data = arr1
        const boxLeft = this.$refs.diagramBoxLeft
        const boxRight = this.$refs.diagramBoxRight
        this.chartLeft = echarts.init(boxLeft)
        this.chartRight = echarts.init(boxRight)
        this.chartLeft.setOption(analysisData)
        this.chartRight.setOption(stackData)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*.iconZoom{*/
    /*position:absolute;*/
    /*right:0;*/
    /*top: 10px;*/
    /*color: #4F4E51;*/
  /*}*/
  .leftBox{
    float: left;
    width: 50%;
    height:100%;
    background: #1F2734;
  }
  .rightBox{
    margin-left: 20px;
    float: left;
    width: calc(50% - 20px);
    height:100%;
    background: #1F2734;
  }
  .diagramLeft{
    width: 100%;
    height:100%;
    padding:20px;
  }
  .diagramRight{
    width: 100%;
    height:100%;
    padding:20px;
  }
  .analysisWrap{
    position: absolute;
    background: #1b222d;
    top:0;
    left:20px;
    right:20px;
    bottom: 10px;
    /*overflow-y: scroll;*/
  }
  .analysisBtn{
    height:57px;
    border-bottom: 1px solid gray;
    padding-top: 20px;
  }
  .analysisTop {
    width: calc(100% - 120px);
    height: 350px;
    margin:0 10px;
    border-bottom: 1px solid gray;
    float: left;
  }
  .analysisMid{
    position: absolute;
    top:420px;
    left:10px;
    right:10px;
    margin:10px;
    height:400px;
  }
  .analysisBottom{
    position: absolute;
    top:850px;
    left:20px;
    right:20px;
    margin-bottom:20px;
    border:1px solid #31415a;
  }
  .leftBtn, .rightBtn{
    margin:0 3px;
    width: 40px;
    height: 250px;
    background-color: #323942;
    margin-top: 20px;
    border: 1px solid gray;
    border-radius: 5px;
    float: left;
  }
  .leftBtn:hover{
    background-color: #314159;
  }
  .rightBtn:hover {
    background-color: #314159;
  }
  .analysisBanner {
    /*c3计算宽度*/
    width: 100%;
    margin: 0 auto;
    height: 280px;
    float: left;
  }
  .knob1{
    background: #63a2ff;
  }
  /*下边是子组件的样式*/
  .wrapper{
    position: relative;
    width:100%;
    height:300px;
    overflow: hidden;
  }
  .container{
    position: absolute;
    left:0;
    right:0;
    width: 400%;
    height:100%;
  }
  .wrapper .banner{
    float: left;
    /*margin:0 20px;*/
    width: 100%;
    height:100%;
  }
  /*.wrapper .thumbnail{*/
  /*margin:0 10%;*/
  /*width: 80%;*/
  /*height:20%;*/
  /*margin:0 auto;*/
  /*!*background-color: gray;*!*/
  /*}*/
  .thumbnail{

  }
  .wrapper .banner li{
    float: left;
    width: 4.5%;
    height:100%;
    margin:0 0.25%;
  }
  /*下边是二级子组件得数据*/
  .bannerW{
    margin-top: 10%;
    width: 100%;
    height:80%;
    background:#1b222d ;
    border:2px solid gray;
    border-radius: 10px;
    color: #b4c6dc;
  }
  .bannerW:hover{
    background: #31415a;
    color: white;
  }
  .bannerW>span{
    display: block;
    text-indent: 20px;
    margin-top: 5px;
  }
  .bannerW_top{
    height:50%;
    border:1px solid gray;
    border-radius: 5px;
    margin:10px 5px ;
    background-color:#1b222d ;
    vertical-align: middle;
    text-align: center;
    padding:10px;
  }
  .bannerW_bottom{
    height:20%;
    border:1px solid gray;
    border-radius: 5px;
    margin:10px 5px ;
    background-color:#1b222d ;
    text-align: center;
    padding:10px;
  }
</style>
