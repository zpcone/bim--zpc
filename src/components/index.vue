<template>
  <div>
    <!--<div id="slider-wrap">-->
      <!--<div id="slider" class="nivoSlider">-->
        <!--<a href="javascript:;" class="nivo-imageLink">-->
        <!--<img src="../../static/img/slider/1.jpg" alt="" style="width: 100%;height: 900px;">-->
        <!--</a>-->
        <!--<a href="javascript:;" class="nivo-imageLink">-->
        <!--<img src="../../static/img/slider/2.jpg" alt="" style="width: 100%;height: 900px;">-->
        <!--</a>-->
        <!--<a href="javascript:;" class="nivo-imageLink">-->
        <!--<img src="../../static/img/slider/3.png" alt="" style="width: 100%;height: 900px;">-->
        <!--</a>-->
      <!--</div>-->
    <!--</div>-->
    <!--下边是轮播图-->
    <div id="wrapper">
      <div class="fullwidthbanner-container">
        <div class="fullwidthbanner">
          <ul>
            <li data-transition="3dcurtain-horizontal" data-slotamount="15" data-masterspeed="300">
              <img src="../../static/images/slides/1.jpg" alt="" />
            </li>
            <li data-transition="3dcurtain-vertical" data-slotamount="15" data-masterspeed="300" data-link="#">
              <img src="../../static/images/slides/2.jpg" alt="" />
            </li>
            <li data-transition="papercut" data-slotamount="15" data-masterspeed="300" data-link="#">
              <img src="../../static/images/slides/3.png" alt="" />
            </li>

          </ul>
        </div>
      </div>
    </div>
    <div class="logoTop">
      <img src="../../static/img/top/logo.png" alt="logo" />
    </div>
    <div class="logoNav" @click="showRight = !showRight">
      <img src="../../static/img/top/button_caidan.png" alt="logo"/>
    </div>
    <div class="navBar" v-if="showRight">
      <div class="navBar_back" @click="showRight = !showRight">
        <img src="../../static/img/top/button_fanhui.png" alt="">
      </div>
      <div class="homeNav">
        <button style="background-color: #62A3FE;margin-left: -20px;"><span>首页</span></button>
        <button @click="jumpone($event)">产品功能</button>
        <button @click="jumptwo($event)">平台优势</button>
        <button @click="jumpth($event)">应用价值</button>
        <button @click="jumpfor($event)">产品背景</button>
      </div>
      <div class="home_line"></div>
      <div class="home_login"><router-link :to="{ path: ''}"><span>登录</span></router-link></div>
    </div>
    <img  class="logMid" src="../../static/img/top/logoMid.png" alt="logo" />
    <div class="logoFont">
      <img src="../../static/img/top/icom_bim.fm.gif" alt="logo" />
      <span>智能楼宇运营管理系统</span>
    </div>
    <div class="bannerFont">
      <span>北京毕加索智能科技有限公司与优服科技（北京）有限公司强强联合，面向业主单位推出的一款运维云产品。<br>
        该产品是基于BIMFM的理念,结合BIM技术、云计算技术、互联网技术、物联网技术及3DGIS技术，
        整合楼宇实际解决楼宇运营实践诞生的新型运维产品。
      </span>
    </div>
    <router-link :to="{ path: ''}" class="experience">
      <span>立即体验</span>
      <img src="../../static/img/top/buttom_tiyan.png" alt="">
    </router-link>
    <!--顶部横向悬浮导航-->
    <div class="topNav">
      <img src="../../static/img/top/logo.png" alt="">
      <button>登录</button>
      <a href="javascript:;" @click="jumpone($event)">产品功能</a>
      <a href="javascript:;" @click="jumptwo($event)">平台优势</a>
      <a href="javascript:;" @click="jumpth($event)">应用价值</a>
      <a href="javascript:;" @click="jumpfor($event)">产品背景</a>
      <button>首页</button>
    </div>
    <!--产品功能-->
    <div id="one" class="freature clearfix">
      <img src="../../static/img/feature/feature_beijing.png" alt=""/>
      <h1 style="position: absolute;left: 50%;color: #2a2e30;font-size: 38px;font-weight: bold">产品功能</h1>
      <ul class="freature-pic">
        <li class="pic_one">
          <div class="pic_one_co">
            <img src="../../static/img/feature/icon_moxingliulan.png" alt="">
            <span>模型浏览</span>
          </div>
        </li>
        <li class="pic_two">
          <div class="pic_one_co">
            <img src="../../static/img/feature/icon_nengyuanguanli.png" alt="">
            <span>能源管理</span>
          </div>
        </li>
        <li  class="pic_th">
          <div class="pic_one_co">
            <img src="../../static/img/feature/icon_moxingliulan.png" alt="">
            <span>模型浏览</span>
          </div>
        </li>
        <li class="pic_fou">
          <div class="pic_one_co">
            <img src="../../static/img/feature/icon_zhinengxunjian.png" alt="">
            <span>智能巡检</span>
          </div>
        </li>
        <li class="pic_fi">
          <div class="pic_one_co">
            <img src="../../static/img/feature/icon_renyuanguanli.png" alt="">
            <span>人员管理</span>
          </div>
        </li>
        <li class="pic_six">
          <div class="pic_one_co">
            <img src="../../static/img/feature/icon_shangpuguanli.png" alt="">
            <span>商铺管理</span>
          </div>
        </li>
        <li class="pic_sev">
          <div class="pic_one_co">
            <img src="../../static/img/feature/icon_kucunguanli.png" alt="">
            <span>库存管理</span>
          </div>
        </li>
        <li  class="pic_eig">
          <div class="pic_one_co">
            <img src="../../static/img/feature/icon_xiangmutongji.png" alt="">
            <span>项目统计</span>
          </div>
        </li>
      </ul>
    </div>
    <!--平台优势-->
    <div id="two" class="advantage">
      <h1 style="position: absolute;left: 50%;color: #fff;font-size: 38px;font-weight: bold">平台优势</h1>
      <img src="../../static/img/advantage/advantage-bc.jpg" alt="">
      <ul class="a">
        <li>
          <div class="container">
            <img src="../../static/img/advantage/icon_tigaohuibao.png" alt="logo"/>
            <h2>节省投资，提高回报</h2>
            <span>运营成本降低，维护费用减少，服务质<br/>量提高。</span>
          </div>
        </li>
        <li>
          <div class="container">
            <img src="../../static/img/advantage/icon_yingji.png" alt="logo"/>
            <h2>应急处理</h2>
            <span>奠定建筑楼宇KPI监控、应急业务处理<br/>流程的基础。</span>
          </div>
        </li>
        <li>
          <div class="container">
            <img src="../../static/img/advantage/icon_zhenghe.png" alt="logo"/>
            <h2>集成整合</h2>
            <span>便于原不同业务板块快速整合合作，形<br/>成产业集群，构建良好的生态链。</span>
          </div>
        </li>
        <li>
          <div class="container">
            <img src="../../static/img/advantage/icon_tongyijiagou.png" alt="logo"/>
            <h2>统一架构</h2>
            <span>统一可复用基础架构，加速各种新应用系<br/>统的设计，便于快速应用扩充，快速相应<br/>不同生产板块的需求，提高园区满意度。</span>
          </div>
        </li>
        <li>
          <div class="container">
            <img src="../../static/img/advantage/icon_linghuokebian.png" alt="logo"/>
            <h2>灵活可变</h2>
            <span>满足生产工艺流程灵活变化的业务管理和<br/>发展需要，适应不断变得业务管理和发展<br/>需要，构建符合楼宇多方面的服务。</span>
          </div>
        </li>
        <li>
          <div class="container">
            <img src="../../static/img/advantage/icon_quanjingshitu.png" alt="logo"/>
            <h2>全景视图</h2>
            <span>适应集中管理，形成建筑楼宇管理系统的全<br/>景视图，快速集中建筑楼宇运营管理，为领<br/>导政策制定，指挥决策提供充分的依据。</span>
          </div>
        </li>
      </ul>
    </div>
    <!--应用价值部分-->
    <div id="three" class="value">
      <h1 style="position: absolute;left: 50%;color: #2a2e30;font-size: 38px;font-weight: bold">应用价值</h1>
      <img src="../../static/img/value/value_beijing.png" alt="">
      <div class="value_chart">
        <!--<img src="../../static/img/tubiao.png" alt="" style="width: 100%;height: 100%;">-->
        <div ref  ="diagramBox" class="diagramBox"></div>
      </div>
      <div class="value_bottom">
        <ul class="b">
          <li>
            <img src="../../static/img/value/icon_feiyong.png" alt="logo"/>
            <p>1.费用</p>
            <span>平台应用可有效减员增效，<br/>延迟设备寿命，降低维护成<br/>本，降低水电消耗，所见库<br/>存，大幅度降低运营投入。</span>
          </li>
          <li>
            <img src="../../static/img/value/icon_shouyi.png" alt="logo"/>
            <p>2.收益</p>
            <span>通过增加运营内容，提高服<br/>务质量，扩充服务来增加<br/>运营收入。</span>
          </li>
          <li>
            <img src="../../static/img/value/icon_huanbao.png" alt="logo"/>
            <p>3.环保</p>
            <span>对子系统运行数据的分析，<br/>管理人员可以针对性地进行<br/>节能技术改造，极地降低能<br/>耗水平。</span>
          </li>
          <li>
            <img src="../../static/img/value/icon_anquan.png" alt="logo"/>
            <p>4.安全</p>
            <span>以各集成子系统状态参数为<br/>基础，实现子系统之间相关<br/>联动。</span>
          </li>
        </ul>
      </div>
    </div>
    <!--产品背景-->
    <div id="forth" class="product_bc">
      <h1 style="position: absolute;left: 50%;color: #fff;font-size: 38px;font-weight: bold">产品背景</h1>
      <img src="../../static/img/product/img_beijing.png" alt="">
      <ul class="product_top">
        <li>
          <img src="../../static/img/product/01.jpg" alt="logo"/>
        </li>
        <li>
          <img src="../../static/img/product/02.jpg" alt="logo"/>
        </li>
        <li>
          <img src="../../static/img/product/03.jpg" alt="logo"/>
        </li>
      </ul>
      <ul class="product_bom">
        <li>
					<span>
						Facility Management设施管理，
						简称FM，是运用多学科专业，集成人、场地、流程和技术来确保楼宇良好运行的活动。人们通常理解的建筑运维管理，
						就是物业管理。但是现代的建筑运维管理（FM）与物业管理有着本质的区别，其中最重要的区别在于：
						面向的对象不同；物业管理面向建筑设施，而现代建筑运维管理面向的则是企业的管理有机体。随着BIM的出现
						，两者也在寻找着更好的结合。
					</span>
        </li>
        <li>
					<span>
						据国外研究机构对办公建筑全生命周期的成本费用分析，
						设计和建造成本只占到了整个建筑生命周期费用的 20%左右，
						而运营维护的费用占到了全生命周期费用的 67%以上。由于BIM 强大的整合能力，
						现在 80%的大型项目都应用了 BIM 技术，60%以上的企业正在考虑采用 BIM来完成。
						FM与BIM系统的逐步衔接，也对原本各自为政、自成体系的运维系统或服务管理开启了整合统一的大门。
					</span>
        </li>
        <li>
					<span>
						BIM-FM相对于传统建筑生命运营维护软件，
						基于 BIM 技术、移动互联、物联网、GIS 技术、云计算技术的广泛应用，
						BIM-FM产品将会在可视化、智能化、数据精确性和一致性方面都大大优于传统的运维软件，
						对建筑安全运营维护、效率提高、质量提升产生积极影响，引领智慧化运维新潮流。
					</span>
        </li>
      </ul>
    </div>
    <!--团队合作-->
    <div class="teamwork">
      <img src="../../static/img/teamwork/img_beijing.png" alt="">
      <div class="teamwork_left">
        <p>合作单位</p>
        <div class="yF">
          <img src="../../static/img/teamwork/youfu_logo.png" alt="logo"/>
          <p>优服科技（北京）有限公司</p>
          <span>商务热线：400-893-787</span><br/>
          <span>公司邮件：jinxia@hellouf.com</span><br/>
          <span>公司地址：北京市朝阳区北苑东路中国铁建广场F座602-603室</span>
        </div>
        <div class="biM">
          <img src="../../static/img/teamwork/bijiasuo_logo.png" alt="logo"/>
          <p>北京毕加索智能科技有限公司</p>
          <span>商务热线：010-86467787-807</span><br/>
          <span>公司邮件：bjbjs@bimsop.com</span> <br>
          <span>公司地址：北京市海淀区知春路太平洋国际大厦7层</span>
        </div>
      </div>
      <div class="teamwork_right">
        <p>友情链接</p>
        <a href="http://www.bimsop.com">http://www.bimsop.com</a>
        <a href="http://xietong.bimsop.com"> http://xietong.bimsop.com</a>
        <a href="http://www.cnbimdb.com">http://www.cnbimdb.com</a>
        <a href="http://www.hellouf.com">http://www.hellouf.com</a>
      </div>
    </div>
    <div class=" stickTop" @click="stick($event)" >
      <img src="../../static/img/button_zhiding.png" alt="">
    </div>
  </div>
</template>

<script>
//  import slider from './slider'
  import echarts from 'echarts' // 引入echarts
  import homeCol from './modules/homeCol' // 引入折线图
  import '../../static/css/styleone.css'
  import '../../static/js/jquery-1.8.3.min'
  import '../../static/js/banner'
  import '../../static/js/jquery.banner.revolution.min'
  if (window.addEventListener) {
    window.addEventListener('scroll', function scroll () {
      var t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop
      if (t > 900) {
        $('.topNav').css('opacity', '1')
        $('.topNav').css('height', '80px')
        $('.stickTop').css('height', '50px')
      } else {
        $('.topNav').css('opacity', '0')
        $('.topNav').css('height', '0')
        $('.stickTop').css('height', '0')
      }
    })
  } else {
    window.attachEvent('onscroll', function scroll () {
      var t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop
      console.log(t)
      if (t > 900) {
        this.showTop = true
        this.showBom = true
      } else {
//          this.showTop = false
        this.showTop = false
        this.showBom = false
      }
    })
  }
  export default {
    data () {
      return {
        showRight: false  // 顶部右边菜单栏状态
//        showTop: false,
//        showBom: false
      }
    },
    methods: {
      loadHomeCol () {
        console.log('加载图表')
        const boxLeft = this.$refs.diagramBox
        this.chartLeft = echarts.init(boxLeft)
        this.chartLeft.setOption(homeCol)
      },
//      导航定位
      jumpone (event) {
        $('html, body').animate({
          scrollTop: $('#one').offset().top
        }, 800)
      },
      jumptwo (event) {
        $('html, body').animate({
          scrollTop: $('#two').offset().top
        }, 1000)
      },
      jumpth (event) {
        $('html, body').animate({
          scrollTop: $('#three').offset().top
        }, 1000)
      },
      jumpfor (event) {
        $('html, body').animate({
          scrollTop: $('#forth').offset().top
        }, 1000)
      },
//      置顶
      stick (event) {
        event.preventDefault()
        $(document.documentElement).animate({
          scrollTop: 0
        }, 200)
        // 兼容chrome
        $(document.body).animate({
          scrollTop: 0
        }, 200)
      }
//      轮播图加载
//      carouselLoad () {
//        jQuery(function ($) {
//          $('#slider').nivoSlider({
//            directionNav: true,
//            captionOpacity: 0.4,
//            controlNav: true,
//            boxCols: 8,
//            boxRows: 4,
//            slices: 15,
//            effect: 'random',
//            animSpeed: 500,
//            pauseTime: 3000
//          })
//        })
//      }
    },
    components: {},
    created () {
//      setTimeout(function () {
//        this.carouselLoad()
//      }.bind(this), 1000)
    },
    mounted () {
      setTimeout(function () {
        this.loadHomeCol()
      }.bind(this), 1000)
//      if (window.addEventListener) {
//        window.addEventListener('scroll', this.scroll)
//      } else {
//        window.attachEvent('onscroll', this.scroll)
//      }
    }
  }
</script>
<style scoped>
  h1{
    transform: translate(-50%);
    top:100px;
  }
  li{
    -webkit-transition: 1s ease-out;
  }
  .freature-pic>li:hover{
    z-index: 199;
    background: #5cb1fa !important;
    -webkit-transform: rotateY(360deg);
    -moz-transform: rotateY(360deg);
    -ms-transform: rotateY(360deg);
    -o-transform: rotateY(360deg);
    transform: rotateY(360deg);
  }
  /*轮播图里边内容*/
  .logoTop{
    position: absolute;
    top: 40px;
    left: 90px;
    height: 40px;
    z-index: 99;
  }
  .logoNav{
    text-align: center;
    position: absolute;
    background-color: white;
    border-radius: 50%;
    top:40px;
    right: 60px;
    width: 50px;
    height:50px;
    z-index:299;
  }
  .logoNav img{
    position: relative;
    top:15px;
    vertical-align: middle;
  }
  .logMid{
    position: absolute;
    left:50%;
    top: 268px;
    height: 112px;
    z-index: 99;
    transform:translateX(-70px);
  }
  .bannerFont, .logoFont{
    text-align: center;
  }
  .logoFont img{
    position: relative;
    top:-15px;
  }
  .logoFont span{
  letter-spacing: .1em;
  }
  .bannerFont{
    position: absolute;
    top: 550px;
    left: 0;
    right: 0;
    z-index: 99;
  }
  .bannerFont span{
    font-size:16px;
    color: #fff;
  }
  .experience:hover{
    opacity: .8;
  }
  .experience{
    cursor: pointer;
    position: absolute;
    left:50%;
    top: 700px;
    width:200px;
    height:50px;
    transform: translateX(-100px);
    z-index:99;
    background-color: #62A3FE;
    border-radius: 60px;
  }
  .experience span{
    margin:40px;
    line-height: 50px;
    font-size: 18px;
    color: #fff;
    font-weight: bold;
  }
  .logoFont{
    position: absolute;
    top: 450px;
    left: 0;
    right: 0;
    z-index: 99;
  }
  .logoFont span{
    line-height: 51px;
    font-size: 58px;
    font-weight: bold;
    color: #fff;
    z-index: 99;
  }
  .clear {
    clear: both;
    height: 0;
    line-height: 0;
    font-size: 0
  }
  .clearfix:after {
    content: "";
    　height: 0;
    　visibility: hidden;
    　display: block;
    　clear: both;
  }
  /*轮播图里边内容*/
  .logoTop {
    position: absolute;
    top: 40px;
    height: 40px;
    z-index: 99;
  }
  .navBar{
    position: absolute;
    top:0;
    right:0;
    width: 20%;
    height:900px;
    background-color: #2f3332;
    transition: 2s;
    -moz-transition: 2s;
    -webkit-transition: 2s;
    -o-transition: 2s;
    z-index: 99;
  }
  .navBar_back{
    position: absolute;
    right:60px;
    top:40px;
    text-align: center;
    height:50px;
    width: 50px;
    background-color:#f6f6f7 ;
    border-radius: 50%;
    z-index: 199;
  }
  .navBar_back img{
    position: relative;
    top:16px;
  }
  /*.homeBtn{*/
    /*text-align: center;*/
    /*position: absolute;*/
    /*border-radius: 40px;*/
    /*top:100px;*/
    /*left:50px;*/
    /*height:40px;*/
    /*width: 120px;*/
    /*background-color: #62A3FE;*/
  /*}*/
  .homeBtn span{
    line-height: 40px;
    font-size: 16px;
    color: #fff;
    font-weight: bold;
  }
  .homeNav{
    position: absolute;
    top:150px;
    left:100px;
  }
  .homeNav >button{
    width:110px;
    border-radius: 40px;
    cursor: pointer;
    display: block;
    margin-top: 20px;
    height:40px;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    background-color:#2f3332;
  }
  .homeNav :hover{
    background-color:#62A3FE;
  }
  .home_line{
    position: absolute;
    bottom:200px;
    left:50px;
    right:0;
    height:1px;
    background-color: gray;
  }
  .home_login{
    position: absolute;
    text-align: center;
    left:50px;
    bottom:100px;
    width: 120px;
    height:40px;
    border-radius: 40px;
    border: 1px solid gray;
  }
  .home_login:hover{
    background-color: #62A3FE;
  }
  .home_login span{
    line-height: 40px;
    color: #fff;
    font-size: 16px;
    font-weight:bold;
  }
  .topNav{
    position: fixed;
    top:0;
    opacity:0;
    width: 100%;
    height:0px;
    background-color: #f8f8f8;
    z-index:299;
  }
  .topNav >img{
    position: relative;
    top:20px;
    left:100px;
  }
  .topNav >a{
    line-height: 80px;
    font-size: 16px;
    float: right;
    margin:0 20px;
    color: #000;
  }
  .topNav >a:hover{
    color: #62A3FE;
  }
  .topNav button:hover{
    opacity: .8;
  }
  .topNav button{
    position: relative;
    top:20px;
    height:40px;
    width: 120px;
    background-color:#62A3FE;
    border-radius: 40px;
    float: right;
  }

  .bannerFont, .logoFont {
    text-align: center;
  }

  .bannerFont {
    position: absolute;
    top: 550px;
    left: 0;
    right: 0;
    z-index: 99;
  }

  .bannerFont span {
    font-size: 16px;
    color: #fff;
    font-family: "微软雅黑";
    z-index: 99;
  }

  .logoFont {
    position: absolute;
    top: 450px;
    left: 0;
    right: 0;
    z-index: 99;
  }

  .logoFont span {
    line-height: 51px;
    font-size: 58px;
    font-weight: bold;
    font-family: "微软雅黑";
    color: #fff;
    z-index: 99;
  }

  /*产品功能*/
  .freature {
    position: relative;
    width: 100%;
  }
  .freature>img {
    width: 100%;
  }
  .freature-pic {
    position: absolute;
    top: 25%;
    left: 15%;
    right: 15%;
    bottom:25%;
    display: block;
    width: 70%;
  }
  .freature-pic li{
    text-align: center;
    width: 25%;
    height: 50%;
    float: left;
    z-index: 99;
  }
  .freature-pic li img{
    margin-top:20%;
  }
  .freature-pic li span{
    display: block;
    font-size: 22px;
    color: #fff;
  }
  .freature-pic .pic_one{
    background-image: url(../../static/img/feature/01.jpg);
    background-size:cover ;
  }
  .pic_one_co{
    background: rgba(44,43,49,0.5);
    width: 100%;
    height:100%;
    z-index: 99;
  }
  .pic_one_co:hover{
    background: rgba(44,43,49,0);
  }
  .freature-pic .pic_two{
    background-image: url(../../static/img/feature/02.jpg);
    background-size:cover ;
  }
  .freature-pic .pic_th{
    background-image: url(../../static/img/feature/03.jpg);
    background-size:cover ;
  }
  .freature-pic .pic_fou{
    background-image: url(../../static/img/feature/04.jpg);
    background-size:cover ;
  }
  .freature-pic .pic_fi{
    background-image: url(../../static/img/feature/05.jpg);
    background-size:cover ;
  }
  .freature-pic .pic_six{
    background-image: url(../../static/img/feature/06.jpg);
    background-size:cover ;
  }
  .freature-pic .pic_sev{
    background-image: url(../../static/img/feature/07.jpg);
    background-size:cover ;
  }
  .freature-pic .pic_eig{
    background-image: url(../../static/img/feature/08.jpg);
    background-size:cover ;
  }
  /*.freature li img {*/
    /*!*opacity: .8;*!*/
    /*width: 100%;*/
  /*}*/
  /*平台优势*/
  .advantage {
    position: relative;
    width: 100%;
  }
  .advantage .container{
    position: absolute;
    width: 100%;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
  }
  .advantage > img {
    width: 100%;
  }

  .advantage .a {
    position: absolute;
    left: 15%;
    right: 15%;
    top: 25%;
    bottom: 25%;
  }
  .advantage li:hover{
    background: rgba(255,255,255,0.2);
  }
  .a li {
    position: relative;
    min-width: 200px;
    list-style: none;
    margin: 10px 10px;
    text-align: center;
    float: left;
    height: 50%;
    width: 30%;
    /*background-color: hotpink*/
  }
  .a li h2 {
    color: #fff;
    font-weight: bold;
    font-size: 18px;
    margin: 30px 0 20px 0;
  }

  .a li span {
    color: #fff;
    display:inline-block;text-align:left;
    line-height: 25px;
  }
  /*应用价值部分*/
  .value {
    position: relative;
    width: 100%;
  }

  .value > img {
    width: 100%;
  }

  .value .value_chart {
    position: absolute;
    top: 200px;
    left: 15%;
    right: 15%;
    height: 40%;
  }
  .value_chart .diagramBox{
    width: 100%;
    height:100%;
  }
  .value .value_bottom {
    position: absolute;
    top: calc(60%+ 200px);
    left: 15%;
    right: 15%;
    bottom: 10%;
  }

  .value_bottom .b {
    width: 100%;
    height: 100%;
  }

  .b li {
    list-style: none;
    float: left;
    text-align: left;
    width: 25%;
    height: 100%;
  }
  /*.b li:hover{*/
    /*background: rgba(44,43,49,0.5);*/
    /*color: white;*/
  /*}*/
  .b li img{
    height:34px;
  }
  .b li p{
    font-size: 18px;
    font-weight: bold;
    margin:30px 0 20px 0;
  }
  .b li span {
    line-height: 30px;
    color: #8c8c8c;
    font-size: 16px;
  }

  /*下边是产品背景*/
  .product_bc {
    position: relative;
    width: 100%;
  }

  .product_bc > img {
    width: 100%;
  }

  .product_bc .product_top {
    position: absolute;
    top: 200px;
    left: 15%;
    right: 15%;
    height: 35%;
  }

  .product_top li {
    margin:0 20px;
    list-style: none;
    width: calc(33.3% - 40px);
    float: left;
  }

  .product_top li img {
    width: 100%;
  }

  .product_bc .product_bom {
    position: absolute;
    top: calc(55%+ 200px);
    left: 15%;
    right: 15%;
    bottom: 15%;
  }
  .product_bom li {
    text-align: center;
    margin: 0 20px;
    float: left;
    width: calc(33.3% - 40px);
    height:100%;
    font-size: 16px;
  }
  .product_bom li span{
    text-indent: 2em;
    color: #fff;
    display:inline-block;text-align:left;
    line-height: 25px;
  }

  /*合作页面部分*/
  .teamwork {
    position: relative;
    width: 100%;
  }

  .teamwork img {
    width: 100%;
  }

  .teamwork .teamwork_left {
    position: absolute;
    top: 15%;
    left: 15%;
    float: left;
    width: 40%;
  }

  .teamwork .teamwork_right {
    position: absolute;
    top: 15%;
    left: 65%;
    float: left;
    width: 20%;
  }

  .teamwork_left >p {
    color: #fff;
    height: 50px;
    font-size: 34px;
    border-bottom: 1px solid #8ac5f8;
  }

  .teamwork_right> p {
    margin-bottom: 30px;
    color: #fff;
    height: 50px;
    font-size: 34px;
    border-bottom: 1px solid #8ac5f8;
  }
  .teamwork_right> a{
    height:30px;
    display: block;
    color: #FFF;
    font-size: 16px;
  }
  .teamwork_right> a:hover{
    text-decoration:underline;
  }
  .teamwork_left .yF {
    float: left;
    color: #fff;
    width: 40%;
  }
  .teamwork_left .yF >p{
    margin:40px 0 30px 0;
    font-size: 20px;
  }
  .teamwork_left .yF span {
    line-height: 15px;
    font-size: 14px;
  }

  .teamwork_left .biM {
    float: left;
    color: #fff;
    margin-left: 10%;
    width: 40%;
  }
  .teamwork_left .biM >p{
    margin:40px 0 30px 0;
    font-size: 20px;
  }
  .teamwork_left .biM span {
    line-height: 15px;
    font-size: 14px;
  }

  .biM img {
    margin-top: 50px;
  }

  .yF img {
    margin-top: 50px;
  }
  .stickTop{
    position: fixed;
    right:50px;
    bottom:50px;
    width:50px;
    height:50px;
    border-radius:50%;
    background-color: #59aefa;
    text-align: center;
  }
  .stickTop img{
    transform: translateY(17px);
  }
</style>
