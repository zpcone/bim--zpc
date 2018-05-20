<template>
  <div class="mainbody">
    <div class="mainleft">
      <div id="logo">
        <img src="../assets/logo.png" alt="">
      </div>
      <ul class="nav">
        <li class="active">
          <a href="javascript:void(0)" >
            <em id="user"></em>wangyitao<i></i>
          </a>
          <!-- <a href="#"><em id="user"></em>wangyitao<i></i></a> -->
          <ul>
            <li><a href="#">我的项目</a></li>
            <li><a href="#">我的账号</a></li>
            <li><a href="#">退出</a></li>
          </ul>
        </li>
        <li>
          <a href="#main/codeManageIndex" >
            <em id="mx"></em>模型管理<i></i>
          </a>
          <ul>
            <li><a href="#main/codeManageIndex/dataCoding">编码管理</a></li>
          </ul>
        </li>
        <li>
          <a href="#main/splitScreen/equipmentList" >
            <em id="sb"></em>设备管理
          </a>
        </li>
        <li >
          <a href="#main/splitScreen/calculate" >
            <em id="ny"></em>能源管理<i></i>
          </a>
          <ul>
            <li><a href="#main/splitScreen/calculate">计量表管理</a></li>
            <li><a href="#main/splitScreen/analysis">能效统计分析</a></li>
            <!-- <li><a href="#">建筑基础信息</a></li> -->
            <!-- <li><a href="#">能源价格结构</a></li> -->
            <!-- <li><a href="#">计量层级设置</a></li> -->
          </ul>
        </li>
      </ul>
    </div>
    <div class="mainright">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    name: 'main',
    data () {
      return {}
    },
    mounted () {
      this.clickNav()
    },
    methods: {
      /*
       * 点击一级菜单
       */
      clickNav () {
        // 展开二级菜单
        $('.nav>li').click(function () {
          $('.nav>li').removeClass('active')
          $('.nav>li').find('ul').hide()
          $(this).addClass('active')
          $(this).find('ul').show()
        })
        $('.nav>li li').click(function () {
          $('.nav>li li').removeClass('cur')
          $(this).addClass('cur')
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /**/
  .rightTop{
    position: absolute;
    bottom:50%;
    top:0;
    left:0;
    right:0;
  }
  #logo{
    padding:15px 25px;
  }
  .nav{
    padding-top:20px;
  }
  .nav>li{
    margin:0 10px 5px 10px;
    border-radius: 6px;
  }
  .nav>li>a{
    line-height: 20px;
    display: block;
    padding:15px 0;
    color:#b3c6dd;
  }
  .nav>li em{
    width:40px;
    height: 20px;
    display: inline-block;
    position: relative;
    top:3px;
  }
  .nav>li ul{
    display: none;
    padding-bottom:10px;
  }
  .nav>li ul li{
    line-height: 35px;
    padding-left:40px;
  }
  .nav>li ul li a{
    color:#b3c6dd;
  }
  .nav>li:hover{
    background: #1b222d;
  }
  .nav>li i{
    width:20px;
    height: 20px;
    display: inline-block;
    position: relative;
    margin-right:15px;
    top:2px;
    float:right;
    background: url(../assets/nav/icom_sanjiaoxing.png) no-repeat center;
  }
  .nav>li.active i{
    background: url(../assets/nav/icom_sanjiaoxing_click.png) no-repeat center;
  }
  .nav>li ul li:hover a{
    color:#62a3ff;
  }
  .nav>li ul li.cur a{
    color:#62a3ff;
  }
  .nav>li:hover>a{
    color:#62a3ff;
  }
  .nav>li.active{
    background: #1b222d;
  }
  .nav>li.active>a{
    color:#62a3ff;
  }
  #user{
    background: url(../assets/nav/icom_geren.png) no-repeat center;
  }
  .nav>li:hover #user,
  .nav>li.active #user{
    background: url(../assets/nav/icom_hover.png) no-repeat center;
  }
  #mx{
    background: url(../assets/nav/icom_moxing.png) no-repeat center;
  }
  .nav>li:hover #mx,
  .nav>li.active #mx{
    background: url(../assets/nav/icom_moxing_hover.png) no-repeat center;
  }
  #sb{
    background: url(../assets/nav/icom_shebei.png) no-repeat center;
  }
  .nav>li:hover #sb,
  .nav>li.active #sb{
    background: url(../assets/nav/icom_shebei_hover.png) no-repeat center;
  }
  #ny{
    background: url(../assets/nav/icom_nengyuan.png) no-repeat center;
  }
  .nav>li:hover #ny,
  .nav>li.active #ny{
    background: url(../assets/nav/icom_nengyuan_hover.png) no-repeat center;
  }
  .mainleft{
    position: absolute;
    top:0;
    width:210px;
    left:0;
    bottom:0;
    background: #262e3a;
  }
  .mainright{
    /*min-width: 968px;*/
    position: absolute;
    top:0;
    right:0;
    left:210px;
    bottom:0;
  }
</style>
