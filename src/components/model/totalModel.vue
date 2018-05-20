<template>
  <div class="main">
    <canvas class="showModel"></canvas>
    <div class="operate">
      <ul class="operate-icon">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'totalModel'
  }
</script>
<style scoped>
  .main{
    width: 100%;
    height: 100%;
    background-color: #fff;
    position: relative;
  }
  .showModel{
    width: 100%;
    height: 100%;
  }
  .operate{
    position: absolute;
    text-align: center;
    width: 100%;
    bottom: 30px;
  }
  .operate-icon{
    display: inline-block;
  }
  .operate-icon li{
    float: left;
    height: 30px;
    width: 50px;
  } 
  .operate-icon li:nth-child(1){
    background: url(../../assets/btn/icom_ceiliang.png) no-repeat center;
  }
  .operate-icon li:nth-child(2){
    background: url(../../assets/btn/icom_moxingditu.png) no-repeat center;
  }
  .operate-icon li:nth-child(3){
    background: url(../../assets/btn/icom_pizhuyeqian.png) no-repeat center;
  }
  .operate-icon li:nth-child(4){
    background: url(../../assets/btn/icom_paoqie.png) no-repeat center;
  }
  .operate-icon li:nth-child(5){
    background: url(../../assets/btn/icom_shuxing.png) no-repeat center;
  }
  .operate-icon li:nth-child(6){
    background: url(../../assets/btn/icom_manyou.png) no-repeat center;
  }
  .operate-icon li:nth-child(7){
    background: url(../../assets/btn/icom_fengxiang.png) no-repeat center;
  }

</style>