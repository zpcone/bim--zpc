<template>
<div style="margin-top: 45px;">
  <div class="neck">
    <span>计量表名称：{{retureDeading.meter_name}}</span>
    <span>设备编号：{{retureDeading.code_number}}</span>
    <span>倍率：{{retureDeading.rate}}</span>
  </div>
  <div class="nav">
    <div class="basic">
      <p>上期抄表时间：<span>{{retureDeading.last.create_time}}</span></p>
      尖峰指数：<span>{{}}</span>

    </div>
    <div class="basic">
      <p>本期值：<span>0.00 Kwh</span></p>
      <p>上期值：<span>：0.00 Kwh</span></p>
    </div>
    <div class="basic">
      <p>上期用量：<span>{{retureDeading.last.use_amount}} Kwh</span></p>
      <p>本期用量：<span>0.00 Kwh</span></p>
    </div>
  </div>
  <div class="footer">
    <button class="btn1 bj">编 辑</button>
    <router-link :to="{ path: '/calculate'}"><button class="btn2">返回列表</button></router-link>
  </div>
</div>
</template>
<script>
  export default {
    data () {
      return {
        id: this.$route.params.id,
        readingData: {}
      }
    },
    components: {drag},
    computed: {
      retureDeading: function () {
        if (this.readingData.energy_type === '1') {
          this.readingData.energy_type = '电能'
        }
        if (this.readingData.energy_type === '2') {
          this.readingData.energy_type = '水能'
        }
        if (this.readingData.energy_type === '3') {
          this.readingData.energy_type = '燃气'
        }
        if (this.readingData.energy_type === '4') {
          this.readingData.energy_type = '热能'
        }
        return this.readingData
      }
    },
    methods: {
      // 获取设备详情
      getDetailDate () {
        this.axios.get(this.Comm.baseUrl, {
          params: {
            shop_id: this.Comm.shopIds.id,
            module: this.Comm.modules.module2,
            opt: 'meter_record_ready',
            id: this.id
          }
        })
          .then((response) => {
            const result = response.data
            this.readingData = result.data[0]
            console.log(this.readingData)
          })
      }
    },
    mounted () {
      this.getDetailDate()
    }
  }
</script>
<style scoped>
  /*.detailbox{*/
  /*position:absolute;*/
  /*height:50%;*/
  /*left:0;*/
  /*right:0;*/
  /*bottom:0;*/
  /*background: #1b212d;*/
  /*padding:0 20px;*/
  /*}*/
  .neck{
    line-height:50px;
    border-bottom:#314159 solid 1px;
  }
  .neck>span{
    margin-right: 20px;
  }
  .nav{
    height:70%;
  }
  .basic>span{
    width: 80px;
    padding: 5px 20px;
    border: 1px solid #314159;
    border-radius: 3px;
  }
  .basic span{
    color: #acbed4;
  }
  .basic{
    width: 33%;
    height:100%;
    float: left;
    margin-top:20px;
    padding-left:20px;
  }
  .basic p {
    line-height:35px;
    margin-bottom: 20px;
  }
  .btn1{
    width:90px;
    height: 32px;
    border-radius: 16px;
    color:white;
    margin-right: 20px;
  }
  .btn2{
    border:#21caf1 solid 1px;
    width:90px;
    height: 32px;
    background: #1a222f;
    border-radius: 16px;
    color:#21caf1;
  }
  .footer{
    position: relative;
    text-align: center;
    bottom: 50px;
  }
</style>
