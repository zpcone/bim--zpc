<template>
  <div class="equipmentbox">
    <div class="addtypeBox clearfix">
      <div class="addtype_left">
        <span>属性</span>
        <!-- <Select v-model="selected.model1" multiple style="width:180px" @on-change='setContext' ref='attr'> -->
        <Select v-model="selected.model1" style="width:100px">
          <Option value="all" selected = "selected">全部</Option>
          <Option v-for="(value, key) in propertyList" :value="key" :key="key">{{value}}</Option>
        </Select>
        <span class="pdl">系统分类</span>
        <Select v-model="selected.model2" style="width:130px">
          <Option value="0" selected = "selected">全部</Option>
          <Option v-for="item in systemList" :value="item.value" :key="item">{{ item.label }}</Option>
        </Select>
        <span class="pdl">设备设施分类</span>
        <Select v-model="selected.model3" style="width:130px">
          <Option value="0" selected = "selected">全部</Option>
          <Option v-for="item in deviceList" :value="item.id" :key="item.id">{{ item.type_name}}</Option>
        </Select>
        <span class="pdl">运行状态</span>
        <Select v-model="selected.model4" style="width:130px" @click.prevent.native="running=true">
        </Select>
        <span class="pdl">
          <Input v-model="selected.value5" icon="ios-search" placeholder="请输入名称，编号" style="width: 200px"></Input>
        </span>
      </div>
      <div class="addtype_right">
        <button id="exportewm" @click="exportQrcodes">导出二维码</button>
        <button id="addsb">添加设备</button>
      </div>
    </div>

    <!-- 设备列表 -->
    <div class="equipment_list_box">
      <commTable>
        <tr slot="tablebox_head" >
          <th width="4%" class="tl">
            <input type="checkbox" name="" value="" @click='selectAll($event)'>
          </th>
          <th width="11%">编号</th>
          <th width="25%">名称</th>
          <th width="10%">属性</th>
          <th width="15%">安装位置</th>
          <th width="10%">当前状态</th>
          <th width="10%">二维码</th>
          <th width="15%">操作</th>
        </tr>
        <tbody slot="tablebox_body" class='tablebox_body'>
          <tr v-for="(item,index) in returnData">
            <td width="4%" class="tl">
              <input type="checkbox" value="" @click="getId($event, item.id)">
            </td>
            <td width="11%">{{item.code_number}}</td>
            <td width="25%">{{item.name}}</td>
            <td width="10%">{{item.attribute_name}}</td>
            <td width="15%">{{item.place_name}}</td>
            <td width="10%">{{item.device_current_states_names}}</td>
            <td width="10%" class="light" @click="searchQrcode(item)">查看</td>
            <td width="15%" >
              <span class="light" @click="browseDetail(item)" >查看</span>
              <!-- <span class="light">编辑</span> -->
            </td>
          </tr>
        </tbody>
      </commTable>
    </div>
    <commModal :modalIsShow.sync="running" :width='400' :height='600'>
      <s slot="modalTitle">设备设施运行状态</s>
      <div slot="modalText">
        <div class="checkbox">
          <h3>设备运行状态：
            <Checkbox
             :indeterminate="indeterminate1"
             :value="checkAll1"
             @click.prevent.native="handleCheckAll1">全选</Checkbox>
          </h3>
          <div class="check-list">
            <Checkbox-group v-model="checkAllGroup1" @on-change="checkAllGroupChange1">
              <Checkbox v-for="(value,key) in statusList[0]" :label='key' key=''>{{value}}</Checkbox>
            </Checkbox-group>
          </div>
        </div>
        <div class="checkbox">
          <h3>计量表运行状态：
            <Checkbox
            :indeterminate="indeterminate2"
            :value="checkAll2"
            @click.prevent.native="handleCheckAll2">全选</Checkbox>
          </h3>
          <div class="check-list">
            <Checkbox-group v-model="checkAllGroup2" @on-change="checkAllGroupChange2">
              <Checkbox v-for="(value,key) in statusList[1]" :label='key' key=''>{{value}}</Checkbox>
            </Checkbox-group>
          </div>
        </div>
        <div class="checkbox">
          <h3>设施运行状态：
            <Checkbox
            :indeterminate="indeterminate3"
            :value="checkAll3"
            @click.prevent.native="handleCheckAll3">全选</Checkbox>
          </h3>
          <div class="check-list">
            <Checkbox-group v-model="checkAllGroup3" @on-change="checkAllGroupChange3">
              <Checkbox v-for="(value,key) in statusList[2]" :label='key' key=''>{{value}}</Checkbox>
            </Checkbox-group>
          </div>
        </div>
        <div class="btnlist">
          <button class="btn_square btn_light m10" @click='updateList'>确 定</button>
          <button class="btn_square btn_dark1" @click='running=false'>取 消</button>
        </div>
      </div>
    </commModal>

    <commModal :modalIsShow.sync="qrcode" :width='400' :height='450'>
      <s slot="modalTitle">查看打印二维码</s>
      <div slot="modalText">
        <ul class="sbinfos">
          <li>设备名称：{{curDevice.name}}</li>
          <li>设备编码：{{curDevice.code_number}}</li>
          <li>安装位置：{{curDevice.place_name}}</li>
        </ul>
        <div class="ewm">
          <img :src="curDevice.qrcode">
        </div>
        <div class="btnlist">
          <button class="btn_square btn_light m10" @click="printQrcode">打印二维码</button>
          <button class="btn_square btn_dark1" @click="qrcode=false">取 消</button>
        </div>
      </div>
    </commModal>
  </div>
</template>

<script>
import commModal from '../comm/commModal'
import commTable from '../comm/commTable'
import commLoadModel from '../comm/commLoadModel'

function changeSeleted () {
  this.returnData = []
  this.getEquipmentList(1)
}
export default {
  name: 'equipmentList',
  data () {
    return {
      running: false, // 运行状态
      qrcode: false, // 二维码
      modalIsShow: true,
      propertyList: [],  // 字段列表
      systemList: [],
      deviceList: [],
      statusList: [],
      selected: {    // 被选择的
        // model1: ['all'],
        model1: 'all',
        model2: '0',
        model3: '0',
        model4: ['all'],
        value5: ''
      },
      indeterminate1: false,
      checkAll1: true,
      checkAllGroup1: [],
      indeterminate2: false,
      checkAll2: true,
      checkAllGroup2: [],
      indeterminate3: false,
      checkAll3: true,
      checkAllGroup3: [],
      returnData: [],
      curDevice: {},
      curId: 0,
      qrcodes: []
    }
  },
  components: {commModal, commTable, commLoadModel},
  computed: {
    selectedItem: function () {
      // todo
    }
  },
  watch: {
    'selected': {
      handler: changeSeleted,
      deep: true
    }
  },
  mounted () {
    this.getEquipmentListOptions()
    this.getEquipmentList()
  },
  methods: {
    getId (event, id) {
      if (event.srcElement.checked) {
        this.curId = id
        console.log(this.curId)
        this.$store.commit('setEquipument', this.curId)
      }
    },
    selectAll (event) {
      var checkBoxes = document.querySelectorAll('.tablebox_body input')
      checkBoxes.forEach(function (el) {
        el.checked = event.srcElement.checked
      })
    },
    // setContext () {
    //   this.$nextTick(() => {
    //     var ivuTags = document.querySelectorAll('.ivu-tag')
    //     console.log(ivuTags)
    //     ivuTags.forEach((el) => {
    //       el.innerHTML = el.innerText
    //     })
    //   })
    // },
    searchQrcode (item) {
      this.curDevice = item
      this.qrcode = true
    },
    printQrcode () {
      this.qrcode = false
      window.open(this.curDevice.qrcode, '_blank')
    },
    exportQrcodes () {
      // todo
      // this.qrcodes.push()
    },
    updateList () {
      if (this.checkAll1 && this.checkAll2 && this.checkAll3) {
        this.selected.model4 = ['all']
      } else {
        this.selected.model4 = this.checkAllGroup1.concat(this.checkAllGroup2, this.checkAllGroup3)
      }
      this.running = false
    },
    handleCheckAll1 () {
      if (this.indeterminate1) {
        this.checkAll1 = false
      } else {
        this.checkAll1 = !this.checkAll1
      }
      this.indeterminate1 = false
      if (this.checkAll1) {
        this.checkAllGroup1 = Object.keys(this.statusList[0])
      } else {
        this.checkAllGroup1 = []
      }
    },
    checkAllGroupChange1 (event) {
      if (event.length === Object.keys(this.statusList[0]).length) {
        this.indeterminate1 = false
        this.checkAll1 = true
      } else if (event.length > 0) {
        this.indeterminate1 = true
        this.checkAll1 = false
      } else {
        this.indeterminate1 = false
        this.checkAll1 = false
      }
    },
    handleCheckAll2 () {
      if (this.indeterminate2) {
        this.checkAll2 = false
      } else {
        this.checkAll2 = !this.checkAll2
      }
      this.indeterminate2 = false
      if (this.checkAll2) {
        this.checkAllGroup2 = Object.keys(this.statusList[1])
      } else {
        this.checkAllGroup2 = []
      }
    },
    checkAllGroupChange2 (event) {
      if (event.length === Object.keys(this.statusList[1]).length) {
        this.indeterminate2 = false
        this.checkAll2 = true
      } else if (event.length > 0) {
        this.indeterminate2 = true
        this.checkAll2 = false
      } else {
        this.indeterminate2 = false
        this.checkAll2 = false
      }
    },
    handleCheckAll3 () {
      if (this.indeterminate3) {
        this.checkAll3 = false
      } else {
        this.checkAll3 = !this.checkAll3
      }
      this.indeterminate3 = false
      if (this.checkAll3) {
        this.checkAllGroup3 = Object.keys(this.statusList[2])
      } else {
        this.checkAllGroup3 = []
      }
    },
    checkAllGroupChange3 (event) {
      if (event.length === Object.keys(this.statusList[2]).length) {
        this.indeterminate3 = false
        this.checkAll3 = true
      } else if (event.length > 0) {
        this.indeterminate3 = true
        this.checkAll3 = false
      } else {
        this.indeterminate3 = false
        this.checkAll3 = false
      }
    },
    // 不能用数组，用数组，全选有问题
    // handleCheckAll (num) {
    //   if (this.indeterminate[num]) {
    //     this.checkAll[num] = false
    //   } else {
    //     this.checkAll[num] = !this.checkAll[num]
    //   }
    //   this.indeterminate[num] = false
    //   if (this.checkAll[num]) {
    //     this.checkAllGroup[num] = Object.keys(this.statusList[num])
    //   } else {
    //     this.checkAllGroup[num] = []
    //   }
    // },
    // checkAllGroupChange (event, num) {
    //   if (event.length === Object.keys(this.statusList[num]).length) {
    //     this.indeterminate[num] = false
    //     this.checkAll[num] = true
    //   } else if (event.length > 0) {
    //     this.indeterminate[num] = true
    //     this.checkAll[num] = false
    //   } else {
    //     this.indeterminate[num] = false
    //     this.checkAll[num] = false
    //   }
    // },
    // 设备列表
    getEquipmentList (num) {
      var getEquipmentParams = {
        shop_id: this.Comm.shopIds.id,
        module: this.Comm.modules.module1,
        opt: 'device_lists',
        // attribute: this.selected.model1.toString() || 'all',
        attribute: this.selected.model1 || 'all',
        device_system_id: this.selected.model2,
        type_id: this.selected.model3,
        more: 1,
        device_state_ids: this.selected.model4.toString() || 'all',
        page: num || 1
      }
      if (this.selected.value5 !== '') {
        getEquipmentParams['search_name'] = this.selected.value5
      }
      this.axios.get(this.Comm.baseUrl, {
        params: getEquipmentParams
      })
      .then((response) => {
        var result = response.data
        // console.log(result)
        if (result.returncode && result.returncode === '0') {
          if (result.pages === 1) {
            this.returnData = response.data.data
          } else if (+result.page < result.pages) {
            this.returnData = this.returnData.concat(response.data.data)
            this.getEquipmentList(+result.page + 1)
          } else {
            this.returnData = this.returnData.concat(response.data.data)
          }
        }
      })
    },
    // 获取选项
    getEquipmentListOptions () {
      // 属性
      this.axios.get(this.Comm.baseUrl, {
        params: {
          shop_id: this.Comm.shopIds.id,
          module: this.Comm.modules.module3,
          opt: 'get_device_attribute_lists'
        }
      })
      .then((response) => {
        this.propertyList = response.data
        delete this.propertyList['all']
      })
      // 系统分类
      this.axios.get(this.Comm.baseUrl, {
        params: {
          shop_id: this.Comm.shopIds.id,
          module: this.Comm.modules.module3,
          opt: 'device_system_lists'
        }
      })
      .then((response) => {
        const _this = this
        response.data.data.forEach(function (el) {
          _this.systemList.push({value: el.id, label: el.type_name})
        }, this)
      })
      // 设备设施分类
      this.axios.get(this.Comm.baseUrl, {
        params: {
          shop_id: this.Comm.shopIds.id,
          module: this.Comm.modules.module3,
          opt: 'device_type_lists'
        }
      })
      .then((response) => {
        this.deviceList = response.data.data
      })
      // 运行状态
      this.axios.get(this.Comm.baseUrl, {
        params: {
          shop_id: this.Comm.shopIds.id,
          module: this.Comm.modules.module3,
          opt: 'get_device_state_lists'
        }
      })
      .then((response) => {
        response.data.forEach((el, index) => {
          this.statusList[index] = (el.lists)
        })
        // this.statusList.forEach((el, index) => {
        //   this.checkAllGroup[index] = Object.values(el)
        // })
        this.checkAllGroup1 = Object.keys(this.statusList[0])
        this.checkAllGroup2 = Object.keys(this.statusList[1])
        this.checkAllGroup3 = Object.keys(this.statusList[2])
      })
    },
    // 浏览详情页面
    browseDetail (item) {
      let eleId = this.Comm.getEleId(item.code_number)
      this.$store.commit('setEquipument', eleId)
      this.$router.push({path: `/main/splitScreen/equipmentDetail/${item.id}/${eleId}/summary`})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .equipmentbox{
    margin-top: 10px;
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background: #1b212d;
    padding:0 20px;
  }

  .addtypeBox {
    line-height: 30px;
    margin: 10px auto;
    min-width: 1320px;
  }

  .addtype_left {
    float: left;
    color: #92a4bc;
    min-width: 1100px;
  }

  .addtype_left span {
    padding-right: 10px;
  }

  .addtype_right {
    float: right;
    text-align: right;
  }

  #exportewm {
    border: #63a2ff solid 1px;
    width: 90px;
    height: 28px;
    background: #1a222f;
    border-radius: 5px;
    color: #63a2ff;
    margin-right: 15px;
  }

  #addsb {
    width: 75px;
    height: 28px;
    border-radius: 5px;
    color: #fff;
    background-color: #63a2ff;
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

  .pdl {
    padding-left: 25px;
  }

  .equipment_list_box {
    position: absolute;
    top: 60px;
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
    padding: 5px 0;
  }

  .ewm img{
    width: 170px;
    height: 170px;
  }

  .check-list {
    border-bottom: #eeeeee solid 1px;
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
  .tl{
    padding-left:20px;
  }
</style>
