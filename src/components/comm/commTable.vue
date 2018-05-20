<!--
  <commTable>
    <tr slot="tablebox_head" >
      <th width="20%">编号</th>
      <th width="20%">名称</th>
    </tr>
    <tbody slot="tablebox_body">
      <tr v-for="(item,index) in arrs">
        <td>index</td>
        <td>index</td>
      </tr>
    </tbody>
  </commTable>
 -->

<template>
  <div class="table_box">
    <table width="100%">
      <thead>
        <slot name="tablebox_head"></slot>
      </thead>
    </table>
    <div class="table_box_list">
      <table width="100%">
        <slot name="tablebox_body"></slot>
      </table>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    }
  }
</script>
<style scoped>
  .table_box{
    position: absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
  }
  table {
    color: #fff;
    line-height: 36px;
    text-align: center;
    background: #1b212d;
  }
  table thead {
    background: #31415a;
    color: #94a5b9;
    word-break: keep-all;
    white-space:nowrap;
    overflow: hidden;
  }
  table tbody tr{
    border-bottom:#262e3b solid 1px;
  }
  table tbody tr:last-child{
    border-bottom: none;
  }
  table tbody tr:hover{
    background:#1f2734;
  }
  table span{
    padding:0 5px;
  }
  .table_box_list{
    position: absolute;
    left:0;
    bottom:0;
    top:36px;
    right:0;
    overflow-y:auto;
    border:#31415a solid 1px;
  }
  .light {
    color: #63a2ff;
    cursor: pointer;
  }
  .red{}
</style>
