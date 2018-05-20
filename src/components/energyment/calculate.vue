<template>
  <div class="calculatebox">
    <div class="sidebar">
      <button class="tap" v-for="(value,key) in (returnSearchType.energy_type)" @click="getTypeList(key)">{{value}}</button>
    </div>
    <div class="calculatewrap">
      <div class="addtype clearfix">
        <div class="addtype_l">
          <span>付费方式</span>
          <Select v-model="model1" style="width:100px">
            <Option value="all" selected = "selected">全部</Option>
            <Option v-for="(value,key) in (returnSearchType.prepayment)" :value="key" :key="key">{{ value}}</Option>
          </Select>
          <span class="pdl">抄表方式</span>
          <Select v-model="model2" style="width:100px">
            <Option value="0" selected = "selected">全部</Option>
            <Option v-for="(value,key) in (returnSearchType.check_type)" :value="key" :key="key">{{ value}}</Option>
          </Select>
          <span class="pdl">计价类型</span>
          <Select v-model="model3" style="width:100px">
            <Option value="0" selected = "selected">全部</Option>
            <Option v-for="(value,key) in (returnSearchType.energy_price_type)" :value="key" :key="key">{{ value}}</Option>
          </Select>
          <span class="pdl">抄表条件</span>
          <Select v-model="model4" style="width:100px">
            <Option value="0" selected = "selected">全部</Option>
            <Option v-for="(value,key) in (returnSearchType.energy_meter_condition)" :value="key" :key="key">{{ value}}</Option>
          </Select>
          <span class="pdl">
            <Input v-model="model6" icon="ios-search" placeholder="请输入名称，编号" style="width: 200px"></Input>
          </span>
        </div>
        <div class="addtype_r">
          <input type="button" id="exportewm" value="导出抄表记录">
          <!--<router-link :to="{ path: '/newRecord'}"><input type="button" id="addsb" value="新建记录表">-->
          <!--</router-link>-->
          <input type="button" id="addsb" value="新建计量表">
        </div>
      </div>
      <div class="btns">
        <button v-for="btn in btns" class="knob">{{ btn.btn }}</button>
      </div>
      <div class="add_equipment_box">
        <table width="100%" class="add_calculate_table">
          <thead>
          <tr >
            <th width="10%">序号</th>
            <th width="10%">计量表名称</th>
            <th width="10%">抄表方式</th>
            <th width="10%">计价类型</th>
            <th width="10%">价格方案名称</th>
            <th width="10%">服务区域</th>
            <th width="10%">状态</th>
            <th width="10%">付费方式</th>
            <th width="20%">操作</th>
          </tr>
          </thead>
        </table>
        <div class="add_equipment_list">
          <table width="100%" class="add_calculate_table">
            <tbody>
            <tr v-for="(item,index) in retureUpdate">
              <td width="10%">{{item.id}}</td>
              <td width="10%">{{item.meter_name}}</td>
              <td width="10%">{{item.check_type_name}}</td>
              <td width="10%">{{item.energy_price_type_name}}</td>
              <td width="10%">{{item.energy_price_name}}</td>
              <td width="10%">{{item.desc}}</td>
              <td width="10%">{{item.disable_time}}</td>
              <td width="10%">{{item.prepayment}}</td>
              <td width="20%" class="cur">
                <router-link :to="{ path: '/main/splitScreen/energyCheck/'+item.id}">查看</router-link>
                <!--下边的均是路由链接-->
                <!--<router-link :to="{ path: '/equipmentDetail'}">编辑</router-link>-->
                <!--<router-link :to="{ path: '/equipmentDetail'}">禁用</router-link>-->
                <router-link :to="{ path: '/main/splitScreen/energyReading/'+item.id}">抄表</router-link>
                <router-link :to="{ path: '/main/splitScreen/readingRecords/' +item.id}">抄表纪录</router-link>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  /* eslint-disable no-new */
//  import drag from '../comm/commDrag'
  import commModal from '../comm/commModal'
  export default {
    name: 'calculate',
    data () {
      return {
        running: false,   // 运行状态
        erWeiMa: false,    // 二维码
        modalIsShow: true,
        btns: [
          {btn: '全部标签'},
          {btn: '公区表'},
          {btn: '租户表'},
          {btn: '总表'},
          {btn: '自动上传'}
        ],
        model1: 'all',
        model2: '0',
        model3: '0',
        model4: '0',
        model5: '1',
        model6: '',
//        value4: '',
        indeterminate: true,
        checkAll: false,
//        checkAllGroup: ['香蕉', '西瓜'],
        returnSearchType: { }, // 保存搜索字段
        retureEnergyList: [] // 保存能源字段
      }
    },
    computed: {
      retureUpdate: function () {
        for (var i = 0; i < this.retureEnergyList.length; i++) {
          if (this.retureEnergyList[i].prepayment === '0') {
            this.retureEnergyList[i].prepayment = '非预付费'
          }
          if (this.retureEnergyList[i].prepayment === '1') {
            this.retureEnergyList[i].prepayment = '预付费'
          }
          if (this.retureEnergyList[i].disable_time === '0') {
            this.retureEnergyList[i].disable_time = '启用'
          }
        }
        return this.retureEnergyList
      }
    },
//    监视属性值的变化开始
    watch: {
      'model1': function () {
        this.getEnergyList()
      },
      'model2': function () {
        this.getEnergyList()
      },
      'model3': function () {
        this.getEnergyList()
      },
      'model4': function () {
        this.getEnergyList()
      },
      'model6': function () {
        this.getEnergyList()
      }
    },
    components: {commModal},
    methods: {
      getTypeList (key) {
        var taps = document.getElementsByClassName('tap')
        for (var i = 0; i < taps.length; i++) {
          taps[i].style.background = '#323942'
          taps[key - 1].style.background = '#62a3ff'
        }
        this.model5 = key
        this.getEnergyList()
      },
      /*
       * 能源搜索字段
       */
      getSearchType () {
        const _this = this
        this.axios.get(this.Comm.baseUrl, {
          params: {
            shop_id: this.Comm.shopIds.id,
            module: this.Comm.modules.module2,
            opt: 'search_lists'
          }
        })
        .then((response) => {
          var result = response.data
          this.returnSearchType = result.data
          _this.getEnergyList()
        })
      },
      /*
       * 能源列表字段
       */
      getEnergyList () {
        this.axios.get(this.Comm.baseUrl, {
          params: {
            shop_id: this.Comm.shopIds.id,
            module: this.Comm.modules.module2,
            opt: 'meter_lists',
            prepayment: this.model1,
            check_type: this.model2,
            energy_price_type: this.model3,
            meter_condition: this.model4,
            energy_type: this.model5,
            search_name: this.model6
          }
        })
          .then((response) => {
            const result = response.data
            this.retureEnergyList = result.data
          })
      }
    },
    mounted () {
      this.getSearchType()
    }
  }
</script>
<style scoped >
  select{
    color: white;
  }
  .calculatebox{
    position:absolute;
    top:10px;
    left:0;
    right:0;
    bottom:0;
    background: #1b212d;
    padding:0 20px;
  }
  .sidebar {
    width: 80px;
    height: 100%;
    float: left;
    border-right: 1px solid #181e28;
  }
  .calculatewrap {
    position: absolute;
    top: 0;
    bottom:0;
    left:100px;
    right:0;
    height: 100%;
  }
  .addtype {
    /*padding:20px 20px 30px;*/
    margin-left: 20px;
    line-height: 30px;
  }
  .addtype_l {
    width: 980px;
    float: left;
    color: #92a4bc;
  }
  .addtype_l span {
    padding-right: 10px;
  }
  .ivu-select-placeholder,
  .ivu-select-selected-value {
    background: #1b212d !important;
  }

  .ivu-select-selection {
    border: 1px solid #3b465a !important;
  }

  .ivu-input {
    background: #1b212d !important;
    border: 1px solid #3b465a !important;
  }

  .ivu-select-dropdown {
    background: #1b212d !important;
  }
  .addtype_r {
    width: 220px;
    float: right;
    text-align: right;
  }
  #exportewm {
    border: #62a3ff solid 1px;
    width: 90px;
    height: 32px;
    background: #2c3441;
    border-radius: 5px;
    color: #62a3ff;
    margin-right: 15px;
  }
  .sidebar .tap:nth-child(1){
    background:#62a3ff;
  }
  .knob:nth-child(1){
    background:#62a3ff;
  }
  #addsb {
    width: 90px;
    height: 32px;
    border-radius: 5px;
    margin-right: 15px;
    border: 0;
    color: #fff;
    background-color: #62a3ff;
  }
  .pdl {
    padding-left: 20px;
  }
  .add_calculate_table {
    color: #fff;
    line-height: 36px;
  }

  .add_calculate_table thead {
    background: #31415a;
    color: #94a5b9;
  }

  .add_equipment_list {
    overflow-y: scroll;
    position: absolute;
    top: 36px;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .add_calculate_table tbody tr {
    border-bottom: #232935 solid 1px;
    text-align: center;
  }

  .add_calculate_table tbody tr:last-child {
    border-bottom: none;
  }

  .add_calculate_table tbody tr:hover {
    background: #1f2734;
  }

  .add_calculate_table thead tr th:first-child,
  .add_calculate_table tbody tr td:first-child {
    padding-left: 15px;
  }

  .add_calculate_table tbody .cur {
    color: #62a3ff;
  }

  .add_calculate_table tbody a {
    color: #62a3ff;
    padding: 0 7px;
  }

  .add_equipment_box {
    position: absolute;
    top: 104px !important;
    left: 20px;
    right: 20px;
    bottom: 20px;
    border: #31415a solid 1px;
  }

  .sbinfos {
    padding-left: 100px;
    line-height: 24px;
  }

  .ewm {
    text-align: center;
    padding: 20px 0 10px;
  }

  .check-list {
    border-bottom: #eeeeee solid 2px;
    padding: 0 0 10px 0;
    /*margin-bottom:10px;*/
  }

  .checkbox h3 {
    line-height: 30px;
  }

  .ivu-checkbox-group-item {
    padding-left: 80px;
    line-height: 24px;
  }

  .btns {
    position: absolute;
    top: 68px;
    left: 20px;
  }

  /*拉动边框放上部*/
  .resizeT {
    position: absolute;
    top: 0;
    width: 100%;
    height: 8px;
    cursor: n-resize;
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
