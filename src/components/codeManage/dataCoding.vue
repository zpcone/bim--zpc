<template>
  <div class="main">
    <div class="left">
      <p>图元树</p>
      <div class="left-content">
        <div class="buttonGroup">
          <Button type="primary">批量编码</Button>
        </div>
        <div class="tree">
          <folderTreeCheck :isData="folderTreeData" :folderClick="folderClick" :left_tree.sync="left_tree" :selectedElementsId="selectedElementsId" :width="folderTreeWidth" :iconClicks="iconClicks" ></folderTreeCheck>
        </div>
      </div>
    </div>
    <div class="center" v-if="isShowCenter">
      <p>图元编码</p>
      <div class="center-content">
        <div class="center-button">
          <Button type="primary">自动生成设备编码</Button>
        </div>
        
        <table width="100%">
          <tr>
            <th>单体</th>
            <th>楼层</th>
            <th>区域</th>
            <th>设备编码</th>
          </tr>
          <tr v-for="singer in singers">
            <td><input v-model="singer.name"></td>
            <td><input v-model="singer.floor"></td>
            <td><input v-model="singer.area"></td>
            <td><input v-model="singer.equipCode"></td>
          </tr>
        </table>
        
        <div class="operate">
          <div class="operate-center">
            <Button type="primary" style="margin-right:10px">确定</Button>
            <Button style="margin-left:10px" @click="isShowCenter=false">取消</Button>
          </div>
        </div>
      </div>
    </div>
    <!--<div class="right" :style="{width: width+'px'}">-->
    <div class="right" :class="{long: isShowCenter}">
      <totalModel></totalModel>
      <div class="code-choose">
        <Button class="code" style="width: 80px" @click="isShowCenter=true">编码</Button>
        <Button class="manyCode">批量编码</Button>
      </div>
    </div>
  </div>
</template>
<script>
import folderTreeCheck from './folderTreeCheck.vue'
import totalModel from '../totalModel.vue'
export default {
  name: 'dataCoding',
  components: {totalModel, folderTreeCheck},
  data () {
    return {
      matchState: '全部',
      matchList: [
        {
          value: '全部',
          label: '全部'
        },
        {
          value: '已匹配',
          label: '已匹配'
        },
        {
          value: '未匹配',
          label: '未匹配'
        },
        {
          value: '多匹配',
          label: '多匹配'
        }
      ],
      folderTreeData: [{
        child: [
          {
            id: '1',
            name: '你说',
            type: 1
          }
        ],
        id: '0',
        name: '全部',
        type: 0
      }],
      left_tree: 0,  // tree的margin-left
      selectedElementsId: '0', // 是否为当前被选中的文件夹
      folderTreeWidth: '',
      singers: [
        {
          name: '1#',
          floor: 'F001',
          area: 'FJ005',
          equipCode: ''
        }
      ],
      width: 600,
      isShowCenter: false
    }
  },
  methods: {
    folderClick (id) {  // 定位到当前显示文件夹的id
    },
    fileLists () {},
    iconClicks () {
      let divWidth = this.$refs.scrollWidth
      this.folderTreeWidth = divWidth
    }
  }
}
</script>
<style scoped>
.main{
  
}
.left, .center, .right{
  position: absolute;
  top: 0;
  bottom: 0;
  box-sizing: border-box;
  border: 1px solid #dcdcdc;
  background-color: #fff;
}
/*左边部分的样式*/
.left{
  width: 220px; 
}
.left>p, .center>p{
  height:30px;
  line-height: 30px;
  text-align: center;
  background-color: #f3f3f3;
}
.left-content {
  padding: 10px;
}
.left-content .tree{
  margin-top: 10px;
}
/*中间部分的样式*/
.center{
  width:300px;
  left: 220px;
}
.center .center-button Button{
  margin: 15px 10px;
  float: right;
}
.center table input{
  width: 70px;
  text-align: center;
}
.center th,td{
  border: 1px solid #dddee1;
  height: 30px;
}
.center td{
  text-align: center;
}

.center th:nth-child(1),td:nth-child(1){
  border-left: none;
}
.center th:nth-child(4),td:nth-child(4){
  border-right: none;
}
.center .operate{
  text-align: center;
}
.center .operate .operate-center{
  margin-top: 30px;
  display: inline-block;
}
/*右边部分的样式*/
.right{
  right: 0;
  left: 230px;
}
.long{
  left: 530px;
}
.right .code-choose{
  position: absolute;
  top: 30%;
  right: 30px;
  width: 80px;
}


</style>
