<template>
  <div class="detailbox">
    <div class="header">
      <h3>
        <router-link :to="{ path: '/main/calculate'}">计量表管理</router-link>
        <router-link :to="{ path: '/main/calculate'}" ><span>> 电能</span> </router-link>
        <span>>新建抄表（单一、阶梯）</span>
      </h3>
    </div>
    <div class="neck">
      <span>计量表名称：1#制冷剂电表</span>
       <span>设备编号：0487b4c2d94980</span>
      <span>倍率：50</span>
    </div>
    <div class="nav">
      <div class="basic">
        <p>上期抄表时间：<span>2017/04/30     18:30</span></p>
       尖峰指数：<span>3854</span>

      </div>
      <div class="basic">
        <p>本期值：<span>0.00 Kwh</span></p>
        <p>上期值：<span>：0.00 Kwh</span></p>
      </div>
      <div class="basic">
        <p>上期用量：<span>3050.00 Kwh</span></p>
        <p>本期用量：<span>0.00 Kwh</span></p>
      </div>
    </div>
    <div class="footer">
      <button class="btn1 bj">编 辑</button>
      <router-link :to="{ path: '/main/calculate'}"><button class="btn2">返回列表</button></router-link>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'equipmentDetail',
    data () {
      return {}
    }
  }
</script>
<style scoped>
  .detailbox{
    position:absolute;
    height:50%;
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
    line-height:50px;
    border-bottom:#314159 solid 1px;
  }
  .neck>span{
    margin-right: 20px;
  }
  .nav{
    height:70%;
  }
  .basic>span{
    width: 80px;
    padding: 5px 20px;
    border: 1px solid #314159;
    border-radius: 3px;
  }
  .basic span{
    color: #acbed4;
  }
  .basic{
    width: 33%;
    height:100%;
    float: left;
    margin-top:20px;
    padding-left:20px;
  }
  .basic p {
    line-height:35px;
    margin-bottom: 20px;
  }
  .btn1{
    width:90px;
    height: 32px;
    border-radius: 16px;
    color:white;
    margin-right: 20px;
  }
  .btn2{
    border:#21caf1 solid 1px;
    width:90px;
    height: 32px;
    background: #1a222f;
    border-radius: 16px;
    color:#21caf1;
  }
  .footer{
    position: relative;
    text-align: center;
    bottom: 50px;
  }
</style>
