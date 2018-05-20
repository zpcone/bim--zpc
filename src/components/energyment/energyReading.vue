<template>
  <div class="readingBox">
    <div class="header">
      <h3>
        <router-link :to="{ path: '/main/splitScreen/calculate'}">
          <Icon type="arrow-return-left" style="color: #62A3FE; font-size: 20px;vertical-align: middle">
          </Icon><span style="color: #62A3FE;margin: 10px;">返回</span>计量表管理</router-link>
        <router-link :to="{ path: '/splitScreen/calculate'}" ><span>> {{retureDeading.energy_type}}</span> </router-link>
        <span>>新建抄表（{{retureDeading.energy_price_type_name}}）</span>
      </h3>
    </div>
<!--下边是单一阶梯的显页面-->
    <div v-show="ladder" class="neck">
      计量表名称：<span>{{retureDeading.meter_name}}</span>
      设备编号：<span>{{retureDeading.code_number}}</span>
      倍率：<span>{{retureDeading.rate}}</span>
    </div>
    <div v-show="ladder" class="nav">
      <div class="basicLadder">
        <p>上期抄表时间：<span>{{retureDeading.last.create_time}}</span></p>
        尖峰指数：<input placeholder="请输入数据"/>
      </div>
      <div class="basicLadder">
        <p>本期值：<span>0.00 Kwh</span></p>
        <p>上期值：<span>：{{retureDeading.total_num}} {{retureDeading.unit}}</span></p>
      </div>
      <div class="basicLadder">
        <p>上期用量：<span>{{retureDeading.last.use_amount}} Kwh</span></p>
        <p>本期用量：<span>0.00 Kwh</span></p>
      </div>
    </div>
<!--下边是谷峰抄表的显示页面-->
    <div v-show="peak" class="neck">
      计量表名称：<span>{{retureDeading.meter_name}}</span>
      设备编号：<span>{{retureDeading.code_number}}</span>
      倍率：<span>{{retureDeading.rate}}</span><br>
      上次抄表时间：<span>{{retureDeading.last.create_time}}</span>
      上期值：<span>{{retureDeading.last.total_num}}</span>
      上期用量：<span>{{retureDeading.last.use_amount}}</span>
      本期示数：<span>无显示</span>
      本期值：<span>无显示</span>
      本期用量：<span>无显示</span>
    </div>
    <div v-show="peak" class="nav">
      <div class="basicPeak">
        尖峰指数：<input placeholder="请输入数据"/>
        <p>本期量：<span>{{retureDeading.last.create_time}}</span></p>
        <p>本期用量：<span>{{retureDeading.last.create_time}}</span></p>
        <p>上期值：<span>{{retureDeading.last.peak_segment_num}}</span></p>
        <p>上期用量：<span>{{retureDeading.last.peak_segment_amount}}</span></p>
      </div>
      <div class="basicPeak">
        峰段指数：<input placeholder="请输入数据"/>
        <p>本期量：<span>{{retureDeading.last.create_time}}</span></p>
        <p>本期用量：<span>{{retureDeading.last.create_time}}</span></p>
        <p>上期值：<span>{{retureDeading.last.peak_period_num}}</span></p>
        <p>上期用量：<span>{{retureDeading.last.peak_period_amount}}</span></p>
      </div>
      <div class="basicPeak">
        平段指数：<input placeholder="请输入数据"/>
        <p>本期量：<span>{{retureDeading.last.create_time}}</span></p>
        <p>本期用量：<span>{{retureDeading.last.create_time}}</span></p>
        <p>上期值：<span>{{retureDeading.last.flat_section_num}}</span></p>
        <p>上期用量：<span>{{retureDeading.last.flat_section_amount}}</span></p>
      </div>
      <div class="basicPeak">
        谷峰指数：<input placeholder="请输入数据"/>
        <p>本期量：<span>{{retureDeading.last.create_time}}</span></p>
        <p>本期用量：<span>{{retureDeading.last.create_time}}</span></p>
        <p>上期值：<span>{{retureDeading.last.valley_section_num}}</span></p>
        <p>上期用量：<span>{{retureDeading.last.valley_section_amount}}</span></p>
      </div>
    </div>
<!--下边是尾部按钮部分-->
    <div class="footer">
      <button class="btn1 bj">保存</button>
      <router-link :to="{ path: '/main/splitScreen/calculate'}"><button class="btn2">取消</button></router-link>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'equipmentDetail',
    data () {
      return {
        id: this.$route.params.id,
        readingData: {},
        peak: false,
        ladder: false
      }
    },
    computed: {
      retureDeading: function () {
        if (this.readingData.energy_type === '1') {
          this.readingData.energy_type = '电能'
        }
        if (this.readingData.energy_type === '2') {
          this.readingData.energy_type = '水能'
        }
        if (this.readingData.energy_type === '3') {
          this.readingData.energy_type = '燃气'
        }
        if (this.readingData.energy_type === '4') {
          this.readingData.energy_type = '热能'
        }
        if (this.readingData.energy_price_type_name === '单一') {
          this.ladder = true
        }
        if (this.readingData.energy_price_type_name === '峰谷') {
          this.peak = true
        }
        if (this.readingData.energy_price_type_name === '阶梯') {
          this.ladder = true
        }
        return this.readingData
      }
    },
    methods: {
      // 获取设备详情
      getDetailDate () {
        this.axios.get(this.Comm.baseUrl, {
          params: {
            shop_id: this.Comm.shopIds.id,
            module: this.Comm.modules.module2,
            opt: 'meter_record_ready',
            id: this.id
          }
        })
          .then((response) => {
            const result = response.data
            this.readingData = result.data[0]
          })
      }
    },
    mounted () {
      this.getDetailDate()
    }
  }
</script>
<style scoped>
  .readingBox{
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background: #1b212d;
    padding:0 20px;
  }
  .header h3 a{
    color:#b3c6dd;
  }
  .header h3{
    line-height: 45px;
    border-bottom:#314159 solid 1px;
  }
  .neck{
    line-height:40px;
    border-bottom:#314159 solid 1px;
  }
  .neck>span{
    margin-right: 20px;
    color: #b3c6dd;
  }
  .nav{
    height:60%;
  }
  .basicLadder>span{
    width: 80px;
    padding: 5px 20px;
    border: 1px solid #314159;
    border-radius: 3px;
    color: white;
  }
  .basicLadder input{
    background-color: #1b222d;
    border:1px solid #314159;
    height:30px;
    border-radius:5px;
    text-indent: 10px;
    color: white;
  }
  .basicPeak input{
    background-color: #1b222d;
    border:1px solid #314159;
    height:30px;
    border-radius:5px;
    text-indent: 10px;
    color: white;
  }
  .basicPeak>span{
    width: 80px;
    padding: 5px 20px;
    border: 1px solid #314159;
    border-radius: 3px;
    color: white;
  }
  .basicPeak p span{
    color: #b3c6dd;
  }
  .basicLadder p span{
    color: #b3c6dd;
  }
  .basicLadder{
    width: 33%;
    height:90%;
    float: left;
    margin-top:20px;
    padding-left:20px;
  }
  .basicPeak{
    width: 25%;
    height:90%;
    float: left;
    margin-top:20px;
    padding-left:20px;
  }
  .basicLadder p {
    line-height:35px;
    margin-bottom: 20px;
  }
  .basicPeak p {
    line-height:15px;
    margin-top: 20px;
  }
  .btn1{
    width:90px;
    height: 32px;
    border-radius: 5px;
    color:white;
    margin-right: 20px;
  }
  .btn2{
    /*border:#21caf1 solid 1px;*/
    width:90px;
    height: 32px;
    background: #2c3441;
    border-radius: 5px;
    color:#ffffff;
  }
  .footer{
    position: relative;
    text-align: center;
    bottom: 0px;
  }
</style>
