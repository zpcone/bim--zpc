<template>
  <div class="">
    <Upload action="http://localhost:8000/api/containers/folder/upload">
        <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
    </Upload>

    <div class="posdiv">
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
    </div>
  </div>
</template>

<script>
import commTable from './comm/commTable'
export default {
  name: 'test',
  data () {
    return {
      arrs: new Array(50)
    }
  },
  components: {commTable}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .posdiv{
    position: absolute;
    left:50px;
    right:50px;
    top:100px;
    bottom:100px;
  }

</style>
