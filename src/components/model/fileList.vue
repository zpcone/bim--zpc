<template>
  <div class="file-mainbody" >
    <div >
      <div class="projectleft-main">
        <div class="promain" >
          <div class="spanTree">
            <span>图元树</span>
          </div>
          <div class="tree_btn">
            <button>批量编码</button>
            <button>编辑</button>
          </div>
          <div class="tree" ref="folderTree">
            <FolderTree :isData="folderTreeData" :folderClick="folderClick" :left_tree.sync="left_tree" :selectedElementsId="selectedElementsId" :width="folderTreeWidth" :iconClicks="iconClicks" ></FolderTree>
          </div>

        </div>
      </div>
      <div class="projectright-main" :class="{'projectrights-main':!isExhibition}" >
        <div class="right-main">
          <div class="addfilebtn clearfix">
            <div class="addfileleft">
              <div class="addfiletop">

                <Button class="uploadFile" type="primary" @click="uploadModel">上传模型

                </Button>
                <Button type="primary" class="singerManage"><router-link :to="{ path: '/singerManage'}">单体管理</router-link></Button>
                <Button type="ghost" class="addFile" @click="addFolderClick">添加文件夹</Button>
                <Button type="ghost" class="checkModel"><router-link :to="{ path: '/totalModel'}">查看整体模型</router-link></Button>
              </div>
              <div class="addfilebottom">
                <div class="alldatas-type">
                  <!-- 全部前的checkbox框 -->
                  <p class="proaddress" >
                    <label v-if="crumbsArr.length" >
                      <em @click="returnSuperior" >返回上级</em><s>|</s>
                    </label>
                    <em class="pl15" @click="crumbsClick('0')" >全部</em>
                    <span v-for="item in crumbsArr">
                      <s>></s>
                      <em @click="crumbsClick(item.id)">{{item.name}}</em>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div class="addfileright">
              <p class="searchFile">
                <!--
                <input type="text" placeholder="搜索您的文件">
                <span class="delete-icon">
                  <em>×</em>
                </span>
                <input type="button">
                -->
                <searchBox v-model="fileName"></searchBox>
              </p>
              <Icon class="icon" type="ios-download-outline"></Icon>
            </div>
          </div>
          <div class="alldatas clearfix">
            <div class="alldatas-title">
              <Checkbox class="checkbox" v-model="checkboxAll" @on-change="allChecked"></Checkbox>
              <p>文件名称</p>
              <ul class="alldatas-type-attr clearfix">
                <li><em>*</em>单体匹配</li>
                <li><em>*</em>专业</li>
                <li><em>*</em>标高匹配 </li>
                <li>状态 </li>
                <li>更新时间</li>
              </ul>
            </div>
            <!-- 有数据 -->
            <div class="spacedata">
              <!-- 列表显示 -->
              <div>
                <!-- 添加文件夹 -->
                <div class="pro_fileList_item_add" v-if="newFolderIsShow" >
                  <div class="pro_fileList_history  clearfix" >
                    <span class="pro_icon pro_icon_folder ml15"></span>
                    <input class="pro_history_inputfolders" type="text" placeholder="添加文件夹" v-model="newFolderName" maxlength="10" @keyup.enter="addFloderClick" >
                    <label class="pro_history_sureaddfolder" @click="addFloderClick" title="添加文件夹" ></label>
                    <label class="pro_history_delfolder" @click="cancelAddFloder" title="删除" ></label>
                    <span class="pro_history_lips" v-if="newFolderLipIsShow"><div>{{newFolderLipInfos}}</div></span>
                  </div>
                </div>

                <!-- 文件列表-->
                <div v-if="fileArrLists.length"><!--v-if="fileArrLists.length"-->

                  <div class="pro_fileList_parent" >
                    <div v-for="(item, index) in fileArrLists" class="pro_fileList_item">
                      <div class="pro_fileList_history clearfix">
                        <Checkbox v-model="checkboxState[index]"></Checkbox>
                        <p><img src="../../assets/project_revit.png"><span @click="modelDetailIsShow=true">{{item.name}}</span></p>
                        <ul class="floatAll">
                          <li>
                            <Select class="selectSinger" v-model="fileArrLists[index].singerMatch">
                              <Option class="nomalOption" v-for="singer in singers" :value="singer.value" :key="singer">{{ singer.label }}</Option>
                              <!--
                              <Option class="specialOption" value="newCreateSingerBtn"><Button type="primary">新建匹配单体</Button></Option>
                              -->
                              <p class="specialOption"><Button type="primary"><router-link :to="{ path: '/singerManage/'+ this.bool }">新建匹配单体</router-link></Button></p>
                            </Select>
                          </li>
                          <li>
                            <Select class="selectBuilding" v-model="fileArrLists[index].professor">
                              <Option class="nomalOption" v-for="building in buildings" :value="building.value" :key="building">{{ building.label }}</Option>
                            </Select>
                          </li>
                          <li>
                            <Select class="selectElevation" v-model="fileArrLists[index].standardMatch">
                              <Option class="nomalOption" v-for="elevation in elevations" :value="elevation.value" :key="elevation">{{ elevation.label }}</Option>
                            </Select>
                          </li>
                          <li>
                            <p class="matchState">
                              <p v-if="item.state==1" class="successMatch">匹配成功</p>
                              <p v-if="item.state==0" class="noMatch">未匹配</p>
                              <p v-if="item.state==-1" class="failMatch"><span><router-link :to="{ path: '/matchFail'}">匹配失败</router-link></span></p>
                            </p>
                          </li>
                          <li>
                            <p class="updateTime">{{item.updateTime}}</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <!-- 无数据 -->
              <div class="spacenodata" v-if="!fileArrLists.length"></div>
            </div>
          </div>
          <!-- 新文件上传 -->
          <newFileUpload class="newFileUploadClass"
            :files="files">
          </newFileUpload>
        </div>
        <!--模型详情-->
        <modelDetail class="modelDetailClass"
          :abbreviatedUserName="abbreviatedUserName"
          :modelDetailShow.sync="modelDetailIsShow"
          @modalDetailClose="modelDetailIsShow=false"
          :describeText="describeText"
          :rvtItem="rvtItem"
          :spaceId="spaceId"
          @modelDetailDelete="refreshFileList(),getSpaceSize()"
          @modelDetailShare="modelDetailShare(rvtItem)">
        </modelDetail>
      </div>
    </div>
    <!-- 删除文件 -->
  </div>
</template>
<script>
  import commModal from '../comm/commModal'
  import FolderTree from './folderTree'
  import modelDetail from './modalDetail'
  import Tree from '../modules/tree'
  import newFileUpload from './comm/newFileUpload'
  import searchBox from './comm/searchBox'
  // import oss from '../../modules/oss'
  export default {
    name: 'fileList',
    components: {commModal, FolderTree, modelDetail, newFileUpload, searchBox},
    data () {
      return {
        folderTreeData: [{
          child: [
            {
              id: '0',
              name: '你说',
              type: 0
            }
          ],
          id: '0',
          name: '全部',
          type: 0
        }],
        bool: true,
        uploadContainer: false, // 文件上传容器显示控制
        selectedElementsId: '0',
        folderTreeWidth: '',
        isExhibition: true,   // 左侧是否展开
        checkedAllIcon: '',
        abbreviatedUserName: '',
        describeText: '',
        rvtItem: '',
        spaceId: this.$route.params.spaceId,
        fileName: '',
        fileArrLists: [
          {
            name: '达夫楼',
            singerMatch: '',
            professor: '',
            standardMatch: '',
            state: -1,
            updateTime: '2016-11-23 13:07'
          }
        ],
        crumbsArr: [],
        newFolderIsShow: false,
        historyEditionLists: [1, 2],
        describeMouse: '',
        files: [  // 正在上传的文件
          {
            name: '易烊千玺.rvt',
            describe: '好看的小哥哥',
            progress: 60,
            speed: 20,
            size: 135000
          },
          {
            name: '易烊千玺.rvt',
            describe: '好看的小哥哥',
            progress: 28,
            speed: 20,
            size: 135000
          },
          {
            name: '易烊千玺1.rvt',
            describe: '好看的小哥哥',
            progress: 99,
            speed: 20,
            size: 135000
          },
          {
            name: '易烊千玺.rvt',
            describe: '好看的小哥哥',
            progress: 45,
            speed: 20,
            size: 135000
          },
          {
            name: '易烊千玺.rvt',
            describe: '好看的小哥哥',
            progress: 76,
            speed: 20,
            size: 135000
          },
          {
            name: '易烊千玺.rvt',
            describe: '好看的小哥哥',
            progress: 10,
            speed: 20,
            size: 135000
          },
          {
            name: '易烊千玺.rvt',
            describe: '好看的小哥哥',
            progress: 100,
            speed: 20,
            size: 135000
          }
        ],
        modelDetailIsShow: false,
        left_tree: 0,
        singerSelect: '',  // 单体匹配选择
        buildingSelect: '', // 专业选择选择
        elevationSelect: '',  // 标高匹配选择
        checkboxState: [false], // 所有单体的被选择状态
        checkboxAll: false, // 选择全部单体
        newFolderName: '',
        newFolderLipIsShow: false,
        newFile: {
          name: '',
          singerMatch: '',
          professor: '',
          standardMatch: '',
          state: 0,
          updateTime: ''
        },
        singers: [
          {
            value: '达夫楼',
            label: '达夫楼'
          },
          {
            value: '东陵楼',
            label: '东陵楼'
          },
          {
            value: '春华园楼',
            label: '春华园楼'
          },
          {
            value: '夏沁苑楼',
            label: '夏沁苑楼'
          },
          {
            value: '科技楼',
            label: '科技楼'
          },
          {
            value: '艺术楼',
            label: '艺术楼'
          }
        ],
        buildings: [
          {
            value: '建筑',
            label: '建筑'
          },
          {
            value: '结构',
            label: '结构'
          },
          {
            value: '给排水',
            label: '给排水'
          },
          {
            value: '暖通',
            label: '暖通'
          },
          {
            value: '电气',
            label: '电气'
          },
          {
            value: '幕墙',
            label: '幕墙'
          },
          {
            value: '装修',
            label: '装修'
          },
          {
            value: '景观',
            label: '景观'
          }
        ],
        elevations: [
          {
            value: '建筑标高',
            label: '建筑标高'
          },
          {
            value: '结构标高',
            label: '结构标高'
          }
        ]
      }
    },
    methods: {
      /*
       * @ 路径数组(面包屑)
       */
      crumbs (id) {
        let newTree = new Tree()
        return newTree.getFathers(this.folderData, id)
      },
      /*
       * @ 面包屑路径点击事件
       */
      crumbsClick (id) {
        if (this.isActive) return
        this.id = id
        this.selectedElementsId = id
        this.refreshFileList()
      },
      /*
      * 模型树的宽度
      */
      iconClicks () {
        let divWidth = this.$refs.folderTree.scrollWidth
        this.folderTreeWidth = divWidth
      },
      /*
       * @ 刷新列表
       */
      refreshFileList () {
        this.checkedAllChange() // 选择框重置为空
        this.getFolderTree()  // 左侧文件树
        this.fileLists()      // 右侧文件列表
      },
      checkedAllChange () {},
      getFolderTree () {},
      addFolderClick () {
        if (this.isActive) return
        this.newFolderIsShow = true
        this.isActive = true
      },
      addFloderClick () {
        let _this = this
        this.newFolderLipIsShow = false
        if (this.Comm.trim(this.newFolderName).length <= 0) {
          this.newFolderLipIsShow = true
          this.newFolderLipInfos = '文件（夹）名称不能为空，请输入文件名称'
          return
        }
        axios.post(this.Comm.getAccessTokenUrl('Spaces/' + this.spaceId + '/UserFiles'), {
          noExname: this.newFolderName,
          name: this.Comm.trim(this.newFolderName),
          userId: this.userId,
          type: 0,
          father: this.id,
          spaceId: this.spaceId
        })
        .then(function (data) {
          if (data.status === _this.Comm.status) {
            if (data.data.error && data.data.error.status === 400) {
              _this.newFolderLipIsShow = true
              _this.newFolderLipInfos = '文件夹重命名问题，同一目录已有此文件名，请重新命名'
              return
            }
            _this.newFolderName = ''
            _this.newFolderIsShow = false
            _this.isActive = false
            _this.newFolderLipInfos = ''
            _this.refreshFileList()
          }
        })
      },
      folderClick (id) {
        if (this.isActive) return
        this.id = id
        if (id === 0) {
          this.crumbsArr = []
        } else {
          this.crumbsArr = this.crumbs(this.id)
        }
        this.selectedElementsId = id
        this.fileLists()
      },
      fileLists () {},
      /* 取消添加文件夹 */
      cancelAddFloder () {
        this.newFolderIsShow = false
        this.newFolderName = ''
        this.newFolderLipIsShow = false
        this.isActive = false
      },
      uploadModel () {
        console.log('nihaoya')
        this.newFile.name = '达夫楼.rvt'
        this.fileArrLists.unshift(this.newFile)
        this.newFile = {
          name: '',
          singerMatch: '',
          professor: '',
          standardMatch: '',
          state: 0,
          updateTime: ''
        }
        console.log(this.fileArrLists)
      },
      allChecked: function () {    // checkbox 全选或全不选
        if (this.checkboxAll === false) {
          for (let i = 0; i < this.fileArrLists.length; i++) {
            this.checkboxState[i] = false
          }
        } else {
          for (let i = 0; i < this.fileArrLists.length; i++) {
            this.checkboxState[i] = true
          }
        }
      },
      /*
       * @ 移除正在上传的文件
       */
      remove (file) {
        var index = this.files.indexOf(file)
        if (index !== -1) {
          this.files.splice(index, 1)
        }
      }
    }
  }
</script>
<style scoped>
  /*公共样式*/
  .checkbox{
    margin: 0;
  }
  /* 右侧文件操作 */
  .right-main{
    min-width:1000px;
  }
  /* 新上传文件 */
  .file_upload_container{
    position: absolute;
    bottom: 15px;
    height: 322px;
    width: 100%;
    box-shadow: 0 -3px 10px #e9e9e9;
    background: #ffffff;
    z-index: 2;
    overflow: hidden;
  }
  .file_upload_container.on{
    height: 40px;
  }
  .file_upload_container_header{
    height: 40px;
    background: #f7f7f7;
    position: relative;
    border-bottom: 1px solid #e6e6e6;
  }
  .file_upload_container_header span{
    height: 40px;
    width: 100px;
    position: absolute;
    line-height: 40px;
    left: 16px;
  }
  .file_upload_container_header em{
    display: block;
    height: 20px;
    width: 20px;
    background: url("../../assets/project_upload_close.png") no-repeat center;
    position: absolute;
    right: 16px;
    top: 10px;
    cursor: pointer;
  }
  .file_upload_container_header em.on{
    background: url("../../assets/project_upload_open.png") no-repeat center;
  }
  .file_upload_container_main{
    height: 280px;
    width: 100%;
    overflow-y: scroll;
  }
  /* 左侧文件数 */
  .tree{
    padding: 10px 0;
    overflow: auto;
    width: 100%;
    position: absolute;
    top: 10px;
    bottom: 130px;
  }
  /* alldatas 里的alldatas-title*/
  .alldatas-title{
    padding:0 20px;
    border-top:#dcdcdc solid 1px;
    border-bottom:#dcdcdc solid 1px;
    background: #f7f7f7;
    height:40px;
    line-height: 38px;
    overflow: hidden;
  }

  .alldatas-title p{
    display:inline-block;
    font-size:12px;
    padding-left: 10px;
    cursor: pointer;
  }
  /* alldatas 的 item */
  .pro_fileList_item{
    height: 46px;
    border-bottom: 1px solid #e6e6e6;
  }
  .pro_fileList_item:hover{
    background:#f0f9ff;
  }
  .pro_fileList_item p{
    cursor: default;
    display: inline-block;
    text-align: center;
    font-size: 12px;
  }
  .pro_fileList_item>div>p>span:hover{
    color: #2d8cf0;
    border-bottom: 1px solid #2d8cf0;
  }
  .pro_fileList_item p img{
    margin-right: 10px;
  }
  .floatAll{  /*文件名称下的文件各项*/
    float: right;
  }
  .floatAll>li{
    float:left;
    height: 46px;
    line-height: 46px;
    margin-left: 50px;
  }

  .alldatas-type-attr li:nth-child(4){
    width: 54px;
    text-align: center;
  }
  .alldatas-type-attr li:nth-child(5){
    width: 100px;
  }

  .pro_fileList_item .selectSinger, .selectBuilding, .selectElevation{
    margin-bottom: 4px;
    height: 30px;
  }
  .pro_fileList_item .selectSinger, .alldatas-type-attr li:nth-child(1){
    width: 160px;
  }
  .pro_fileList_item .selectBuilding, .alldatas-type-attr li:nth-child(2){
    width: 80px;
  }
  .pro_fileList_item .selectElevation, .alldatas-type-attr li:nth-child(3){
    width: 100px;
  }

  .successMatch{
    color: #2d8cf0;
  }
  .noMatch{
    color: #bbbec4;
  }
  .failMatch a{
    color: #ff0000;
  }
  .failMatch span{
    border: 1px solid #dddee1;
    padding: 2px;
  }
  .updateTime{
    width:100%;
  }
  .specialOption{
    width:100%;
    text-align: center;
  }
  .specialOption a{
    color: #ffffff;
  }
  /*  数据列表   */
  .spacedata{
    position: absolute;
    top:125px;
    width:100%;
    bottom:0;
    box-sizing: border-box;
    background: #fff;
    overflow-y:auto;
    padding-bottom:50px;
  }
  .spacenodata{
    position: absolute;
    top:102px;
    width:100%;
    bottom:0;
    background: url(../../assets/project_nodata.png) no-repeat top 25% center;
    text-align: center;
    min-height: 500px;
    box-sizing: border-box;
  }
  /*   所有数据列表    */
  .alldatas-type{
    line-height: 40px;
  }
  .proaddress{
    display:inline-block;
    font-size:12px;
    color:#42b2fc;
  }
  .proaddress label s{
    padding-left:10px;
    color:#dcdcdc;
  }
  .proaddress em{
    cursor: pointer;
  }
  .proaddress span:last-child{
    color:#000;
  }
  .proaddress span s{
    color:#42b2fc;
  }
  .el-checkbox__inner.is-focus{
    border:#c8c8c8 solid 1px;
  }
  .alldatas-type-attr{
    float: right;
  }
  .alldatas-type-attr li{   /*文件名称项*/
    float:left;
    height: 38px;
    line-height: 38px;
    font-size:12px;
    background:#f7f7f7;
    margin-left: 50px;
  }
  .alldatas-type-attr li:nth-child(5){
    text-align: center;
  }
  .alldatas-type-attr li em{
    margin-right:2px;
    color: #ff0000;
  }
  .addfileright{
    text-align: center;
    float:right;
    width: 25%;
    height: 70px;
  }
  /*   右侧  title 上传模型 单体管理   */
  .addfilebtn{
    padding:15px 15px 0 15px;;
    height:85px;
    box-sizing: border-box;
  }
  .addfileleft{
    display:inline-block;
  }
  .addfiletop{
    height:30px;
  }
  .addfilebottom{
    height:40px;
  }
  .file-upload{
    display: block;
    width: 80px;
    height: 30px;
    position: absolute !important;
    left:0;
    top:0;
    opacity: 0;
  }
  .addfiletop>Button{
    margin-right: 10px;
  }
  Button.uploadFile{
    position: relative;
  }
  Button.singerManage a{
    color: #ffffff;
  }
  .addFile, .checkModel{
    color: #2d8cf0
  }
  /*模型详情*/
  .modelDetailClass{
    transition: all 1s;
  }
  .modelDetailClass.v-enter, .modelDetailClass.v-leave{
    width: 0;
    opacity: 0;
  }
  .modelDetail_click{
    height: 100%;
    width: auto;
  }
  /*上传文件*/
  .pro_fileList_item_add{
    border-bottom:1px solid #e6e6e6;
  }
  .pro_fileList_parent:last-child .pro_fileList_item:last-child{
    border-bottom:#e6e6e6 solid 1px;
  }
  .pro_fileList_parent:last-child .pro_fileList_item{
    border-bottom:1px solid #e6e6e6;
  }
  .pro_fileList_item_hover{
    background:#f0f9ff;
  }
  .pro_fileList_history{
    height: 46px;
    line-height: 46px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .pro_icon{
    display: block;
    float: left;
    margin-left: 20px;
    margin-right: 6px;
    width: 30px;
    height: 46px;
    position: relative;
  }
  /* rvt 类型文件显示图片 */
  .pro_icon_rvt{
    background: url("../../assets/project_revit.png") no-repeat center;
  }
  .pro_icon_folder{
    background: url("../../assets/icon/icom_wenjianjia.png") no-repeat center;
  }
  .pro_icon_other{
    background: url("../../assets/icon/icom_qita.png") no-repeat center;
  }
  .pro_history_inputfolders{
    float:left;
    height:26px;
    border:#dcdcdc solid 1px;
    padding:0 10px;
    width:128px;
    margin:10px 0;
    border-radius: 2px;
  }
  /*.pro_history_inputfolders_exname{*/
    /*float: left;*/
    /*margin-top: 13px;*/
  /*}*/
  .pro_history_sureaddfolder{
    background:url("../../assets/project_sureaddfolder.png") no-repeat center;
    float:left;
    width:26px;
    height:26px;
    margin:10px 0 10px 15px;
  }
  .pro_history_delfolder{
    background:url("../../assets/project_deladdfolder.png") no-repeat center;
    float:left;
    width:26px;
    height:26px;
    margin:10px 0 10px 15px;
  }
  .pro_history_lips{
    position: absolute;
    left: 300px;
    background: #fffdea;
    border:#f35b10 solid 1px;
    border-radius: 2px;
    display: inline-block;
    margin:9px 0  6px 30px;
    font-size:12px;
    line-height: 26px;
    color:#f35b10;
  }
  .pro_history_lips div{
    height: 26px;
    background: url(../../assets/icom_tishi.png) no-repeat left 10px center;
    padding:0 10px 0 40px;
  }
  /* 不同种文件的不同图标样式 */
  .pro_fileicon_folder{
    background: url("../../assets/icon/icom_wenjianjia.png") no-repeat center bottom;
  }
  .pro_fileicon_other{
    background: url("../../assets/icon/icom_qita.png") no-repeat center bottom;
  }
  .pro_fileicon_rvt {
    background: url("../../assets/project_revit.png") no-repeat bottom;
  }
  /*上传文件结束
  .addfilebtn button{
    float:left;
    display: inline-block;
    border:#b3e0fe solid 1px;
    height: 30px;
    border-radius: 4px;
    margin-right:15px;
    background: #fff;
  }
  .addfilebtn button:hover{
    border:#42b2fc solid 1px;
    color:#008fee;
  }
  .addfilebtn button a{
    display: inline-block;
    padding:0 10px 0 10px;
    color:#1ca1f9;
  }
  */
  /* 左侧文件树  */
  .projectleft-main{
    position:absolute;
    width:270px;
    top:10px;
    left:0;
    bottom:10px;
    border:1px solid #dcdcdc;
    box-sizing: border-box;
    overflow: auto;
    background-color:#ffffff;
  }

  .projectright-main{
    position:absolute;
    box-sizing:border-box;
    top:10px;
    right:0;
    left:270px;
    bottom:10px;
    border-radius:4px;
  }
  .projectrights-main{
    left:60px;
  }
  .promain{
    position: relative;
    height: 100%;
    box-sizing: border-box;
    padding-top:0;
  }
  .promain .spanTree{
    text-align: center;
    width: 100%;
    height: 30px;
    background-color: #eff6ff;
  }
  .promain .spanTree >span {
    line-height: 30px;
  }
  .promain .tree_btn{
    color: #FFF;
    margin-top: 20px;
    width: 100%;
    height: 30px;
  }
  .promain .tree_btn button{
    width: 70px;
    height:100%;
    border-radius: 5px;
  }
  .tree_btn button:nth-child(1){
    background-color: #62a3ff;
    margin-left: 20px;
  }
  .right-main{
    position: absolute;
    left:10px;
    top:0;
    bottom:0px;
    right:10px;
    border: #dcdcdc solid 1px;
    background: #fff;
  }
  /*   搜索框   */
  .searchFile{
    float: left;
    width: calc(100% - 35px);
    margin-top: 13px;
  }
  .icon{
    height: 30px;
    line-height:30px;
    margin-top: 11px;
    font-size: 32px;
  }
  /* 项目文档 左侧底部 */
  .projectL-bottom{
    padding:20px;
    width: 100%;
    position: absolute;
    bottom:0;
    box-sizing: border-box;
    background: #3c4b64;
  }
  .fold{
    height: 40px;
    line-height:40px;
    display: inline-block;
    padding-left:30px;
    color:#fff;
  }
  .foldleft{
    background:url(../../assets/project_foldl.png) no-repeat left center;
  }
  .foldright{
    float: right;
    background:url(../../assets/project_foldr.png) no-repeat right center;
  }
  .projectL-bottom p{
    line-height: 40px;
    color:#a0a0a0;
    font-size:14px;
  }
  .projectL-bottom p label{
    color:#42b2fc;
    float:right;
  }
  .el-progress-bar__outer{
    background:#202939;
  }
  .el-progress-bar__inner{
    background: #42b2fc;
  }
  /* 工具  */
  .pro_fileList_item:hover .pro_tools{
    display: block;
  }
  .pro_fileList_parent:first-child .pro_tools li em{
    top:38px;
  }
  .pro_fileList_parent:first-child .pro_tools_file_rename em{
    top:35px;
  }
  .pro_fileList_parent:first-child .pro_history_tip{
    top:45px !important;
  }
  .pro_tools{
    float:right;
    display: none;
  }
  .pro_tools li{
    float:left;
    margin:11px 10px;
    position: relative;
  }
  .pro_tools li em{
    position: absolute;
    top:-37px;
    display: block;
    height: 20px;
    line-height: 20px;
    padding:0 8px;
    border:#9cd4fa solid 1px;
    left:-50%;;
    white-space:nowrap;
    z-index:10;
    color:#4caef9;
    font-size:12px;
    display: none;
    background: #fff;
  }
  .pro_tools_file em {
    position: absolute;
    top:-40px;
    height: 20px;
    line-height: 20px;
    padding:0 8px;
    border:#9cd4fa solid 1px;
    left:-17px;
    white-space:nowrap;
    z-index:10;
    color:#4caef9;
    font-size:12px;
    display: none;
    background: #fff;
  }
  .pro_tools li:nth-child(2) em{
    left:-60%;
  }
  .pro_tools li:nth-child(3) em{
    left:-55%;
  }
  .pro_tools li:nth-child(5) em,
  .pro_tools li:nth-child(6) em{
    left:-100%;
  }
  .pro_tools li span{
    display:inline-block;
    width:20px;
    height:20px;
    cursor: pointer;
  }
  .pro_tools li:hover em{
    display: block;
  }
  .pro_tools_delete{
    background:url(../../assets/btn/icom_shanchu.png) no-repeat center;
  }
  .pro_fileList_item:hover .pro_tools_file{
    display: block;
  }
  .pro_tools_file{
    display: none;
    float:right;
    height: 46px;
    width: 100px;
    font-size: 12px;
    margin-right: 5px;
  }
  .pro_tools_file_rename .pro_history_tip{
    top: -50px;
  }
  .pro_tools_file_rename:hover em{
    display: block;
  }
  .pro_tools_file_history{
    display: block;
    float: left;
    margin-left: 20px;
    height: 16px;
    width: 50px;
    border: 1px solid #42b2fc;
    color: #42b2fc;
    margin-top: 14px;
    font-size: 12px !important;
    line-height: 16px;
    cursor: pointer;
    border-radius: 2px;
  }
  .pro_tools_file_history_active{
    color: #2258c2;
  }
  /*  删除文件夹   */
  .breadcrumb{
    text-align:center;
    color:#a0a0a0;
    font-size:16px;
  }
  .breadcrumb span:last-child{
    color:#f25508;
  }
  .breadcrumb span label{
    color:#a0a0a0;
  }
  .deletefilelip{
    margin:0 60px;
    line-height: 24px;
    background: url(../../assets/project_notice.gif) no-repeat left top 15px;
    box-sizing: border-box;
    padding-left:35px;
    padding-top:15px;
    text-align: left;
  }
  /*  左侧添加文件夹   */
  .addfoldesbox p{
    text-align: center;
    color:#a0a0a0;
    line-height: 30px;
    font-size:16px;
    padding-bottom:15px;
  }
  .addfoldesbox p span:last-child{
    color:#42b2fc;
  }
  .addfoldesbox input{
    width: 100%;
    height: 36px;
    border:#e8e8e8 solid 1px;
    border-radius: 4px;
    padding:0 15px;
    box-sizing: border-box;
  }
  /* 容量超出提示 */
  .capacityExceeded_tip span{
    display: block;
    width: 100px;
    height: 20px;
    color: #f25508;
    margin: 0 auto;
    padding-left: 30px;
    background:url("../../assets/icom_tishi.png") no-repeat left;
  }
  .capacityExceeded_tip p{
    display: block;
    height: 40px;
    width: 320px;
    margin: 20px auto 0;
  }
  .capacityExceeded_tip a {
    color: #42b2fc;
  }
</style>
