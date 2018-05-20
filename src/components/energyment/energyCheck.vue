<template>
  <div class="checkBox">
    <div class="header">
      <span>
        <router-link :to="{ path: '/main/splitScreen/calculate'}">
          <Icon type="arrow-return-left" style="color: #62A3FE; font-size: 20px;vertical-align: middle">
          </Icon><span style="color: #62A3FE;margin: 10px;">返回</span>计量表管理</router-link>
        <span>> {{retureData.energy_type}}</span> <span>> 查看基本信息</span>
      </span>
      <!--<router-link :to="{ path: '/splitScreen/calculate'}"><button class="backbtn bj">返回列表</button></router-link>-->
      <button class="writebtn">编辑</button>
    </div>
    <div class="nav">
      <div class="basic">
        <p>计量表基本信息</p>
        计量表名称：<span>{{retureData.meter_name}}</span><br>
        设备编号：<span>{{retureData.code_number}}</span><br>
        倍率：<span>{{retureData.rate}}</span><br>
        设备名称：<span>{{retureData.device_name}}</span><br>
        设备状态：<span>{{retureData.state_name}}</span><br>
        安装位置：<span>{{retureData.place_name}}</span><br>
        服务区域：<span>{{retureData.desc}}</span>
      </div>
      <div class="basic">
        <p>计量表抄表信息</p>
        抄表方式：<span>{{retureData.check_type_name}}</span><br>
        抄表条件：<span>{{retureData.meter_condition_name}}</span>
      </div>
      <!--计价类型为谷峰时显示列表-->
      <div class="basic" v-if="peak">
        <p>计量表计价信息</p>
        计价方案号：<span>{{retureData.energy_price_code}}</span><br>
        计价方案名称：<span>{{retureData.energy_price_name}}</span><br>
        付费方式：<span>{{retureData.prepayment}}</span>
      </div>
      <div class="basic" v-if="peak">
        <p>价格结构</p>
        启用日期：<span>{{retureData.energy_price_start_date}}</span><br>
        峰段：<span>{{retureData.energy_price_rule_json[0] }} {{unit}}</span><br>
        谷段：<span>{{retureData.energy_price_rule_json[1]}} {{unit}}</span><br>
        平段：<span>{{retureData.energy_price_rule_json[2]}} {{unit}}</span><br>
        尖峰：<span>{{retureData.energy_price_rule_json[3]}} {{unit}}</span><br>
        尖峰有效期：<span>{{retureData.energy_price_extra_json.start_time}} —— {{retureData.energy_price_extra_json.end_time}}</span>
      </div>
      <!--计价类型为单一时显示列表-->
      <div class="basic" v-if="single">
        <p>计量表计价信息</p>
        计价方案号：<span>{{retureData.energy_price_code}}</span><br>
        计价方案名称：<span>{{retureData.energy_price_name}}</span><br>
        计价类型：<span>{{retureData.energy_price_type_name}}</span><br>
        付费方式：<span>{{retureData.prepayment}}</span>
      </div>
      <div class="basic" v-if="single">
        <p>价格结构</p>
        启用日期：<span>{{retureData.energy_price_start_date}}</span><br>
        价格：<span>{{retureData.energy_price_rule_json}} {{unit}}</span><br>
      </div>
      <!--计价类型为阶梯时显示列表-->
      <div class="basic" v-if="ladder">
        <p>计量表计价信息</p>
        计价方案号：<span>{{retureData.energy_price_code}}</span><br>
        计价方案名称：<span>{{retureData.energy_price_name}}</span><br>
        付费方式：<span>{{retureData.prepayment}}</span>
      </div>
      <div class="basic" v-if="ladder">
        <p>价格结构</p>
        启用日期：<span>{{retureData.energy_price_start_date}}</span><br>
        1档：<span>0 &lt;用量&le;{{retureData.energy_price_rule_json.num[0]}} &nbsp; {{retureData.energy_price_rule_json.price[0]}}{{unit}}</span><br>
        2档：<span>{{retureData.energy_price_rule_json.num[0]}}&lt;用量&le; &infin; &nbsp;{{retureData.energy_price_rule_json.price[1]}} {{unit}}</span><br>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
//        下边是列表显示的状态值
        single: false,
        peak: false,
        ladder: false,
        id: this.$route.params.id,
        retureData: {},
        unit: ''
      }
    },
    computed: {
    },
    methods: {
      // 获取设备详情
      getDetailDate () {
        this.axios.get(this.Comm.baseUrl, {
          params: {
            shop_id: this.Comm.shopIds.id,
            module: this.Comm.modules.module2,
            opt: 'meter_detail',
            id: this.id
          }
        })
          .then((response) => {
            const result = response.data
            this.retureData = result.data[0]
            if (this.retureData.prepayment === '0') {
              this.retureData.prepayment = '非预付费'
            }
            if (this.retureData.prepayment === '1') {
              this.retureData.prepayment = '预付费'
            }
            if (this.retureData.energy_price_type_name === '单一') {
              this.single = true
            }
            if (this.retureData.energy_price_type_name === '峰谷') {
              this.peak = true
            }
            if (this.retureData.energy_price_type_name === '阶梯') {
              this.ladder = true
            }
            if (this.retureData.energy_type === '1') {
              this.retureData.energy_type = '电能'
              this.unit = ' 元/Kwh'
            }
            if (this.retureData.energy_type === '2') {
              this.retureData.energy_type = '水能'
              this.unit = '元/m³'
            }
            if (this.retureData.energy_type === '3') {
              this.retureData.energy_type = '燃气'
              this.unit = '元/m³'
            }
            if (this.retureData.energy_type === '4') {
              this.retureData.energy_type = '热能'
              this.unit = '元/GJ'
            }
          })
      }
    },
    mounted () {
      this.getDetailDate()
    }
  }
</script>
<style scoped>
  .checkBox{
    position:absolute;
    height:100%;
    left:0;
    right:0;
    bottom:0;
    background: #1b212d;
    padding:0 20px;
  }
  .header{
    height:35px;
    margin-top: 10px;
    border-bottom:#314159 solid 1px;
    font-size: 14px;
  }
  .header span a{
    color:#b3c6dd;
  }
  .backbtn{
    float: right;
    cursor:pointer;
    line-height: 32px;
    padding:0 20px;
    border-radius:5px 5px 5px 5px ;
    color:#eef4ff;
    margin-right:20px;
  }
  .writebtn{
    float: right;
    cursor:pointer;
    line-height: 32px;
    padding:0 20px;
    border-radius:5px 5px 5px 5px ;
    color:#62a3ff;
    margin-right:20px;
    background-color: #2c3441;
  }
  .nav{
    height:70%;
  }
  .basic{
    width: 25%;
    height:100%;
    float: left;
    margin-top:20px;
    padding-left:20px;
  }
  .basic span{
    color:#F9FFEB;
    font-size: 14px;
    line-height:35px;
  }
  .basic p{
    font-size: 14px;
    color: #62a3ff;
    margin-bottom: 15px;
  }
  /*.btn1{*/
    /*width:90px;*/
    /*height: 32px;*/
    /*border-radius: 16px;*/
    /*color:white;*/
    /*margin-right: 20px;*/
  /*}*/
  /*.btn2{*/
    /*border:#21caf1 solid 1px;*/
    /*width:90px;*/
    /*height: 32px;*/
    /*background: #1a222f;*/
    /*border-radius: 16px;*/
    /*color:#21caf1;*/
  /*}*/
</style>
