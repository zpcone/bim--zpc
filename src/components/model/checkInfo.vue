<template>
  <div class="newSinger" v-if="modalIsShow">
    <div class="newSinger-body">
      <div class="title">
        <p>楼层信息————ZQL正气楼</p>
        <span @click="close">×</span>
      </div>
      <div class="operate">
        <div class="operate-left">
          <Button @click="insertFromUp"><Icon type="arrow-up-a" class="icon"></Icon>插入楼层</Button>
          <Button @click="insertFromDown"><Icon type="arrow-down-a" class="icon"></Icon>插入楼层</Button>
          <Button @click="showAutoCreate">自动生成楼层</Button>
          <button class="deleteFloor" v-if="isDeleteFloor"><span>删除楼层</span><button class="cancel" @click="isDeleteFloor=false">取消</button><button class="ensure" @click="ensureDelete">确定</button></button>
        </div>
        <div class="operate-right">
          <p class="searchFile">
            <searchBox v-model="fileName"></searchBox> 
          </p>
        </div>
      </div>
      <div class="datas">
        <table>
          <tr>
            <th>
              <Checkbox v-model="checkboxAll" style="margin-left:7px" @on-change="allChecked"></Checkbox>
            </th>
            <th><p><span>*</span>编码</p></th>
            <th><p><span>*</span>名称</p></th>
            <th><p>建筑层高(m)</p></th>
            <th><p>结构层高(m)</p></th> 
            <th><p>建筑标高(m)</p></th>
            <th><p>结构标高(m)</p></th>
            <th><p>设为首层</p></th>
          </tr>
          <tr v-for="(floor, index) in allFloor">
            <td>
              <Checkbox v-model="checkboxState[index]" style="margin-left:7px" @on-change="deleteFloor(index)"></Checkbox>
            </td>
            <td><input v-bind:readonly="floor.code=='F001'" v-model="floor.code"></td>
            <td><input v-bind:readonly="floor.name=='首层'" v-model="floor.name"></td>
            <td><input v-bind:readonly="floor.buildingHeight==4.2" v-model="floor.buildingHeight"></td>
            <td><input v-bind:readonly="floor.structureHeight==4.2" v-model="floor.structureHeight"></td>
            <td><input v-bind:readonly="floor.buildingElevation==-0.1" v-model="floor.buildingElevation"></td>
            <td><input v-bind:readonly="floor.structureElevation==-0.2" v-model="floor.structureElevation"></td>
            <td><img v-if="newFloor.isFirst" src=""><img v-else="floor.isFirst" src=""></td>
          </tr>
        </table>
      </div>
    </div>
    <!-- 自动生成楼层模块 -->
    <commAlert :modalIsShow.sync="isAutoCreate" :width='504' :height='360'>
      <s slot="modalTitle">自动生成楼层</s>
      <div slot="modalText">
        <div class="autoCreateContent">
          <p>层高单位：M</p>
          <div class="first">
            <span>首层</span>
            <label>建筑层高<Input size="small" class="inputNum" value="0" style="width:50px;margin-left:4px;margin-top:-6px;"></Input></label>
            <label>结构层高<Input size="small" class="inputNum" value="0" style="width:50px;margin-left:4px;margin-top:-6px;"></Input></label>
            <label>建筑底标高<Input size="small" class="inputNum" value="0" style="width:50px;margin-left:4px;margin-top:-6px;"></Input></label>
            <label>结构体标高<Input size="small" class="inputNum" value="0" style="width:50px;margin-left:4px;margin-top:-6px;"></Input></label>
          </div>
          <div class="upfloor">
            <span>地上</span>
            <label>建筑层高<Input size="small" class="inputNum" value="0" style="width:50px;margin-left:4px;margin-top:-6px;"></Input></label>
            <label>结构层高<Input size="small" class="inputNum" value="0" style="width:50px;margin-left:4px;margin-top:-6px;"></Input></label>
            <label>起始楼层<Input-number size="small" class="inputNum" v-model="upStartFloor" :min="0" style="width:62px;margin-left:4px;margin-top:-6px;"></Input-number></label>
            <label>结束楼层<Input-number size="small" class="inputNum" v-model="upEndFloor" :min="0" style="width:62px;margin-left:4px;margin-top:-6px;"></Input-number></label>
          </div>
          <div class="downfloor">
            <span>地下</span>
            <label>建筑层高<Input size="small" class="inputNum" value="0" style="width:50px;margin-left:4px;margin-top:-6px;"></Input></label>
            <label>结构层高<Input size="small" class="inputNum" value="0" style="width:50px;margin-left:4px;margin-top:-6px;"></Input></label>
            <label>起始楼层<Input-number size="small" class="inputNum" v-model="downStartFloor" :min="0" style="width:62px;margin-left:4px;margin-top:-6px;"></Input-number></label>
            <label>结束楼层<Input-number size="small" class="inputNum" v-model="downEndFloor" :min="0" style="width:62px;margin-left:4px;margin-top:-6px;"></Input-number></label>
          </div>
        </div>
        <div class="autoCreateOperate">
          <div class="btnGroup">
            <Button type="primary" style="width:80px;margin-right:10px;">保存</Button>
            <Button style="width:80px;margin-left:10px;" @click="cancelShow">取消</Button>
          </div>
        </div> 
      </div>
    </commAlert> 
  </div>
</template>
<script>
import commAlert from '../comm/commAlert'
import searchBox from './comm/searchBox'
export default {
  name: 'checkInfo',
  components: {commAlert, searchBox},
  data () {
    return {
      newFloor: {
        code: '',
        name: '',
        buildingHeight: 3,
        structureHeight: 3,
        buildingElevation: 2.9,
        structureElevation: 2.8,
        isFirst: false
      },
      allFloor: [{
        code: 'F001',
        name: '首层',
        buildingHeight: 4.200,
        structureHeight: 4.200,
        buildingElevation: -0.100,
        structureElevation: -0.200,
        isFirst: true
      },
      {
        code: 'B01',
        name: '第-1层',
        buildingHeight: 4.400,
        structureHeight: 4.400,
        buildingElevation: -4.500,
        structureElevation: -4.600,
        isFirst: false
      }],
      checkboxState: [false, false], // 表格每行数据对应的checkbox
      checkboxAll: false, // 表格th对应的checkbox
      isDeleteFloor: false,  // 删除楼层框是否显示
      isAutoCreate: false, // 自动生成楼层模块显示
      fileName: '', // 搜索框文件名
      upStartFloor: 0,
      upEndFloor: 0,
      downStartFloor: 0,
      downEndFloor: 0
    }
  },
  props: {
    modalIsShow: {
      default: false
    }
  },
  methods: {
    deleteFloor: function (index) {
      this.isDeleteFloor = true
    },
    allChecked: function () { // checkbox 全选或全不选
      if (this.checkboxAll === false) {
        for (let i = 0; i < this.allFloor.length; i++) {
          this.checkboxState[i] = false
        }
      } else {
        for (let i = 0; i < this.allFloor.length; i++) {
          this.checkboxState[i] = true
        }
      }
    },
    cancelShow: function () {     // 取消 自动生成楼层 的显示
      this.isAutoCreate = false
    },
    insertFromUp: function () {
      let letter = this.allFloor[0].code.substring(0, 1)
      let num = parseInt(this.allFloor[0].code.substring(1))
      if (letter === 'F') {
        let nowNum = num + 1
        if (nowNum.toString.length === 1) {
          this.newFloor.code = letter + '00' + nowNum
        } else if (nowNum.toString.length === 2) {
          this.newFloor.code = letter + '0' + nowNum
        } else {
          this.newFloor.code = letter + nowNum
        }
        this.newFloor.name = '第' + nowNum + '层'
      } else if (letter === 'B' && num === 1) {
        this.newFloor.code = 'F001'
        this.newFloor.name = '首层'
      } else {
        let nowNum = num + 1
        if (nowNum.toString.length === 1) {
          this.newFloor.code = 'B0' + nowNum
        } else if (nowNum.toString.length === 2) {
          this.newFloor.code = 'B' + nowNum
        }
        this.newFloor.name = '第-' + nowNum + '层'
      }
      this.allFloor.unshift(this.newFloor)
      this.checkboxState.unshift(false)
      this.newFloor = {
        code: '',
        name: '',
        buildingHeight: 3,
        structureHeight: 3,
        buildingElevation: 2.9,
        structureElevation: 2.8,
        isFirst: false
      }
    },
    insertFromDown: function () {
      let letter = this.allFloor[this.allFloor.length - 1].code.substring(0, 1)
      let num = parseInt(this.allFloor[this.allFloor.length - 1].code.substring(1))
      if (letter === 'F') {
        let nowNum = num - 1
        if (nowNum.toString.length === 1) {
          this.newFloor.code = letter + '00' + nowNum
        } else if (nowNum.toString.length === 2) {
          this.newFloor.code = letter + '0' + nowNum
        } else {
          this.newFloor.code = letter + nowNum
        }
        this.newFloor.name = '第' + nowNum + '层'
      } else if (letter === 'F' && num === 1) {
        this.newFloor.code = 'B01'
        this.newFloor.name = '第-1层'
      } else {
        let nowNum = num + 1
        if (nowNum.toString.length === 1) {
          this.newFloor.code = 'B0' + nowNum
        } else if (nowNum.toString.length === 2) {
          this.newFloor.code = 'B' + nowNum
        }
        this.newFloor.name = '第-' + nowNum + '层'
      }
      this.allFloor.push(this.newFloor)
      this.checkboxState.push(false)
      this.newFloor = {
        code: '',
        name: '',
        buildingHeight: 3,
        structureHeight: 3,
        buildingElevation: 2.9,
        structureElevation: 2.8,
        isFirst: false
      }
    },
    ensureDelete: function () {
      let m = 0
      for (let i = 0; i < this.checkboxState.length; i++) {
        if (this.checkboxState[i] === true) {
          this.allFloor.splice(i - m, 1)
          m = m + 1
        }
      }
      for (let i = 0; i < this.allFloor.length; i++) {
        this.checkboxState[i] = false
      }
      alert(this.checkboxState)
    },
    showAutoCreate: function () {
      this.isAutoCreate = true
    },
    close () {
      this.$emit('update:modalIsShow', false)
    }
  }
}
</script>
<style scoped>
  /*标题*/
  .newSinger{
    width: 100%;
    background-color: #fff;
  }
  .newSinger-body .title{
    background-color: #1ca1f9;
    color: #ffffff;
    width: 100%;
    height: 30px;
    line-height: 30px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  .newSinger-body .title p{
      display: inline-block;
      margin-left: 15px;
      cursor: default;
  }
  .newSinger-body .title span{
      float: right;
      margin-right: 8px;
      font-size: 22px;
      cursor: pointer;
  }
  /*操作栏*/
  .newSinger-body .operate{
    width:100%;
    height: 54px;
  }
  .newSinger-body .operate-left{
    display: inline-block;
    line-height: 54px;
    height:54px;
  }
  .newSinger-body .operate-left>Button{
    margin-left: 15px;
    color: #2d8cf0;
    background: #ffffff;
  }
  .newSinger-body .operate-left>Button .icon{
    font-size: 14px;
    margin-right: 8px;
  }
  .newSinger-body .operate-right{
    float:right;
    width: 25%;
    height: 54px;
  }
  .deleteFloor{
    display: inline-block;
    height: 32px;
    line-height: 30px;
    border-radius: 4px;
    margin-left: 15px;
    border: 1px solid #dddee1;
  }
  .ensure,.cancel{
    float: right;
    margin-top: 3px;
    margin-right: 6px;
    line-height: 24px;
    width: 46px;
    height: 24px;
    border-radius: 4px;
  }
  .deleteFloor>span{
    display: inline-block;
    height: 30px;
    line-height: 30px;
    padding: 0 15px;
    color: #1ca1f9;
  }
  .ensure{
    background-color: #ff0000;
    color: #ffffff; 
  }
  .cancel{
    background-color: #d9d9d9;
  }
  /*搜索框*/
  .searchFile{
    position: relative;
    width: 100%;
    right: 35px;
    margin-top: 13px;
  }
  /*数据框*/
  
  /*table样式*/
  table{
    width:100%;  
    text-align: center;
  }
  th{
    background:#f7f7f7;
  }
  th,td{
    border-top: 1px solid #dddee1;
    border-bottom: 1px solid #dddee1;
    height: 30px;
    cursor: default;
  }
  table span{
    color: #ff0000;
  }
  table input{
    text-align: center;
  }
  th:not(:nth-child(1)),td:not(:nth-child(1)){
    border-left: 1px solid #dddee1;
  }
  /* autoCreate 部分样式表 */
   /*编辑区*/
  .autoCreateContent{
    padding: 15px;
    border-top: 1px solid #e9eaec;
    border-bottom: 1px solid #e9eaec;
  }
  .autoCreateContent p{
    height: 30px;
    text-align: right;
  }
  
  .autoCreateContent>div{
    position:relative;
    height: 50px;
    border: 1px solid #e9eaec;
    margin-bottom: 15px;
    line-height: 50px;
  }
  
  .autoCreateContent>div span{
    height:14px;
    line-height:14px;
    color: #1ca1f9;
    position: absolute;
    display:inline-block;
    padding: 0 4px;
    background-color: #ffffff;
    left:6px;
    top: -7px;
  }
  .autoCreateContent div label{
    position: relative;
    margin-left:6px;
  } 
  
  .autoCreateOperate{
    height: 72px;
    line-height: 72px;
    text-align: center;
  }
  .autoCreateOperate .btnGroup{
    display: inline-block;
  }
</style>
