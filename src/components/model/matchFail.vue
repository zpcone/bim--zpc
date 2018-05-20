<template>
  <div class="main">
    <div class="top">
      <Button icon="arrow-return-left" size="small" class="return">返回单体管理</Button>
    </div>
    <div class="main-body">
      <div class="tableDatas">
        <div class="leftTable">
          <p>模型层高表</p>
          <table width="100%">
            <tr>
              <th>名称</th>
              <th>标高(m²)</th>
            </tr>
            <tr v-for="data in modelData">
              <td>{{data.name}}</td>
              <td>{{data.height}}</td>
            </tr>
          </table>
        </div>
        <div class="rightTable">
          <checkInfo class="checkInfo"></checkInfo>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import checkInfo from './checkInfo'
  export default {
    name: 'matchFail',
    components: {checkInfo},
    data () {
      return {
        modelData: [      // newCreate 数据
          {
            name: 'L003',
            height: 10.4
          },
          {
            name: 'L002',
            height: 10.4
          },
          {
            name: 'L001',
            height: 10.4
          },
          {
            name: 'B01',
            height: 10.4
          },
          {
            name: 'B02',
            height: 10.4
          }
        ]
      }
    }
  }
</script>
<style scoped>
  .main{
    position:absolute;
    left:0;
    right:0;
    top:0;
    bottom: 0;
  }
  /*顶部返回 样式表*/
  .top{
    height: 40px;
    line-height: 40px;
    background-color: #1b212d;
  }
  .top .return{
    position: relative;
    left: 10px;
    color: #1ca1f9;
    background-color: #1b212d;
    border: 1px solid #555; 
  }
  /*下面布局的样式表*/
  .main-body
  {
  }
  .tableDatas>div{
    position: absolute;
    top: 50px;
    bottom: 10px;
    background-color: #fff;
    border: 1px solid #dddee1;
    border-radius: 6px;
  }
  .tableDatas th, .tableDatas td{
    border-top: 1px solid #dddee1;
    border-bottom: 1px solid #dddee1;
  }
  .tableDatas td:nth-child(2), .tableDatas td:nth-child(3),.tableDatas th:nth-child(2){
    border-left: 1px solid #dddee1;
  }
  /*下面左边表的样式表*/
  .leftTable{
   width: calc(30% - 10px);
   left: 10px;
  }
  .leftTable>p{
    height: 30px;
    line-height: 30px;
    padding-left: 15px;
    background-color: #1ca1f9;
    color: #ffffff;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
  .leftTable table{
    width: 100%;
  }
  .leftTable th{
    background-color: #f8f8f9;
  }
  .leftTable th, td{
    height: 40px;
    text-align: center;
  }
  /*下面右边表的样式表*/
  .rightTable{
    width: calc(70% - 20px);
    min-width: 1080px;
    left: calc(30% + 10px);
  }
  .rightTable .checkInfo{
    width: 100%;
  }
</style>