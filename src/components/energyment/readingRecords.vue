<template>
  <div class="analybox">
    <div class="readingHeader">
      <span>
        <router-link :to="{ path: '/main/splitScreen/calculate'}">
          <Icon type="arrow-return-left" style="color: #62A3FE; font-size: 20px;vertical-align: middle">
          </Icon><span style="color: #62A3FE;margin: 10px;">返回</span>计量表管理</router-link>
        <span>> {{getRedcords.energy_type}}</span>
        <span>> 抄表记录</span>
      </span>
      <!--<router-link :to="{ path: '/splitScreen/calculate'}"><button class="btn2">返回列表</button></router-link>-->
    </div>
    <!--下边是谷峰时显示-->
    <div v-if="peak" class="readingNav">
      计量表名称：<span>{{getRedcords.meter_name}} </span>
      设备编号 ：<span>{{getRedcords.code_number}}</span>
      范围说明 ：<span>{{getRedcords.desc}}</span>
      抄表方式 ：<span>{{getRedcords.check_type_name}}</span>
      低价类型 ：<span>{{getRedcords.energy_price_name}}</span>
      价格方案 ：<span>{{getRedcords.energy_price_type_name}}</span>
      抄表条件 : <span>{{getRedcords.meter_condition_name}}</span>
      <div class="readingNavFooter">
        <span>抄表人:</span>
        <Select style="width:100px;margin-right: 30px" v-model="person">
          <Option v-for="(item,index) in (getRedcords.user_lists)" :value="item.value" :key="item")>{{item}}</Option>
        </Select>
        <span>时间周期</span>
        <i-col span="12">
          <Date-picker :options="date" @on-change="handleChangeDate" format="yyyy-MM-dd" type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 200px;"></Date-picker>
        </i-col>
      </div>
    </div>
    <div v-if="peak" class="readingFooter">
      <div class="rfTop">
        总用量 ：<span>{{getRedcords.total_num}} </span>
        峰段用量 ：<span>{{getRedcords.peak_period_num}}</span>
        谷段用量 ：<span>{{getRedcords.valley_section_num}}</span>
        平段用量 ：<span>{{getRedcords.flat_section_num}}</span>
        尖峰用量 ：<span>{{getRedcords.peak_segment_num}}</span>
        <button class="btn_color btn1 " >导出抄表记录</button>
        <!--<button class="btn1 btn_reading"  value="">插入抄表</button>-->
      </div>
      <div class="rfBottom">
        <table width="100%" class="add_equipment_table">
          <thead>
          <tr>
            <th width="8%">实际抄表时间</th>
            <th width="6%">表总数</th>
            <th width="5%">使用量</th>
            <th width="6%">峰段数</th>
            <th width="5%">峰段量</th>
            <th width="8%">平段数</th>
            <th width="5%">平段量</th>
            <th width="8%">谷段数</th>
            <th width="5%">谷段量</th>
            <th width="5%">尖峰数</th>
            <th width="5%">尖峰量</th>
            <th width="8%">抄表人</th>
            <th width="5%">气温</th>
            <th width="5%">湿度</th>
            <th width="5%">风力</th>
            <th width="5%">图片</th>
            <th width="5%">操作</th>
          </tr>
          </thead>
        </table>
        <div class="add_energy_list">
          <table width="100%" class="add_equipment_table">
            <tbody>
            <tr v-for="(item,index) in (getRedcords.lists)">
              <td width="8%">{{Comm.formatTime(item.create_time*1000, 7)}}</td>
              <td width="6%">{{item.total_num}}</td>
              <td width="5%">{{item.use_amount}}</td>
              <td width="6%">{{item.peak_period_num}}</td>
              <td width="5%">{{item.peak_period_amount}}</td>
              <td width="8%">{{item.flat_section_num}}</td>
              <td width="5%">{{item.flat_section_amount}}</td>
              <td width="8%">{{item.valley_section_num}}</td>
              <td width="5%">{{item.valley_section_amount}}</td>
              <td width="5%">{{item.peak_segment_num}}</td>
              <td width="5%">{{item.peak_segment_amount}}</td>
              <td width="8%">{{item.name}}</td>
              <td width="5%">{{item.temperature}}</td>
              <td width="5%">{{item.humidity}}%</td>
              <td width="5%">{{item.wind_force}}</td>
              <td width="5%">无</td>
              <td width="5%">修改</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <ul class="thumbnail">
        <Page :total="num" @on-change="handleChange" show-elevator></Page>
      </ul>
    </div>
    <!--下边是单一时显示-->
    <div v-if="single" class="readingNav">
      计量表名称： <span>{{getRedcords.meter_name}} </span>
      设备编号 ：<span>{{getRedcords.code_number}}</span>
      范围说明 ：<span>{{getRedcords.desc}}</span>
      抄表方式 ：<span>{{getRedcords.check_type_name}}</span>
      低价类型 ：<span>{{getRedcords.energy_price_name}}</span>
      价格方案 ：<span>{{getRedcords.energy_price_type_name}}</span>
      抄表条件 : <span>{{getRedcords.meter_condition_name}}</span>
      抄表人筛选:
      <Select style="width:100px;margin-right: 30px" v-model="person">
        <Option v-for="(item,index) in (getRedcords.user_lists)" :value="item.value" :key="item")>{{item}}</Option>
      </Select>
      <div class="readingNavFooter">
        <span>从</span>
        <Date-picker @on-change="handleChangeBegin" :options="date" :value="value1" format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width: 120px; float: left;margin-right: 10px;"></Date-picker>
        <span>到</span>
        <Date-picker @on-change="handleChangeOver"  :options="date" :value="value2" format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width: 120px; float: left"></Date-picker>
        <button class="readingBtn" @click="search">搜索</button>
        <button class="readingBtn">重置</button>
      </div>
    </div>
    <div v-if="single" class="readingFooter">
      <div class="rfTop">
        <span>总用量 ：{{getRedcords.total_num}} </span>
        <button type="button" class="btn_color btn1 " value="">导出抄表记录</button>
      </div>
      <div class="rfBottom">
        <table width="100%" class="add_equipment_table">
          <thead>
          <tr>
            <th width="20%">实际抄表时间</th>
            <th width="10%">表总数</th>
            <th width="10%">使用量</th>
            <th width="10%">抄表人</th>
            <th width="10%">气温</th>
            <th width="10%">湿度</th>
            <th width="10%">风力</th>
            <th width="10%">图片</th>
            <th width="10%">操作</th>
          </tr>
          </thead>
        </table>
        <div class="add_energy_list">
          <table width="100%" class="add_equipment_table">
            <tbody>
            <tr v-for="(item,index) in (getRedcords.lists)">
              <!-- <td width="20%">{{Comm.formatTime(item.create_time, 1)}}</td> -->
              <td width="20%">{{Comm.formatTime(item.create_time*1000, 7)}}</td>
              <td width="10%">{{item.total_num}}</td>
              <td width="10%">{{item.use_amount}}</td>
              <td width="10%">{{item.name}}</td>
              <td width="10%">{{item.temperature}}</td>
              <td width="10%">{{item.humidity}}%</td>
              <td width="10%">{{item.wind_force}}</td>
              <td width="10%">无</td>
              <td width="10%">修改</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <ul class="thumbnail">
        <Page :total="num" @on-change="handleChange" show-elevator></Page>
      </ul>
    </div>
    <!--下边是阶梯时显示-->
    <div v-if="ladder" class="readingNav">
      计量表名称： <span>{{getRedcords.meter_name}} </span>
      设备编号 ：<span>{{getRedcords.code_number}}</span>
      范围说明 ：<span>{{getRedcords.server_area}}</span>
      抄表方式 ：<span>{{getRedcords.check_type_name}}</span>
      低价类型 ：<span>{{getRedcords.energy_price_name}}</span>
      价格方案 ：<span>{{getRedcords.energy_price_type_name}}</span>
      抄表条件 : <span>{{getRedcords.meter_condition_name}}</span>
      抄表人筛选:
      <Select style="width:100px;margin-right: 30px" v-model="person">
        <Option v-for="(item,index) in (getRedcords.user_lists)" :value="item.value" :key="item")>{{item}}</Option>
      </Select>
      <div class="readingNavFooter">
        <span>从</span>
        <input type="text" placeholder="请输入日期">
        <span>到</span>
        <input type="text" placeholder="请输入日期">
        <button class="readingBtn">搜索</button>
        <button class="readingBtn">重置</button>
      </div>
    </div>
    <div v-if="ladder" class="readingFooter">
      <div class="rfTop">
        <span>总用量 ：{{getRedcords.total_num}} </span>
        <button type="button" class="btn_color btn1 " value="">导出抄表记录</button>
      </div>
      <div class="rfBottom">
        <table width="100%" class="add_equipment_table">
          <thead>
          <tr>
            <th width="20%">实际抄表时间</th>
            <th width="10%">表总数</th>
            <th width="10%">使用量</th>
            <th width="10%">抄表人</th>
            <th width="10%">气温</th>
            <th width="10%">湿度</th>
            <th width="10%">风力</th>
            <th width="10%">图片</th>
            <th width="10%">操作</th>
          </tr>
          </thead>
        </table>
        <div class="add_energy_list">
          <table width="100%" class="add_equipment_table">
            <tbody>
            <tr v-for="(item,index) in (getRedcords.list)">
              <td width="20%">{{ item.create_time}}</td>
              <td width="10%">{{item.total_num}}</td>
              <td width="10%">{{item.use_amount}}</td>
              <td width="10%">{{item.name}}</td>
              <td width="10%">{{item.temperature}}</td>
              <td width="10%">{{item.humidity}}%</td>
              <td width="10%">{{item.wind_force}}</td>
              <td width="10%">无</td>
              <td width="10%">修改</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script scoped>
  export default {
    name: 'readingRecords',
    data () {
      return {
        date: {
          disabledDate (date) {
            return date && date.valueOf() > Date.now()
          }
        },
        empty: false,
        page: 1,
        num: '',
        id: this.$route.params.id,
        person: '',
        getRedcords: {},
        peak: false,
        ladder: false,
        single: false,
        startTime: '',
        endTime: '',
        model1: '',
        model2: '',
        value1: '',
        value2: ''
      }
    },
//    computed: {
//      start_time: function () {
//        return (this.value2[0])
//      },
//      end_time: function () {
//        return (this.value2[1])
//      }
//    },
    watch: {
//      'startTime': function () {
//        this.getReading()
//      },
//      'endTime': function () {
//        this.getReading()
//      },
      'page': function () {
        this.getReading()
      }
    },
    methods: {
        // 实现搜索
      search () {
        const _this = this
        _this.getReading()
      },
      // 实现重置
//      reset () {
//        const _this = this
//        this.value1 = ''
//        this.value2 = ''
//        _this.getReading()
//      },
      // 获取页数
      handleChange (date) {
        this.page = date
      },
//      谷峰时获取开始和结束时间字段
      handleChangeDate (date) {
        this.startTime = date[0]
        this.endTime = date[1]
        this.getReading()
      },
      // 单一时开始日期
      handleChangeBegin (date) {
        this.startTime = date
      },
      // 单一时结束日期
      handleChangeOver (date) {
        this.endTime = date
      },
      // 获取后台字段
      getReading () {
        this.axios.get(this.Comm.baseUrl, {
          params: {
            shop_id: this.Comm.shopIds.id,
            module: this.Comm.modules.module2,
            opt: 'meter_record_lists',
            id: this.id,
            start_time: this.startTime,
            end_time: this.endTime,
            page: this.page
          }
        })
          .then((response) => {
            const result = response.data
            this.getRedcords = result.data[0] // 获取的是对象
            this.num = result.total_number // 保存总页数
            if (this.getRedcords.energy_type === '1') {
              this.getRedcords.energy_type = '电能'
            }
            if (this.getRedcords.energy_type === '2') {
              this.getRedcords.energy_type = '水能'
            }
            if (this.getRedcords.energy_type === '3') {
              this.getRedcords.energy_type = '燃气'
            }
            if (this.getRedcords.energy_type === '4') {
              this.getRedcords.energy_type = '热能'
            }
            if (this.getRedcords.energy_price_type_name === '峰谷') {
              this.peak = true
            }
            if (this.getRedcords.energy_price_type_name === '单一') {
              this.single = true
            }
            if (this.getRedcords.energy_price_type_name === '阶梯') {
              this.single = true
            }
          })
      }
    },
    mounted () {
      this.getReading()
    }
  }
</script>
<style scoped>
  .analybox{
    position:absolute;
    height:100%;
    left:0;
    right:0;
    bottom:0;
    background: #1b212d;
    padding:20px;
  }
  .readingHeader{
    height:45px;
    border-bottom:#314159 solid 1px;
  }
  .readingHeader span{
    color: #b3c6dd;
  }
  .readingHeader button{
    position: relative;
    top: 14px;
    float: right;
  }
  .readingHeader a{
    color:#b3c6dd;
    list-style: none;
  }
  .readingHeader span{
    line-height: 45px;
  }
  .readingHeader>span{
    float: left;
  }
  .readingNav{
    height:90px;
    margin:10px 0 10px;
    border-bottom:#314159 solid 1px;
  }
  .readingNav>span{
    margin-right: 30px;
    color: #b3c6dd;
  }
  .readingNav>.readingNavFooter{
    height:32px;
    margin-top:10px;
  }
  .readingNav>.readingNavFooter>span{
    margin-right:10px;
    display: block;
    float: left;
    line-height: 32px;
  }
  .readingNav>.readingNavFooter>.ivu-select{
    float: left;
  }
  .readingNavFooter .readingBtn{
    margin-left: 20px;
    display: inline-block;
    line-height: 30px;
    padding: 0 20px;
    border-radius: 5px;
    color: white;
    background-color: #62a3ff;
  }
  .ivu-col-span-12 {
    position: relative;
    bottom: 32px;
    left:270px;
    float: none;
  }
  .readingFooter{
    position: absolute;
    top:180px;
    bottom:0;
    left:0;
    right:0;
  }
  .rfTop{
    margin-left: 20px;
    /*width: 100%;*/
    /*margin-top: 20px;*/
    /*height:32px;*/
    line-height: 32px;
  }
  .rfTop>span{
    color: white;
  }
  /*.add_equipment_table{*/
    /*color:#fff;*/
    /*line-height: 36px;*/
  /*}*/
  /*.add_equipment_table thead{*/
    /*background: #31415a;*/
    /*color:#94a5b9;*/
    /*height:36px;*/
  /*}*/
  .rfTop>span{
    padding:0 20px;
  }
  .rfBottom{
    position: absolute;
    top:32px;
    left:20px;
    right:20px;
    bottom:50px;
    border:#31415a solid 1px;
  }
  .thumbnail{
    position: absolute;
    left:20px;
    bottom:10px;
  }
  .add_energy_list{
    overflow-y: scroll;
    position: absolute;
    top:32px;
    bottom:0;
    left:0px;
    right:0px;
  }
  .btn1{
    position: relative;
    bottom: 10px;
    width:100px;
    height: 32px;
    border-radius: 8px;
    color:white;
    margin-right: 20px;
    float:right;
  }
  .btn_reading{
    background-color: #2c3441;
    border: 1px solid #62a3ff;
    color:#62a3ff;
  }
  .btn2{
    border:#62a3ff solid 1px;
    width:90px;
    height: 32px;
    border-radius: 5px;
    color:white;
    background-color: #2c3441;
  }
</style>
