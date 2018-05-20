<template>
  <div class="md_container" v-if="modelDetailShow">
    <div class="md_header">
      <span>详情</span>
      <em @click="detailClose"></em>
    </div>
    <div class="md_content" :class="{md_content_white:Transform}">
      <div class="md_content_tip" v-if="!Transform">
        <i :class="{fileType:fileType}"></i>
        <span v-show="!fileType">{{transformText}}</span>
        <span>25.6%( 523KB/S )</span>
        <!--<em>29.26%</em>-->
      </div>
      <img :src="thumbnail" alt="" v-if="Transform">
    </div>
    <p class="md_look">
      <input type="button" value="查看模型" @click="lookModel" :class="{'button_on': Transform}" :disabled="!Transform">
      <span>{{username}}</span>
      <em>{{(filesize/1024/1024) > 1024 ? (filesize/1024/1024/1024).toFixed(2) + 'GB' : (filesize/1024/1024).toFixed(2) + 'MB' }}</em>
    </p>
    <p class="md_man">
      <i class="md_man_left">
        <span>上传者：</span>
        <em>{{abbreviatedUserName}}</em>
      </i>
      <!--
      <i class="md_man_right">
        <span>上传时间：</span>
        <em>{{fileCreated}}</em>
      </i>
      -->
    </p>
    <div class="md_text">
      <textarea class="md_textarea" v-model="describeText" maxlength="100" placeholder="版本描述：有利于明确版本差异(100字符)" v-show="textModify"></textarea>
      <div class="md_textarea" v-show="!textModify">
        <div class="md_textarea_div">版本描述 :   </div>
        <textarea v-model="describeText" placeholder="有利于明确版本差异(100字符)" :readonly="!textModify"></textarea>
      </div>
      <p class="md_text_p clearfix" v-show="textModify">
        <i>
          <span @click="describeSure" v-show="describeSureCancel"></span>
          <em @click="describeCancel" v-show="describeSureCancel"></em>
         <div class="md_text_num">
           <b :class="{numbe_on:describeTip}">{{describeAdd}}</b><h5>/</h5><h5>{{describeSub}}</h5>
         </div>
         <h4 v-if="describeTip">添加版本描述最多100个字符</h4>
        </i>
      </p>
      <p v-show="!textModify && !shareId" class="md_text_elsep">
        <b @click="modifyClick"></b>
        <em class="md_text_elseem">{{describeText.length}}/100</em>
      </p>
    </div>
    <div class="md_footer">
      <div class="md_footer_container">
        <input class="md_delete" @click="deleteFileIsShow=true" :class="{md_deleteNo:shareId}" value="删除" type="button"/>
        <input class="md_move" @click="moveFileIsShow=true" :class="{md_moveNo:shareId}" value="移动到" type="button"/>
      </div>
    </div>
    <!-- 删除文件 -->
    <commAlert :modalIsShow.sync="deleteFileIsShow" :width='380' :height='224'>
      <s slot="modalTitle">删除文件</s>
      <div slot="modalText">
        <p class="fileName">达夫楼</p>
        <div class="deletefilelip">
          删除此文件后，将无法恢复。文件的所有内容会被一起删除，您是否确定删除？
        </div>
        <div class="operate">
          <div class="btnGroup">
            <Button type="primary" style="width:80px;margin-right:10px;" class="ensureDelete">确定</Button>
            <Button style="width:80px;margin-left:10px;" @click="deleteFileIsShow=false">取消</Button>
          </div>
        </div> 
      </div>
    </commAlert>
    <!-- 移动到……………… -->
     <commAlert :modalIsShow.sync="moveFileIsShow" :width='340' :height='457'>
      <s slot="modalTitle">达夫楼移动到</s>
      <div slot="modalText">
        <div class="moveContent">
          <div class="selectCopy">
            <Checkbox></Checkbox><label>并复制</label>
          </div>
          <div class="selectProject">
            <span>选择项目:</span>
            <Select size="small" class="select">
              <Option v-for="project in projects" :value="project.value" :key="project">{{project.label}}</Option>
            </Select>
          </div>
          <div class="fileTree">
            <Tree :data="files" show-checkbox></Tree>
          </div>
        </div>
        <div class="operate">
          <div class="btnGroup">
            <Button type="primary" style="width:80px;margin-right:10px;">确定</Button>
            <Button style="width:80px;margin-left:10px;" @click="moveFileIsShow=false">取消</Button>
          </div>
        </div> 
      </div>    
    </commAlert>
  </div>
</template>
<script>
import commAlert from '../../components/comm/commAlert'
export default {
  data () {
    return {
      describeSureCancel: false,
      deleteFileIsShow: false,
      moveFileIsShow: false,
      describeAdd: '0',
      describeSub: '100',
      describeTip: false,
      describeText: '',
      deleteId: '',
      downloadContainer: '',
      downloadName: '',
      username: '',
      textModify: false,
      filesize: '',
      Transform: '',  // 用于区分模型的转换状态
      thumbnail: '',
      fileType: '',
      shareId: '',  // 用于区分是否为分享的文件
      isShare: false,
      transformText: '模型转换中，请稍候......',
      fileCreated: '',
      projects: [
        {
          value: '1',
          label: 'BIMSOP项目组'
        },
        {
          value: '2',
          label: 'BIMSOP项目组2'
        },
        {
          value: '3',
          label: 'BIMSOP项目组3'
        },
        {
          value: '4',
          label: 'BIMSOP项目组4'
        }
      ],
      files: [{
        expand: true,
        title: '全部',
        children: [{
          title: '夏沁园综合楼',
          expand: true,
          disabled: true,
          children: [{
            title: '综合水管案例模型',
            expand: true
          },
          {
            title: '综合管廊示范模型',
            expand: true
          }]
        }]
      }]
    }
  },
  components: {
    commAlert
  },
  mounted () {
  },
  props: {
    modelDetailShow: {  // 此模块是否显示
      default: false
    },
    rvtItem: '',
    abbreviatedUserName: '',
    spaceId: ''
  },
  watch: {
    describeText: function (newValue, old) {
      if (newValue !== '') {
        this.describeSureCancel = true
      }
      this.describeAdd = newValue.length
      this.describeSub = 100 - newValue.length
      if (newValue.length === 100) {
        this.describeTip = true
      }
      if (newValue.length < 100) {
        this.describeTip = false
      }
    },
    rvtItem: function (newId, old) {
      this.deleteFileIsShow = false
      this.deleteId = newId.id
      this.downloadContainer = newId.container
      this.downloadName = newId.changename
      this.username = newId.name
      this.filesize = newId.size
      this.shareId = newId.shareId
      // 获取缩略图地址
      if (newId.RvtTransform === 1) {
        axios.get(this.Comm.getModelFileUrl(newId.changename, 3))
        .then(function (data) {
          if (data.status === _this.Comm.status) {
            _this.thumbnail = _this.Comm.getModelFileUrl(newId.changename, 4) + _this.Comm.transformURL(encodeURI(data.data.Thumbnail.replace(/\\/g, '/').replace('models', '')))
          }
        })
      }
      this.fileCreated = this.Comm.formatTime(newId.created, 7)
      // 根据模型转换状态 判断图片和提示
      if (newId.RvtTransform === 0) {
        this.Transform = false
        this.transformText = '模型转换中，请稍候......'
      } else if (newId.RvtTransform === 1) {
        this.Transform = true
      } else if (newId.RvtTransform === 2) {
        this.Transform = false
        this.transformText = '哎呀！模型转换失败了'
      }
      if (newId.exname !== 'rvt') {
        this.fileType = true
      } else {
        this.fileType = false
      }
      let _this = this
      _this.describeText = ''
      // 不是分享的文件时请求文件描述
      if (!newId.shareId) {
        _this.isShare = false
        axios.get(this.Comm.getAccessTokenUrl('UserFiles/' + newId.id)).then(function (data) {
          if (data.status === _this.Comm.status) {
            if (!data.data.versionDescription) {
              _this.textModify = true
              if (_this.describeText === '') {
                _this.describeSureCancel = false
              }
            } else if (data.data.versionDescription) {
              _this.textModify = false
              _this.describeText = data.data.versionDescription
            }
          }
        })
      } else if (newId.shareId) {
        _this.isShare = true
        axios.get(this.Comm.baseURL + 'ShareFiles/' + newId.id, {
        }).then(function (data) {
          if (data.status === _this.Comm.status) {
            if (!data.data.versionDescription && !_this.isShare) {
              _this.textModify = true
              if (_this.describeText === '') {
                _this.describeSureCancel = false
              }
            } else if (data.data.versionDescription) {
              _this.textModify = false
              _this.describeText = data.data.versionDescription
            }
          }
        })
      }
    }
  },
  methods: {
    shareClick () {
      if (this.Transform) {
        this.$emit('modelDetailShare')
      }
    },
    sureDeleteFile () {
      this.detailDelete()
    },
    modifyClick () {
      this.textModify = true
    },
    sureDownload () {
      if (this.isShare) {
        window.open(this.Comm.baseURL + 'ShareFiles/' + this.rvtItem.id + '/download?access_token=' + this.Comm.getLocalStorage('accessToken'))
      } else if (!this.isShare) {
        window.open(this.Comm.baseURL + 'UserFiles/' + this.rvtItem.id + '/download?access_token=' + this.Comm.getLocalStorage('accessToken'))
      }
    },
    detailDelete: function () {
      let _this = this
      axios.delete(this.Comm.getAccessTokenUrl('UserFiles/' + this.deleteId))
      .then(function (data) {
        if (data.status === _this.Comm.status) {
          _this.$emit('modelDetailDelete')
          _this.$emit('modalDetailClose')
        }
      })
    },
    /*
     * @ 查看模型
     */
    lookModel: function () {
      if (this.isShare) {
        this.$router.push({path: '/browseShare', query: {'rvtId': this.rvtItem.id, 'share': '1', 'authorCode': this.$route.query.authorCode, 'lookCode': this.$route.query.lookCode}})
      } else if (!this.isShare) {
//        this.$router.push({path: '/model/' + this.rvtItem.id + '/' + this.spaceId})
        window.open(window.location.origin + '/#/model/' + this.rvtItem.id + '/' + this.spaceId)
      }
    },
    describeCancel () {
      this.describeText = ''
    },
    describeSure () {
      let _this = this
      axios.put(this.Comm.getAccessTokenUrl('UserFiles/' + this.rvtItem.id), {
        'accessToken': this.accessToken,
        'versionDescription': this.describeText
      }).then(function (data) {
        if (data.status === _this.Comm.status) {
          _this.describeText = data.data.versionDescription
          _this.rvtItem.versionDescription = data.data.versionDescription
          if (!data.data.versionDescription) {
            _this.textModify = true
            if (_this.describeText === '') {
              _this.describeSureCancel = false
            }
          } else if (data.data.versionDescription) {
            _this.textModify = false
            _this.describeText = data.data.versionDescription
          }
        }
      })
    },
    detailClose () {
      this.$emit('modalDetailClose')
    },
    cancelDelete () {
      alert('你好呀')
    }
  }
}
</script>
<style scoped>
  .md_text_elsep{
    height: 24%;
    width: 97%;
    margin: 10px 1.5% 0;
    position: relative;
  }
  .md_text_elsep b{
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -20px;
    cursor: pointer;
    margin-left: 10px;
    display: block;
    height: 20px;
    width: 20px;
    float: left;
    background: url("../../assets/modelDetail_modify.png") no-repeat center;
  }
  .md_text_elsep .md_text_elseem{
    position: absolute;
    margin-top: -20px;
    height: 20px;
    width: auto;
    display: block;
    float: right;
    background: none !important;
    color: #a0a0a0;
    margin-right: 10px;
    top: 50%;
    right: 0;
  }
  .md_textarea_div{
    height: 100%;
    width: 20%;
    max-width: 100px;
    min-width: 80px;
    float: left;
    color: #a0a0a0;
    text-indent: 10px;
  }
  .md_textarea textarea {
    height: 100%;
    width: 77%;
    display: block;
    border: none;
  }
  .md_container{
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    /*width: 30%;*/
    width: 25%;
    min-width: 430px;
    /*min-height: 850px;*/
    background: #ffffff;
    z-index: 99;
    box-shadow: -3px 5px 10px #9fa5ac;
  }
  .md_header{
    background-color: #42b2fc;
    height: 50px;
    width: 100%;
  }
  .md_header em{
    display: block;
    height: 20px;
    width: 20px;
    background: url("../../assets/modelDetail_close.png") no-repeat center;
    position: absolute;
    right: 20px;
    top: 15px;
  }
  .md_header>span{
    color: #ffffff;
    font-size: 16px;
    height: 20px;
    width: 40px;
    line-height: 20px;
    position: absolute;
    left: 18px;
    top: 15px;
  }
  .md_content{
    margin: 12px auto;
    width: 96%;
    height: 40%;
    background: url("../../assets/addSpace_default.png") no-repeat cover;
    background-color: #ebeef0;
    border: 1px solid #cdcdcd;
    border-radius:3px;
    position: relative;
  }
  .md_content_tip{
    height: 160px;
    width: 180px;
    margin: 30% auto;
  }
  .md_content_tip i{
    display: block;
    height: 90px;
    width: 90px;
    background: url("../../assets/modelDetail_rvt.png") no-repeat center;
    margin: 0 auto;
  }
  .md_content_tip .fileType{
    background: url("../../assets/modelDetail_otherfile.png") no-repeat center;
  }
  .md_content_tip span{
    margin-top: 20px;
    height: 16px;
    width:180px;
    display: block;
    color: #a0a0a0;
    text-align: center;
  }
  .md_content_tip span:nth-child(3){
    margin-top: 4px;
  }
  .md_content_tip em{
    display: block;
    height: 16px;
    width: 180px;
    text-align: center;
    font-size: 14px;
    color: #a0a0a0;
    margin-top: 10px;
  }
  .md_content img {
    width: 100%;
    height: auto;
    max-height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .md_content_white{
    background: #ffffff;
  }
  .md_footer{
    width: 100%;
    padding:0 22%;
    height: 60px;
    position: absolute;
    bottom: 0;
    right: 0;
    background: #202939;
  }
  .md_footer input{
    display: block;
    width:20%;
    height: 60px;
    text-align: center;
    color: #ffffff;
    line-height: 90px;
    font-size: 12px;
    cursor: pointer;
    border: none;
  }
  .md_delete{
    float: left;
    background: url("../../assets/modelDetail_delete.png") center 10px no-repeat;
  }
  .md_deleteNo{
    background: url("../../assets/modelDetail_deteleNo.png") center 10px no-repeat;
    color: #5a6a88 !important;
  }
  .md_move{
    float: right;
    background: url("../../assets/modelDetail_move.png") center 10px no-repeat;
  }
  .md_moveNo{
    background: url("../../assets/modelDetail_moveNo.png") center 10px no-repeat;
    color: #5a6a88 !important;
  }
  .md_download{
    background: url("../../assets/modelDetail_download.png") center 10px no-repeat;
  }
  .md_footer .md_share{
    background: url("../../assets/modelDetail_share.png") center 10px no-repeat;
    color: #556682;
  }
  .md_footer .md_shareOn{
    background: url("../../assets/modelDetail_shareOn.png") center 10px no-repeat;
    color: #ffffff;
  }
  .md_footer_container{
    margin: 0 auto;
    height: 100%;
    width: auto;
  }
  .md_manage{
    background: url("../../assets/modelDetail_manage.png") center 10px no-repeat;
  }
  .md_manageNo{
    background: url("../../assets/modelDetail_manageNo.png") center 10px no-repeat;
    color: #5a6a88 !important;
  }
  .md_moveNo{
    background: url("../../assets/modelDetail_manageNo.png") center 10px no-repeat;
    color: #5a6a88 !important;
  }
  .md_look{
    margin-top: 20px;
    height: 34px;
    width: 90%;
    padding: 0 5%;
  }
  .md_look input{
    height: 34px;
    width: 102px;
    background: #f0f0f0;
    color: #c8c8c8;
    outline: none;
    border: none;
    border-radius: 3px;
    display: block;
    float: left;
  }
  .md_look .button_on{
    background: #42b2fc;
    color: #ffffff;
  }
  .md_look span{
    display: block;
    float: left;
    height: 34px;
    line-height: 34px;
    text-indent: 15px;
    width: auto;
    max-width: 200px;
    white-space:nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #282828;
    font-size: 16px;
  }
  .md_look em{
    display: block;
    float: right;
    height: 34px;
    width: 80px;
    text-align: right;
    color: #282828;
    font-size: 16px;
    line-height: 34px;
  }
  .md_man{
    height: 16px;
    width: 90%;
    padding: 0 5%;
    margin-top: 40px;
    font-size: 16px;
    position: relative;
  }
  .md_man i {
    font-style: normal;
  }
  .md_man span{
    color: #a0a0a0;
    display: block;
    float: left;
  }
  .md_man em{
    display: block;
    float: left;
    color: #282828;
    max-width: 105px;
    white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
  }
  .md_man_left {
    max-width: 180px;
    display: block;
    float: left;
  }
  .md_man_right{
    float: right;
    display: block;
    max-width: 220px;
    right: 0;
    text-align: right;
  }
  .md_man_right em{
    max-width: 140px;
  }
  .md_text{
    height: 20%;
    width: 90%;
    margin: 0 5%;
    border: 1px solid #e6e6e6;
    position: absolute;
    bottom: 80px;
  }
  .md_textarea{
    display: block;
    width: 97%;
    height: 73%;
    margin: 2% 1.5% 0;
    border: none;
    text-indent: 28px;
    color: #282828;
    word-break:break-all;
    word-wrap: break-word;
  }
  .md_text_p {
    height: 21%;
    width: 97%;
    margin: 0 1.5%;
    position: relative;
    border-top:1px solid #e6e6e6;
  }
  .md_text_p i {
    display: block;
    height: 30px;
    width: 100%;
    position: absolute;
    top: 50%;
    margin-top: -15px;
  }
  .md_text_p h4{
    float: right;
    height: 30px;
    width:30%;
    min-width: 190px;
    line-height: 30px;
    font-size: 12px;
    color: #f35507;
    background: url("../../assets/project_notice.gif") no-repeat left;
    text-indent: 25px;
  }
  .md_text span{
    display:block;
    float: left;
    height: 30px;
    width: 30px;
    background: url("../../assets/modelDetail_true.png") no-repeat center;
    cursor: pointer;
    margin-right: 5px;
  }
  .md_text em {
    display:block;
    float: left;
    height: 30px;
    width: 30px;
    background: url("../../assets/modelDetail_false.png") no-repeat center;
    cursor: pointer;
  }
  .md_text_num{
    float: right;
    height: 30px;
    width: auto;
    font-size: 14px;
    line-height: 30px;
  }
  .md_text_num h5{
    float: left;
    font-size: 14px;
    color: #a0a0a0;
  }
  .md_text_num b{
    float: left;
    font-weight: normal;
    font-style: normal;
    font-size: 14px;
    color: #42b2fc;
  }
  .numbe_on{
    color: #f35507;
  }
  /*删除文件*/
  /*文件名*/
  .fileName{
    font-size: 15px;
    color: #2d8cf0;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  /*信息提示*/
  .deletefilelip{
    margin:0 60px 20px;
    font-size: 10px;
    background: url(../../assets/project_notice.gif) no-repeat left 6px top;
    box-sizing: border-box;
    padding-left:35px;
    text-align: left;
  }
  /*操作区*/
  .operate{
    height:50px;
    line-height: 50px;
    border-top: 1px solid #dddee1;
    text-align: center;
  }
  .operate .btnGroup{
    display: inline-block;
  }
  .operate .btnGroup .ensureDelete{
    background-color: #ff0000;
    border: 1px solid #ff0000;
  }
  /*移动到 样式表*/
  .moveContent{
    padding: 15px;
  }
  
  .moveContent .selectProject{
    height: 50px;
    line-height: 50px;
  }
  .moveContent .selectProject .select{
    width: 250px;
  }
  .moveContent .fileTree{
    width: 100%;
    height: 260px;
    padding: 0 8px;
    border: 1px solid #dddee1;
    overflow: auto;
  }
</style>
