<template>

</template>

<script>
  /* eslint-disable no-new */
  import drag from '../comm/commDrag'
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
        payList: [
          {
            value: '0',
            label: '全部'
          }, {
            value: '1',
            label: '预付费'
          }, {
            value: '2',
            label: '非预付费'
          }
        ],
        readingList: [
          {
            value: '0',
            label: '全部'
          }, {
            value: '1',
            label: '手动'
          }, {
            value: '2',
            label: '自动'
          }, {
            value: '3',
            label: '估值'
          }
        ],
        priceList: [
          {
            value: '0',
            label: '全部'
          }, {
            value: '1',
            label: '单一'
          }, {
            value: '2',
            label: '谷峰'
          }, {
            value: '3',
            label: '阶梯'
          }
        ],
        condation: [
          {
            value: '0',
            label: '全部'
          }, {
            value: '1',
            label: '拍照'
          }, {
            value: '2',
            label: 'NFC扫描'
          }, {
            value: '3',
            label: '客户签字'
          }, {
            value: '4',
            label: '二维码扫描'
          }
        ],
        model1: '',
        model2: '',
        model3: '',
        model4: '',
        value4: '',
        equipmentArr: new Array(10),
        indeterminate: true,
        checkAll: false,
        checkAllGroup: ['香蕉', '西瓜'],
        returnData: { }
      }
    },
    components: {commModal, drag},
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
      },
      getUserAccount () {
        this.axios.get('http://file.helloufu.com/?c=Port&m=actionGet_Web_v2_Port&shop_id=4&module=energy&opt=meter_lists')
          .then(function (response) {
            const result = response.data
//            console.log(result)
            this.returnData = result
          }).call(this)
        console.log(this.returnData)
      }
    },
    created () {
      this.getUserAccount()
    }
  }
</script>
<style>
  .calculatewrap {
    position: relative;
    top: 5px;
    width: 94%;
    height: 95%;
    float: left;
  }
  .addtype {
    /*padding:20px 20px 30px;*/
    margin-left: 30px;
    line-height: 30px;
  }

  .addtype_l {
    width: 75%;
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
    width: 25%;
    float: right;
    text-align: right;
  }

  #exportewm {
    border: #21caf1 solid 1px;
    width: 90px;
    height: 32px;
    background: #1a222f;
    border-radius: 16px;
    color: #21caf1;
    margin-right: 15px;
  }

  #addsb {
    width: 90px;
    height: 32px;
    border-radius: 16px;
    color: #21caf1;
    margin-right: 15px;
    border: 0;
    color: #fff;
  }

  .pdl {
    padding-left: 30px;
  }

  .add_equipment_table {
    color: #fff;
    line-height: 36px;
  }

  .add_equipment_table thead {
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

  .add_equipment_table tbody tr {
    border-bottom: #232935 solid 1px;
    text-align: center;
  }

  .add_equipment_table tbody tr:last-child {
    border-bottom: none;
  }

  .add_equipment_table tbody tr:hover {
    background: #1f2734;
  }

  .add_equipment_table thead tr th:first-child,
  .add_equipment_table tbody tr td:first-child {
    padding-left: 15px;
  }

  .add_equipment_table tbody .cur {
    color: #21caf1;
  }

  .add_equipment_table tbody a {
    color: #21caf1;
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
