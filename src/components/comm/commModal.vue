<!-- 引用方法
<commModal :modalIsShow.sync="modalIsShow" :modalWidth='466' :modalHeight='633'>
  <s slot="modalTitle">设备设施运行状态</s>
  <div slot="modalText">
    详情
  </div>
</commModal>
-->
<template>
  <div class="modal_box">
    <div class="modal_container" v-if="modalIsShow">
      <div class="modal_main" v-bind:style="{ width:width + 'px',height:height + 'px' }">
        <div class="modal_main_box">
          <h4 class="modal_title">
            <slot name="modalTitle"></slot>
            <span @click="close"></span>
          </h4>
          <div class="modal_text">
            <slot name="modalText"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
      data () {
        return {
        }
      },
      props: {
        modalIsShow: {
          default: false
        },
        width: {
          default: '348'
        },
        height: {
          default: '405'
        }
      },
      methods: {
        close () {
          this.$emit('update:modalIsShow', false)
        }
      }
    }
</script>
<style scoped>
  .modal_container{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.5);
  }
  .modal_main{
    height: 348px;
    width: 405px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    color: #282828;
    background: rgba(0, 0, 0, 0.6);
  }
  .modal_main_box{
    position: absolute;
    top:12px;
    left:12px;
    right:12px;
    bottom:12px;
    background: #fff;
  }
  .modal_title{
    line-height:45px;
    padding:0 15px;
    background: #f0f9ff;
    border-bottom: #c5e0f8 solid 1px;
    font-weight: bold;
    font-size: 14px;
  }
  .modal_title span {
    display:block;
    height: 15px;
    width: 15px;
    background:url("../../assets/commModal_close.png");
    cursor: pointer;
    float:right;
    margin:15px 0;
  }
  .modal_text{
    padding: 15px;
  }
</style>
