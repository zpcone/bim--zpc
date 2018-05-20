<template>
  <div class="file_upload_container" :class="{on: !uploadContainer}">
    <p class="file_upload_container_header">
      <span>正在上传：{{files.length}}</span>
      <em :class="{on:!uploadContainer}" @click="uploadContainer=!uploadContainer"></em>
    </p>
    <div class="file_upload_container_main">
      <div class="pro_fileList_back" v-for="(file, index) in files">
        <!--进度条-->
        <div class="pro_fileList_backprogess"  :style="{width:file.progress+'%'}"></div> 
        <p class="pro_fileList clearfix"  :data-id="index">
          <span class="pro_fileList_icon">
            <em class="pro_fileicon_other" :class="{pro_fileicon_rvt:(file.name.substring(file.name.lastIndexOf('.') + 1)=== 'rvt')}"></em>
          </span>
          <span class="pro_fileList_text">
            <em>{{file.name}}</em>
          </span>
          <!--pro_fileList_right_on-->
          <ul class="pro_fileList_right">
            <li class="size">{{file.size | formatSize}}</li>
            <li class="speed">  &nbsp; &nbsp;&nbsp; {{file.progress}}% &nbsp;（{{file.speed | formatSize}}/S） &nbsp;&nbsp;&nbsp;</li>
            <li class="changeState"></li>
            <li class="delete" @click="remove(file), file.active = false"></li>
          </ul>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'newFileUpload',
  data () {
    return {
      uploadContainer: false
    }
  },
  props: {
    files: {
      default: []
    }
  },
  methods: {
    // 移除正在上传的文件
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
    background: url("../../../assets/project_upload_close.png") no-repeat center;
    position: absolute;
    right: 16px;
    top: 10px;
    cursor: pointer;
  }
  .file_upload_container_header em.on{
    background: url("../../../assets/project_upload_open.png") no-repeat center;
  }
  .file_upload_container_main{
    height: 280px;
    width: 100%;
    overflow-y: scroll;
  }
  /* 上传文件条*/
  .pro_fileList_back{
    background-color: #fff;
    position: relative;
  }
  .pro_fileList_backprogess{
    height: 50px;
    background-color: #f0f9ff;
    width: auto;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
  }
  .pro_fileList{
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #e6e6e6;
    z-index: 2;
    position:relative;
    cursor: default;
  }
  .pro_fileList_check{
    float: left;
    margin-top: 15px;
  }
  .pro_fileList_icon{
    display: block;
    height: auto;
    width: auto;
    float: left;
  }
  .pro_fileList_icon em{
    height: 36px;
    display: block;
    width: 52px;
  }
  .pro_fileList_text{
    display: block;
    float: left;
    width: auto;
    height: auto;
    min-width: 300px;
  }
  .pro_fileList_text em{
    height: 36px;
    display: block;
    width: 100%;
    color: #282828;
    line-height: 46px;
    text-align: left;
    max-width: 350px;
    white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
  }
  .pro_fileList_right{
    float: right;
    margin-right: 20px;
    list-style-type: none;
  }
  .pro_fileList_right li{
    float: left;
    height: 49px;
    line-height: 49px;
  }
  .pro_fileList_right .size{
    width: 300px;
  }
  .pro_fileList_right .speed{
    width: 230px;
    font-style: normal;
    color: #646464;
    font-size: 12px;
  }
  .pro_fileList_right .changeState,.delete{
    width: 24px;
    cursor: pointer;
    margin-left: 20px;
  }
  .pro_fileList_right .changeState{
    background: url("../../../assets/project_stop.gif") no-repeat center ;
    
  }
  .pro_fileList_right .delete{
    background: url("../../../assets/project_delete.gif") no-repeat center;
  }
  /* 文件类型显示图片 */
  .pro_fileicon_other{
    background: url("../../../assets/icon/icom_qita.png") no-repeat center bottom;
  }
  .pro_fileicon_rvt {
    background: url("../../../assets/project_revit.png") no-repeat bottom;
  }
</style>

