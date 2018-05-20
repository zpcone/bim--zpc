<template>
  <div class="analysisBtn">
    <router-link :to="{ path:'/splitScreen/analysis'}"><button  class="knob ">自定义统计</button></router-link>
    <router-link :to="{ path:'/splitScreen/building'}"><button  class="knob1 ">建筑能效概况</button></router-link>
    <router-link :to="{ path:'/splitScreen/buildingStatistics'}"><button  class="knob">建筑能效统计</button></router-link>
    <button  class="monthBtn bj" >月统计</button>
    <button  class="yearBtn ">年统计</button>
    <Date-picker type="year" placeholder="选择年" style="width: 150px;float: right"></Date-picker>
  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    }
  }
</script>
<style scoped>
  .analysisBtn{
    height:38px;
    position: absolute;
    left: 20px;
    right: 20px;
    border-bottom: 1px solid gray;
  }
  .yearBtn, .monthBtn{
    line-height:36px;
    padding:0 20px;
    border-radius:5px 5px 5px 5px;
    color:#fff;
    float: right;
    margin-left: 20px;
  }
  .yearBtn{
    background-color: #323942;
    border:1px solid #63a2ff;
  }
  .monthBtn{
    border:1px solid #323942;
  }
  .knob1{
    line-height: 36px;
    padding: 0 20px;
    border-radius: 5px 5px 0 0;
    color: #fff;
    background:  #63a2ff;
    margin-right: 20px;
  }
  /*.analysisBtn span{*/
    /*float: right;*/
  /*}*/
</style>
