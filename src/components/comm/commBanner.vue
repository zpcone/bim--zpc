<template>
  <div class="wrapper">
    <div class="container">
      <ul class="banner">
        <li id="jd001">
          <bannerData :returnAnalysis="returnAnalysis"></bannerData>
        </li>
        <li id="jd002">
          <bannerData></bannerData>
        </li>
        <li id="jd003">
          <bannerData></bannerData>
        </li>
        <li id="jd004">
          <bannerData></bannerData>
        </li>
        <li id="jd005">
          <bannerData></bannerData>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import bannerData from './commBannerData' // 引入轮播图内部内容组件
  export default {
    data () {
      return {
      }
    },
    props: ['returnAnalysis'],
    components: {
      bannerData
    },
    mounted () {
//      var container = document.getElementsByClassName('wrapper')[0]
//      for (var i = 0; i < 100; i++) {
//        container.innerHTML += '<ul class="uls"></ul>'
//      }
//      var uls = document.getElementsByClassName('uls')
//      for (var i = 0; i < uls.length; i++) {
//      }
    }
  }
</script>
<style>
  .wrapper{
    position: relative;
    width:100%;
    height:100%;
    overflow: hidden;
  }
  .container{
    position: absolute;
    left:0;
    right:0;
    width: 100%;
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
  .wrapper .banner li{
    float: left;
    width: 18%;
    height:100%;
    margin:0 1%;
  }
</style>

