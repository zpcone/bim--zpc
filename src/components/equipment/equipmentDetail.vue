<template>
  <!-- <div class="detailbox" :class="isAddHeight?'addHeight':''"> -->
  <div class="detailbox">
    <div class="title clearfix">
      <div class="goBack">
        <router-link :to="{ path: '/main/splitScreen/equipmentList'}"><Icon type="arrow-return-left" style="color: #62A3FE; margin-right: 5px;font-size:20px;line-height:40px"></Icon><span>返回</span></router-link>
      </div>
      <h3>
        <router-link :to="{ path: '/main/splitScreen/equipmentList'}">设备管理</router-link>
        <span>> 设备管理详情</span>
      </h3>
      <div class="detail_r_type">
       <span><router-link :to="{ path: '/main/splitScreen/equipmentDetail/' + id + '/' + eleId + '/summary'}" activeClass="active">概述</router-link></span>
        <router-link :to="{ path: '1'}" activeClass="active">历史</router-link>
        <span><router-link :to="{ path: '/main/splitScreen/equipmentDetail/' + id + '/' + eleId + '/record'}" activeClass="active">运行记录</router-link></span>
      </div>
    </div>
    <div class="line"></div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'equipmentDetail',
  data () {
    return {
      id: this.$route.params.id,
      eleId: this.$route.params.eleId
    }
  },
  computed: {
    // isAddHeight: function () {
    //   if (this.$route.fullPath.endsWith('record')) {
    //     return true
    //   } else if (this.$route.fullPath.endsWith('summary')) {
    //     return false
    //   }
    // }
  },
  mounted () {
    this.$store.commit('setEquipument', this.eleId)
  },
  methods: {
  }
}
</script>
<style scoped>
  .detailbox{
    position:absolute;
    top:0;
    left:20px;
    right:20px;
    bottom:20px;
  }

/*  .addHeight {
    height: 100%;
  }
*/
  .goBack {
    float: left;
    margin-right: 15px;
  }

  .goBack span{
    font-size: 14px;
  }

  h3 {
    line-height: 45px;
    float: left;
    width: 270px;
  }
  h3 a {
    color: #b3c6dd;
  }
  h3 span {
    color: #64707d;
  }
  .title .detail_r_type{
    min-width: 1000px;
  }
  .line {
    border-bottom: #314159 solid 1px;
  }
  .detail_r_type a {
    margin-right: 10px;
    margin-top: 14px;
    line-height: 30px;
    border: #889aaf solid 1px;
    border-bottom: none;
    padding: 0 15px;
    display: inline-block;
    color: #fff;
    border-radius: 4px 4px 0 0;
    background: #323942;
  }
  .detail_r_type a.active {
    background-color: #63a2ff;
  }
  .detail_r_type span {
    color: #acbed4;
  }
  .detail_r_type span label {
    color: #687482;
  }
</style>
