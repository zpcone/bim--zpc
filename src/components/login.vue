<template>
  <div class="loginwrap">
    <canvas id="canv" horizontalScrollPolicy="off" verticalScrollPolicy="off"></canvas>
    <div class="center">
      <img src="../assets/img/login.jpg" alt="logo" class="logo">
      <p class="tip">智能楼宇运营管理系统欢迎您！</p>
      <div class="nav"  @keyup.enter="login">
        <form>
          <p class="input" :class="{whiteBorder: whiteUser}">
            <Icon type="ios-person" class="show" :class="{whiteColor: whiteUser}"></Icon>
            <input type="text" placeholder="用户名" v-model="userName" @focus="whiteUser=true" @blur="whiteUser=false" :class="{whiteColor: whiteUser}">
          </p>
          <p class="input" :class="{whiteBorder: whitePass}">
            <Icon type="ios-locked" class="show" :class="{whiteColor: whitePass}"></Icon>
            <input type="text" placeholder="密　码" class="password" v-model="password" @focus="whitePass=true" @blur="whitePass=false" :class="{whiteColor: whitePass}">
          </p>
          <Checkbox value="" class="checkbox"></Checkbox><a class="autoLogin">自动登录</a>
          <a class="pass">忘记密码？</a>
          <br>
          <span style="color: red;font-weight:bold;position:absolute" v-show="loginShow">{{this.errorTip}}</span>
          <button class="btnlist login" type="submit" @click="login">登录</button>
        </form>
      </div>
    </div>
    <!--<div class="footer">copyright @ 2015 hellouf.com  优服科技（北京）有限公司  &  Copyright @ 2016 北京毕加索智能科技有限公司 京IP备16043125号</div>-->
  </div>
</template>

<script>
  import oldModule from './loginBack.js'
  export default {
    name: 'loginTest',
    data () {
      return {
        errorTip: '',
        posts: '',
        loginShow: false,
        userName: '',
        password: '',
        whiteUser: false,
        whitePass: false
      }
    },
    // created () {
    //   oldModule()
    // },
    mounted () {
      oldModule.oldModule()
    },
    methods: {
      login () {
//        const phoneReg = /^((1[3-8]{1}[0-9]{1})+\d{8})$/
//        var emailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/
// 判断输入的用户名和密码是否为空--如果为空的话显示错误提示
        if (this.userName === '' || this.password === '') {
          this.errorTip = '用户名或密码不能为空'
          this.loginShow = true
        }
//        else {
//          if (!phoneReg.test(this.userName) && !emailReg.test(this.email)) {
//            this.errorTip = '请输入正确用户名'
//            loginShow = true
//            return
//          }
        if (this.userName === 'abc' || this.password === '123') {
          this.$router.push({path: '/main'})
        }
//          setTimeout(function () {
//            this.errorTip = ''
//          }, 3000)
        // 校验正确的手机号-可用邮箱注册校验
//          this.$http({
//            method: 'POST',
//            url: '/file.helloufu.com/?c=Port&m=actionGet_Web_v2_Port&shop_id=4',
//            data: {
//              username: this.userName,
//              password: this.password
//            },
//            headers: {'X-Requested-With': 'XMLHttpRequest'}
//          }).then(
//            function (response) {
//              this.posts = response.data
//              console.log(posts)
//            }
//            )
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  *{
    -webkit-font-smoothing: subpixel-antialiased; /*字体边缘平滑处理*/
  }
  .loginwrap{
    position: relative;
    width: 100%;
    height: 100%;
    /*position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;*/
    background-image: -webkit-radial-gradient(ellipse farthest-corner at center top, #000d4d 0%, #000105 100%);
    background-image: radial-gradient(ellipse farthest-corner at center top, #000d4d 0%, #000105 100%);
    cursor: move;
  }
  #canv{
    width: 100%;
    height: calc(100% - 3px);
    margin: 0;
    border: none;
    padding: 0;
  }
  /*.loginwrap .center{
    margin: auto;
    position: absolute;
    border: 2px solid transparent;   
    border-radius: 10px;
    background-clip: padding-box;
    box-shadow: 0 3px 9px black, inset 0 0 9px white;
    background: rgba(0,0,0,.4);
    left:0;
    top:0;
    right:0;
    bottom:0;
    width: 320px;
    height: 400px;
  .center::after{
    position: absolute;
    top: -2px;
    bottom: -2px;
    left: -2px;
    right: -2px;
    background: linear-gradient(#6455d3,#20d5fa); 
    content: '';
    z-index: -1;
    border-radius: 10px; 
  }*/
  .center{
    margin: auto;
    position: absolute;
    border: 2px solid #357098; 
    border-radius: 10px;  
    background: rgba(21, 38, 58, 0.9);
    /*border-image: linear-gradient(#6455d3,#20d5fa) 10;*/
    left:0;
    top:0;
    right:0;
    bottom:0;
    width: 360px;
    height: 400px;
    cursor: default;
  }
  .logo{
    margin:0 auto;
    width: 50px;
    display: block;
    margin-top: 40px;
  }
  .tip{
    margin:0 auto;
    text-align: center;
    margin-top: 20px;
    color: #ffffff;
    font-size: 15px;
  }
  .nav{
    width: 80%;
    margin:0 auto;
    margin-top: 40px;
  }
  .input{
    width: 100%;
    border-style:none;
    border: 1px  solid #485464;
    border-radius: 6px;
    height: 36px;
    padding: 5px 15px;
    margin-bottom: 15px;
  }
  .show{
    float: left;
    font-size: 24px;
    color: #485464;
    margin-right: 15px;
  }
  .input input{
    font-size: 14px;
    color: #a1a0a7;
    width: calc(100% - 30px);
    outline: none;
    border-style:none;
    background: rgba(0,0,0,0);
    height: 24px;
    line-height: 24px;
  }
  input[type=text]:focus,
  input[type=password]:focus{
  -webkit-box-shadow: 0 0 0 1000px rgba(0,0,0,0) inset;
  color: #ffffff;
}
  input::-webkit-input-placeholder {  /* WebKit browsers*/
    color:#a1a0a7;
    font-size:14px;
  }
  input::-moz-placeholder {  /* Mozilla Firefox 4 to 18*/
    color:#a1a0a7;
    font-size:14px;
  }
  input::-moz-placeholder { /* Mozilla Firefox 19+*/
    color:#a1a0a7;
    font-size:14px;
  }
  input:-ms-input-placeholder { /* Internet Explorer 10+*/
    color:#a1a0a7;
    font-size:14px;
  }

  .checkbox{
    height:20px;
    /*width:20px;*/
    float: left;
    /*margin-right: 10px;*/
    color: white;
  }
  .autoLogin{
    color: #a1a0a7;
    float: left;
  }
  .pass{
    float: right;
    color: #9de5f9;
  }
  .login{
    width: 100%;
    line-height: 36px;
    padding: 0 20px;
    border-radius: 6px;
    color: #fff;
    background: #1dc4e8;
    margin-top: 34px;
    font-size: 16px;
    letter-spacing: 10px;
  }
  .login:hover{
    background: #02a2c1;
  }
  .footer{
    position: absolute;
    bottom:20px;
    left: 50%;
    transform: translate(-50%);
    color: #bac2cc;
    font-size: 16px;
  }
  .whiteBorder{
    border-color: #ffffff;
  }
  .whiteColor{
    color: #ffffff;
  }
  input.whiteColor::-webkit-input-placeholder {  /* WebKit browsers*/
    color:#ffffff;
  }
  input.whiteColor::-moz-placeholder {  /* Mozilla Firefox 4 to 18*/
    color:#ffffff;
  }
  input.whiteColor::-moz-placeholder { /* Mozilla Firefox 19+*/
    color:#ffffff;
  }
  input.whiteColor:-ms-input-placeholder { /* Internet Explorer 10+*/
    color:#ffffff;
  }
</style>
