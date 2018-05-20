<template>
  <div class="analybox">
    <drag></drag>
    <div class="addtype clearfix">
      <div class="addtype_l">
        <span>属性</span>
        <Select v-model="model2" style="width:100px">
          <Option v-for="item in cityList" :value="item.value" :key="item">{{ item.label }}</Option>
        </Select>
        <span class="pdl">系统分类</span>
        <Select v-model="model2" style="width:100px">
          <Option v-for="item in cityList" :value="item.value" :key="item">{{ item.label }}</Option>
        </Select>
        <span class="pdl" >运行状态</span>
        <Select v-model="model2" style="width:100px">
          <Option v-for="item in cityList" :value="item.value" :key="item">{{ item.label }}</Option>
        </Select>
        <span class="pdl" >
          <Input v-model="value4" icon="ios-search" placeholder="请输入名称，编号" style="width: 200px"></Input>
        </span>
      </div>
      <div class="addtype_r">
        <input type="button" id="exportewm" value="导出二维码">
        <input type="button" id="addsb" class="bj" value="添加设备">
      </div>
    </div>

    <div class="add_equipment_box">
      <table width="100%" class="add_equipment_table">
        <thead>
        <tr>
          <th width="4%" class="tl"><input type="checkbox" name="" value=""></th>
          <th width="11%">编号</th>
          <th width="25%">名称</th>
          <th width="10%">属性</th>
          <th width="15%">安装位置</th>
          <th width="10%">当前状态</th>
          <th width="10%">二维码</th>
          <th width="15%">操作</th>
        </tr>
        </thead>
      </table>
      <div class="add_equipment_list">
        <table width="100%" class="add_equipment_table">
          <tbody>
          <tr v-for="(item,index) in equipmentArr">
            <td width="4%" class="tl"><input type="checkbox" name="" value=""></td>
            <td width="11%">170301001</td>
            <td width="30%">生活水浆 1#</td>
            <td width="10%">计量表</td>
            <td width="15%">1号楼-1层-101室</td>
            <td width="5%">运行</td>
            <td width="10%" class="cur" @click="erWeiMa = true">查看</td>
            <td width="15%" class="cur">
              <router-link :to="{ path: '/equipmentDetail'}" >查看</router-link>
              <span>编辑</span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <commModal :modalIsShow.sync="running" :width='400' :height='600'>
      <s slot="modalTitle">设备设施运行状态</s>
      <div slot="modalText">
        <div class="checkbox">
          <h3>设备运行状态：
            <Checkbox
              :indeterminate="indeterminate"
              :value="checkAll"
              @click.prevent.native="handleCheckAll">全选</Checkbox>
          </h3>
          <div class="check-list">
            <Checkbox-group v-model="checkAllGroup" @on-change="checkAllGroupChange">
              <Checkbox label="全选"></Checkbox>
              <Checkbox label="停用"></Checkbox>
              <Checkbox label="故障"></Checkbox>
              <Checkbox label="手动"></Checkbox>
              <Checkbox label="自动"></Checkbox>
              <Checkbox label="远程"></Checkbox>
            </Checkbox-group>
          </div>
        </div>
        <div class="checkbox">
          <h3>设备运行状态：
            <Checkbox
              :indeterminate="indeterminate"
              :value="checkAll"
              @click.prevent.native="handleCheckAll">全选</Checkbox>
          </h3>
          <div class="check-list">
            <Checkbox-group v-model="checkAllGroup" @on-change="checkAllGroupChange">
              <Checkbox label="设计"></Checkbox>
              <Checkbox label="安装"></Checkbox>
              <Checkbox label="调试"></Checkbox>
              <Checkbox label="交付"></Checkbox>
              <Checkbox label="启用"></Checkbox>
              <Checkbox label="报废"></Checkbox>
              <Checkbox label="运行"></Checkbox>
              <Checkbox label="停用"></Checkbox>
              <Checkbox label="故障"></Checkbox>
              <Checkbox label="保养"></Checkbox>
              <Checkbox label="手动"></Checkbox>
              <Checkbox label="自动"></Checkbox>
              <Checkbox label="远程"></Checkbox>
              <Checkbox label="本地"></Checkbox>
            </Checkbox-group>
          </div>
        </div>
        <div class="checkbox">
          <h3>设施运行状态：
            <Checkbox
              :indeterminate="indeterminate"
              :value="checkAll"
              @click.prevent.native="handleCheckAll">全选</Checkbox>
          </h3>
          <div class="check-list">
            <Checkbox-group v-model="checkAllGroup" @on-change="checkAllGroupChange">
              <Checkbox label="设计"></Checkbox>
              <Checkbox label="安装"></Checkbox>
              <Checkbox label="调试"></Checkbox>
              <Checkbox label="交付"></Checkbox>
              <Checkbox label="启用"></Checkbox>
              <Checkbox label="报废"></Checkbox>
            </Checkbox-group>
          </div>
        </div>
        <div class="btnlist">
          <input type="button" class="btn bj m10" value="确 定">
          <input type="button" class="btn m10" value="取 消">
        </div>
      </div>
    </commModal>
    <!-- 二维码 -->
    <commModal :modalIsShow.sync="erWeiMa" :width='400' :height='450'>
      <s slot="modalTitle">查看二维码</s>
      <div slot="modalText">
        <ul class="sbinfos">
          <li>设备名称：生活水浆1#</li>
          <li>设备编码：SHSB-01</li>
          <li>安装位置：1号楼-餐饮楼 厨房</li>
        </ul>
        <div class="ewm">
          <img src="../../assets/ewm.png" alt="">
        </div>
        <div class="btnlist">
          <input class="btn bj" type="button" value="确 定">
        </div>
      </div>
    </commModal>

  </div>
</template>

<script>
  import commModal from '../comm/commModal'
  import drag from '../comm/commDrag'
  export default {
    name: 'equipmentList',
    data () {
      return {
        running: false,   // 运行状态
        erWeiMa: false,    // 二维码
        modalIsShow: true,
        cityList: [
          {
            value: '0',
            label: '全部'
          }
        ],
        model1: '',
        model2: '',
        value4: '',
        equipmentArr: new Array(30),
        indeterminate: true,
        checkAll: false,
        checkAllGroup: ['香蕉', '西瓜']
      }
    },
    components: {commModal, drag},
    mounted () {
    },
    methods: {
      handleCheckAll () {
        if (this.indeterminate) {
          this.checkAll = false
        } else {
          this.checkAll = !this.checkAll
        }
        this.indeterminate = false
        if (this.checkAll) {
          this.checkAllGroup = ['香蕉', '苹果', '西瓜']
        } else {
          this.checkAllGroup = []
        }
      },
      checkAllGroupChange (data) {
        if (data.length === 3) {
          this.indeterminate = false
          this.checkAll = true
        } else if (data.length > 0) {
          this.indeterminate = true
          this.checkAll = false
        } else {
          this.indeterminate = false
          this.checkAll = false
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .analybox{
    position:absolute;
    height:50%;
    left:0;
    right:0;
    bottom:0;
    background: #1b212d;
    padding:0 20px;
  }
  .addtype{
    padding:20px 0 30px;
    line-height: 30px;
  }
  .addtype_l{
    width:75%;
    float:left;
    color:#92a4bc;
  }
  .addtype_l span{
    padding-right:10px;
  }
  .ivu-select-placeholder,
  .ivu-select-selected-value{
    background: #1b212d !important;
  }
  .ivu-select-selection{
    border:1px solid #3b465a !important;
  }
  .ivu-input{
    background: #1b212d !important;
    border:1px solid #3b465a !important;
  }
  .ivu-select-dropdown{
    background: #1b212d !important;
  }
  .addtype_r{
    width:25%;
    float:right;
    text-align: right;
  }
  #exportewm{
    border:#21caf1 solid 1px;
    width:90px;
    height: 32px;
    background: #1a222f;
    border-radius: 16px;
    color:#21caf1;
    margin-right:15px;
  }
  #addsb{
    width:90px;
    height: 32px;
    border-radius: 16px;
    color:#21caf1;
    margin-right:15px;
    border:0;
    color:#fff;
  }
  .pdl{
    padding-left:30px;
  }
  .add_equipment_table{
    color:#fff;
    line-height: 36px;
  }
  .add_equipment_table thead{
    background: #31415a;
    color:#94a5b9;
  }
  .add_equipment_list{
    overflow-y: scroll;
    position: absolute;
    top:36px;
    bottom:0;
    left:0;
    right:0;
  }
  .add_equipment_table tbody tr{
    border-bottom:#232935 solid 1px;
    text-align: center;
  }
  .add_equipment_table tbody tr:last-child{
    border-bottom:none;
  }
  .add_equipment_table tbody tr:hover{
    background: #1f2734;
  }
  .add_equipment_table thead tr th:first-child,
  .add_equipment_table tbody tr td:first-child{
    padding-left:15px;
  }
  .add_equipment_table tbody .cur{
    color:#21caf1;
  }
  .add_equipment_table tbody a{
    color:#21caf1;
    padding:0 7px;
  }
  .add_equipment_box{
    position: absolute;
    top:84px;
    left:20px;
    right:20px;
    bottom:20px;
    border:#31415a solid 1px;
  }
  .sbinfos{
    padding-left:100px;
    line-height: 24px;
  }
  .ewm{
    text-align: center;
    padding:20px 0 10px;
  }
  .check-list{
    border-bottom:#eeeeee solid 1px;
    padding:0 0 10px 0;
    /*margin-bottom:10px;*/
  }
  .checkbox h3{
    line-height: 30px;
  }
  .ivu-checkbox-group-item{
    padding-left:80px;
    line-height: 24px;
  }
</style>
