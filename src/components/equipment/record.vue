<template>
  <div>
   <div class="detail_l">
      <h4 class="color_blue">设备基本信息</h4>
      <div class="detail_l_imagelist">
        <img class="image_big" :src="item.pic_arr[0].photo_file">
        <!-- <img class="image_big" src=""> -->
        <div class='imglist_small'>
          <span class="button_left"><</span>
          <img :src="item.pic_arr[0].photo_thumb_file">
          <img :src="item.pic_arr[0].photo_thumb_file">
          <img :src="item.pic_arr[0].photo_thumb_file">
          <span class="button_right">></span>
        </div>
      </div>
      <ul>
        <li>名称：<span>{{item.name}}</span></li>
        <li>编号：<span>{{item.code_number}}</span></li>
        <li class="liw">属性：<span>{{item.attribute_name}}</span></li>
        <li class="liw">规格：<span>{{item.unit_name}}</span></li>
        <li>系统分类：<span>{{item.device_system_name}}</span></li>
        <li>设备设施分类：<span>{{item.true_type_name}}</span></li>
        <li>安装位置：<span>{{item.place_true_name}}</span></li>
        <li class="liw">负责人：<span>{{item.control_users_names}}</span></li>
        <li class="liw">当前状态：<span>{{item.device_current_states_names}}</span></li>
      </ul>
      <button class="btn_square btn_light">修改基本信息</button>
    </div>
    <div class="detail_r">
      <div class="recorddate" style="line-height:50px;">
        <span>时间</span>
        <Date-picker type="month" :options="date" placeholder="选择日期" style="width: 200px" @on-change='getRecords($event)' v-model="selectedDate"></Date-picker>
      </div>
      <h3>共<span class="green_color">{{getrecordNum}}</span>条运行记录 </h3>

      <!-- 列表开始 -->
      <div class="record_equipment_box">
        <commTable>
          <tr slot="tablebox_head" >
            <th width="12.5%" v-for="item in returnRecord.data_top">{{item}}</th>
          </tr>
          <tbody slot="tablebox_body">
            <tr v-for="item in returnRecord.data">
              <td width="12.5%" v-for="item2 of item">{{item2}}</td>
            </tr>
          </tbody>
        </commTable>
      </div>
      <!-- 结束 -->
    </div>
  </div>
</template>
<script>

  import commTable from '../comm/commTable'
  export default {
    name: 'record',
    data () {
      return {
        returnRecord: {},
        recordNum: 0,
        date: {
          disabledDate (date) {
            return date && date.valueOf() > Date.now()
          }
        },
        id: this.$route.params.id,
        item: { pic_arr: [ {photo_file: ''} ] },
        selectedDate: ''
      }
    },
    mounted () {
      this.getEquipmentDetails()
      this.getToday()
    },
    components: {commTable},
    computed: {
      getrecordNum: function () {
        return this.returnRecord.total_number
      }
    },
    methods: {
      getEquipmentDetails () {
        this.axios.get(this.Comm.baseUrl, {
          params: {
            shop_id: this.Comm.shopIds.id,
            module: this.Comm.modules.module1,
            opt: 'device_con',
            id: this.id
          }
        })
        .then((response) => {
          this.item = response.data.data[0]
          // console.log(response.data.data[0])
        })
      },
      getToday () {
        var d = new Date()
        var m = d.getMonth() + 1
        this.selectedDate = d.getFullYear() + '-' + (m < 9 ? ('0' + m) : m)
        this.getRecords()
      },
      getRecords (event, num) {
        if (event) {
          this.selectedDate = event
        }
        this.axios.get(this.Comm.baseUrl, {
          params: {
            shop_id: this.Comm.shopIds.id,
            module: this.Comm.modules.module1,
            opt: 'device_run_lists',
            id: this.id,
            date: this.selectedDate,
            page: num || 1
          }
        })
        .then((response) => {
          // this.returnRecord = response.data
          var result = response.data
          if (result.returncode === '0') {
            if (result.pages === 0 || result.pages === 1) {
              this.returnRecord = response.data
            } else if (+result.page < result.pages) {
              this.returnRecord.data = this.returnRecord.data.concat(response.data.data)
              this.getRecords(event, +result.page + 1)
            } else {
              this.returnRecord.data = this.returnRecord.data.concat(response.data.data)
            }
          } else {
            this.returnRecord = []
          }
        })
      }
    }
  }
</script>
<style scoped>
  .recorddate{
    line-height: 50px;
    color:#95a5b8;
  }

  .recorddate .ivu-date-picker{
    display: inline-block;
    margin-left: 10px;
  }

  .record_equipment_box{
    position: absolute;
    top:80px;
    left:0;
    right:0;
    bottom:20px;
  }

  h4 {
    line-height: 40px;
  }

  .detail_l {
    position: absolute;
    top:40px;
    left:20px;
    right:80%;
    bottom:0;
  }

  .detail_l ul {
    color: #64707d;
  }

  .detail_l ul span {
    color: #b3c6dd;
  }

  .detail_l ul li {
    float: left;
    width: 100%;
    line-height: 22px;
  }

  .detail_l ul li.liw {
    width: 50%;
    float: left;
  }

  .detail_r{
    position: absolute;
    top: 50px;
    left: 320px;
    right: 20px;
    bottom: 0;
  }

</style>
