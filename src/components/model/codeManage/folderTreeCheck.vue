<template>
  <!--新修改-->
  <ul class="foldertree_group" :style="{'width': width + 'px'}" > <!-- 传入的原始值-->
    <li v-for="item in isData" v-if="item.type === 0" ><!--如果是文件夹type = 0 的时候显示-->
      <!--下边是动态的样式-->
      <div  ref="treeNode" :class="{'cur': selectedElementsId == item.id}" :style="{'padding-left': myleft + 'px'}" @click="lineClick(item.id, $event)" >
        <Checkbox :checked="selectedElementsId == item.id"></Checkbox>
        <i v-if="item.child" @click="iconClick($event)"></i>
        <span>
          {{item.name}}
        </span>
        <label style="display: inline-block;" v-if="!item.child">bm</label>
      </div>
      <p class="dn">
        <folderTreeCheck :folderClick="folderClick" :left_tree.sync="myleft" :isData='item.child' :selectedElementsId="selectedElementsId" :width="width" :iconClicks="iconClicks" ></folderTreeCheck>
      </p>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'folderTreeCheck',
  data () {
    return {
      myleft: this.left_tree + 15
    }
  },
  props: ['isData', 'folderClick', 'left_tree', 'selectedElementsId', 'width', 'iconClicks'],
  methods: {
    iconClick (e) {
      e.stopPropagation()
      if (e.target.parentNode.nextSibling.nextSibling) { // 判断是否有三层结构
        if (e.target.className === 'cur') { // 点击删除class
          e.target.className = ''
          e.target.parentNode.nextSibling.nextSibling.className = 'dn'
        } else {
          e.target.className = 'cur'
          e.target.parentNode.nextSibling.nextSibling.className = 'db'
        }
      }
      this.iconClicks()
    },
    lineClick (id, e) {
      if (e.target.nodeName.toLowerCase() === 'div') {
        if (e.target.firstChild.className === 'cur') {
          e.target.firstChild.className = ''
          e.target.nextSibling.nextSibling.className = 'dn'
        } else {
          e.target.firstChild.className = 'cur'
          e.target.nextSibling.nextSibling.className = 'db'
        }
      } else if (e.target.nodeName.toLowerCase() === 'span') {
        if (e.target.previousSibling.previousSibling.className === 'cur') {
          e.target.previousSibling.previousSibling.className = ''
          e.target.parentNode.nextSibling.nextSibling.className = 'dn'
        } else {
          e.target.previousSibling.previousSibling.className = 'cur'
          e.target.parentNode.nextSibling.nextSibling.className = 'db'
        }
      } else if (e.target.nodeName.toLowerCase() === 'label') {
        if (e.target.parentNode.previousSibling.previousSibling.className === 'cur') {
          e.target.parentNode.previousSibling.previousSibling.className = ''
          e.target.parentNode.parentNode.nextSibling.nextSibling.className = 'dn'
        } else {
          e.target.parentNode.previousSibling.previousSibling.className = 'cur'
          e.target.parentNode.parentNode.nextSibling.nextSibling.className = 'db'
        }
      }
      this.folderClick(id)
    }
  }
}
</script>
<style scoped >
  /*   文件树    */
  .tree{
    padding:10px 0;
    overflow:auto;
    min-width: 250px;
  }
  .foldertree_group{
    line-height: 34px;
  }
  .foldertree_group li div{
    display: block;
    height: 34px;
    color:#1e1e1e;
    padding-right:10px;
    position: relative;
    width:100%;
    box-sizing: border-box;
    padding-left: 15px;
  }
  .foldertree_group li div i{
    padding:10px 15px;
    width: 40px;
    height: 20px;
    margin:7px 0;
    background: url(../../../assets/tree/folder.png) no-repeat left center;
  }
  .foldertree_group li div span{
    margin-left:10px;
    word-break:keep-all;
    white-space:nowrap;
    margin-right:30px;
    line-height: 34px;
    cursor: pointer;
  }
  .foldertree_group li i.cur{
    background: url(../../../assets/tree/folders.png) no-repeat center;
    cursor: pointer;
  }
  .foldertree_group li div label{
    color:#1e1e1e;
    padding-left:5px;
  }

  .foldertree_group li div:hover{
    color:#42b2fc;
  }
</style>
