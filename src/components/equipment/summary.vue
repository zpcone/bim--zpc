<template>
  <div class="summaryBox">
    <span class="text_date"><label>截至今日：</label>本设备（设备）运行{{runningTime}}天，<span v-if="!indefiniteDuration && remainingTime >= 0">未过质保期，距质保过期还有{{remainingTime}}天。</span><span v-if="!indefiniteDuration && remainingTime < 0">已过质保期{{-remainingTime}}天。</span><span v-if="indefiniteDuration">无限期有效。</span></span>
    <div class="summaryTop">
      <div class="detail_l">
        <h4 class="color_blue">设备基本信息</h4>
        <div class="detail_l_imagelist">
          <img class="image_big" :src="item.pic_arr[0].photo_file">
          <div class='imglist_small'>
            <span class="button_left"><</span>
            <img :src="item.pic_arr[0].photo_thumb_file">
            <img :src="item.pic_arr[0].photo_thumb_file">
            <img :src="item.pic_arr[0].photo_thumb_file">
            <span class="button_right">></span>
          </div>
        </div>
      </div>
      <div class="detail_m">
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
        <h4 class="color_blue">更多基本信息</h4>
        <ul>
          <li>设备设施型号：<span>{{item.model_number}}</span></li>
          <li>NFC标签：<span>{{item.rfid}}</span></li>
          <li>服务区域：<span>{{item.server_area}}</span></li>
          <li>采购价格：<span>{{item.procurement_price}}</span></li>
          <li>折旧年限：<span>{{item.period_of_depreciation}}</span></li>
          <li>残值率：<span>{{item.residual_rate}}</span></li>
          <li>启动时间：<span>{{item.start_time_name}}</span></li>
          <li>质保到期时间：<span>{{item.expire_time_name}}</span></li>
          <li>服务提供商：<span>{{item.factory_name}}</span></li>
          <li>自定义信息：<span>{{item.content}}</span></li>
        </ul>
      </div>
      <div class="detail_r2">
        <div class="toleft">二维码：<br><img :src="item.qrcode"></div>
        <button class="btn_square btn_dark2" @click="printQrcode">打印二维码</button>
      </div>
    </div>
    <div class="lastRecord">
      <h4 class="color_blue">最近一次运行记录</h4>
      <!-- 列表开始 -->
      <div class="summary_equipment_box">
        <commTable>
          <tr slot="tablebox_head" >
            <th width="20%">参数名</th>
            <th width="20%">参数值</th>
            <th width="20%">单位</th>
            <th width="20%">记录人</th>
            <th width="20%">记录时间</th>
          </tr>
          <tbody slot="tablebox_body">
            <tr v-for="record in lastRecords.operation_last">
              <td width="20%">{{record.device_param_title}}</td>
              <td width="20%">{{record.device_param_value}}</td>
              <td width="20%">{{record.device_param_unit}}</td>
              <td width="20%">{{record.opt_name}}</td>
              <td width="20%">{{record.create_time_name}}</td>
            </tr>
          </tbody>
        </commTable>
      </div>
      <!-- 结束 -->
    </div>
  </div>
</template>
<script>
  import commModal from '../comm/commModal'// 引入微信
  import commTable from '../comm/commTable'
  export default {
    name: 'summary',
    data () {
      return {
        id: this.$route.params.id,
        item: { pic_arr: [ {photo_file: ''} ] },
        runningTime: 0,
        remainingTime: 0,
        indefiniteDuration: false,
        lastRecords: []
      }
    },
    watch: {
      '$route' (to, from) {
        this.id = this.$route.params.id
        this.getEquipmentDetails()
      }
    },
    components: {commModal, commTable},
    mounted () {
      // this.$commit('setEquipument', this.id)
      this.getEquipmentDetails()
      this.getLastRecords()
    },
    methods: {
      // 获取设备详情列表
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
          this.runningTime = parseInt((new Date().getTime() / 1000 - this.item.start_time) / 3600 / 24)
          if (this.item.expire_time === '0') {
            this.indefiniteDuration = true
          } else {
            this.remainingTime = parseInt((this.item.expire_time - new Date().getTime() / 1000) / 3600 / 24)
          }
        })
      },
      // 获取最后一次运行记录
      getLastRecords () {
        this.axios.get(this.Comm.baseUrl, {
          params: {
            shop_id: this.Comm.shopIds.id,
            module: this.Comm.modules.module1,
            opt: 'device_operation_con',
            id: this.id
          }
        })
        .then((response) => {
          this.lastRecords = response.data.data
        })
      },
      printQrcode () {
        window.open(this.item.qrcode, '_blank')
      }
    }
  }
</script>
<style scoped>
  .summaryBox{
    position: absolute;
    background: #1b222d;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 0;
  }
  h4 {
    line-height: 40px;
  }
  .summaryTop {
    /*position: relative;*/
    width: 100%;
    height: 280px;
  }
  .detail_l {
    position: absolute;
    width: 25%;
  }
  .detail_m {
    margin-top: 40px;
    position: absolute;
    left: 320px;
    width: 25%;
  }
  .detail_r {
    margin-top: 10px;
    position: absolute;
    left: 60%;
    width: 25%;
  }
  .detail_m ul,
  .detail_r ul {
    color: #64707d;
  }
  .detail_m ul span,
  .detail_r ul span {
    color: #b3c6dd;
  }
  .detail_m ul li,
  .detail_r ul li {
    float: left;
    width: 100%;
    line-height: 24px;
  }
  .detail_m ul li.liw {
    width: 50%;
    float: left;
  }
  .detail_m button{
    margin-top: 45px;
    cursor: pointer;
  }
  .detail_r .toleft{
    width: 150px;
    position: relative;
    top: -240px;
    left: 240px;
  }
  .detail_r2 {
    margin-top: 50px;
    position: absolute;
    left: 75%;
    width: 25%;
    text-align: center;
  }
  .detail_r2 img{
    margin-top: 10px;
    width: 120px;
    height: 120px;
  }
  .detail_r2 button{
    margin-top: 30px;
    cursor: pointer;
  }
  .lastRecord{
    /*height: calc(100% - 40px);*/
  }
  .summary_equipment_box{
    /*margin-top: 280px;*/
    position: absolute;
    top:316px;
    left:0;
    right:0;
    bottom:0;
    /*height: 43%;*/
  }
  .text_date {
    position: absolute;
    top: -23px;
    left: 600px;
    color: #b3c6dd;
    width: 400px;
  }
  .text_date label{
   color: #64707d;
  }
</style>
