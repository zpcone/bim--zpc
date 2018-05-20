<template>
  <div class="bannerW">
    <span>F座601</span>
    <div class="bannerW_top">
      <span>昨日 0 Kwh</span><br>
      <span>同比：-</span><br>
      <span>环比：-</span>
    </div>
    <div class="bannerW_bottom">
      <span>今日 0 Kwh</span>
    </div>
  </div>
</template>

<script>
    export default {
      props: ['returnAnalysis']
    }
</script>
<style>
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
