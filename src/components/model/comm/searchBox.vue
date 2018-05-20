<template>
  <p class="pro_fileSearch">
    <input type="text" placeholder="搜索您的文件" :value="value" @input="updateValue($event.target.value)">
    <span class="delete-icon">
        <em>×</em>
    </span>
    <input type="button"> 
  </p>
</template>
<script>
export default {
  name: 'searchBox',
  data () {
    return {
      isDeleteValue: false
    }
  },
  props: ['value'],
  /*
  watch: {
    value: function (val, oldVal) {
      if (val.length > 0) {
        this.isDeleteValue = true
      } else {
        this.isDeleteValue = false
      }
    }
  },
  */
  methods: {
    updateValue: function (value) {
      // var newValue = this.Comm.trim(this.newFolderName)
      this.$emit('input', value)
    }
    /*
    deleteValue: function () {
      this.value = ''
    }
    */
  }
}
</script>
<style scoped>
  /*   搜索框   */ 
  .pro_fileSearch{
    height: 28px;
    width: 100%;                                 
    border: 1px solid #e6e6e6;
    border-radius:28px;
    overflow: hidden;
    position: relative;
    background-color:#eaeff0;
  }
  .pro_fileSearch input[type=text]{
    height: 26px;
    width: calc(100% - 30px);
    border: none;
    outline: none;
    text-indent: 10px;
    background-color:#eaeff0;
  }
  
  .pro_fileSearch span.delete-icon{
    display: none;
    height: 26px;
    line-height: 26px;
    width: 26px;
    text-align: center;
    position: absolute;
    right: 30px;
    top: 0;
    z-index: 10;
    cursor: pointer;
    font-size: 16px;
  }
  
  .pro_fileSearch input[type=button]{
    float: right;
    border: none;
    height: 26px;
    width: 30px;
    outline: none;
    background:url(../../../assets/project_search.png) no-repeat center;
  }
</style>
