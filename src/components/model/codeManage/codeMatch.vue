<template>
  <div class="main">
    <div class="left">
      <p>图元树</p>
      <div class="left-content">
        <div class="buttonGroup">
          <Button type="primary">自动匹配</Button>
          <Button style="margin-left: 10px">手动匹配</Button>
          <Select class="choose" v-model="matchState">
            <Option v-for="item in matchList" :value="item.value" :key="item">{{item.label}}</Option>
          </Select>
        </div> 
        <div class="tree">
          <folderTreeCheck :isData="folderTreeData" :folderClick="folderClick" :left_tree.sync="left_tree" :selectedElementsId="selectedElementsId" :width="folderTreeWidth" :iconClicks="iconClicks" ></folderTreeCheck>
        </div>
      </div>
    </div>
    <div class="center">
      <p>优服设备详情</p>
      <div class="center-content">
        <p>
          <label>属性</label>
          <Select v-model="property" style="width: 100px">
            <Option v-for="item in propertyList" :value="item.value" :key="item">{{item.label}}</Option>
          </Select>
          <label style="margin-left: 16px">系统分类</label>
          <Select v-model="classify" style="width: 100px">
            <Option v-for="item in classifyList" :value="item.value" :key="item">{{item.label}}</Option>
          </Select>
        </p>
        <p>
          <label>运行状态</label>
          <Select v-model="state" style="width: 120px">
            <Option v-for="item in stateList" :value="item.value" :key="item">{{item.label}}</Option>
          </Select>
          <Input icon="android-search" style="width: 120px; margin-left: 4px"></Input>
        </p>
      </div>
      <table width="100%">
        <tr>
          <th><Checkbox></Checkbox></th>
          <th>编号</th>
          <th>安装位置</th>
        </tr>
        <tr v-for="item in equipDetial">
          <td><Checkbox></Checkbox></td>
          <td>{{item.id}}</td>
          <td>{{item.position}}</td>
        </tr>
      </table>
    </div>
    <div class="right">
      <totalModel></totalModel>
    </div>
  </div>
</template>
<script>
import folderTreeCheck from './folderTreeCheck.vue'
import totalModel from '../totalModel.vue'
export default {
  name: 'codeMatch',
  components: {totalModel, folderTreeCheck},
  data () {
    return {
      matchState: '全部',
      matchList: [
        {
          value: '全部',
          label: '全部'
        },
        {
          value: '已匹配',
          label: '已匹配'
        },
        {
          value: '未匹配',
          label: '未匹配'
        },
        {
          value: '多匹配',
          label: '多匹配'
        }
      ],
      folderTreeData: [{
        child: [
          {
            id: '1',
            name: '你说',
            type: 1
          }
        ],
        id: '0',
        name: '全部',
        type: 0
      }],
      left_tree: 0,  // tree的margin-left
      selectedElementsId: '0', // 是否为当前被选中的文件夹
      folderTreeWidth: '',
      property: '全部', // v-model 属性
      propertyList: [
        {
          value: '全部',
          label: '全部'
        },
        {
          value: '设备',
          label: '设备'
        },
        {
          value: '计量表',
          label: '计量表'
        },
        {
          value: '设施',
          label: '设施'
        }
      ],
      classify: '全部', // v-model 系统分类
      classifyList: [
        {
          value: '全部',
          label: '全部'
        },
        {
          value: '设施',
          label: '设施'
        },
        {
          value: '仪器仪表',
          label: '仪器仪表'
        },
        {
          value: '电力系统',
          label: '电力系统'
        },
        {
          value: '楼控系统',
          label: '楼控系统'
        },
        {
          value: '空调系统',
          label: '空调系统'
        },
        {
          value: '消防系统',
          label: '消防系统'
        },
        {
          value: '电梯系统',
          label: '电梯系统'
        },
        {
          value: '安防系统',
          label: '安防系统'
        }
      ],
      state: '全部',  // v-model 运行状态
      stateList: [
        {
          value: '全部',
          label: '全部'
        },
        {
          value: '设备',
          label: '设备'
        },
        {
          value: '计量表',
          label: '计量表'
        },
        {
          value: '设施',
          label: '设施'
        }
      ],
      equipDetial: [
        {
          id: '170299',
          position: '1号楼-1层-101室'
        },
        {
          id: '1700300',
          position: '1号楼-1层-101室'
        },
        {
          id: '1700301',
          position: '1号楼-1层-101室'
        },
        {
          id: '1700302',
          position: '1号楼-1层-101室'
        },
        {
          id: '1700303',
          position: '1号楼-1层-101室'
        },
        {
          id: '1700304',
          position: '1号楼-1层-101室'
        }
      ]
    }
  },
  methods: {
    folderClick (id) {  // 定位到当前显示文件夹的id
    },
    iconClicks () {
      let divWidth = this.$refs.scrollWidth
      this.folderTreeWidth = divWidth
    }
  }
}
</script>
<style scoped>
.left, .center, .right{
  position: absolute;
  top: 0;
  bottom: 0;
  box-sizing: border-box;
  border: 1px solid #dddee1;
  background-color: #fff;
}
/*左边部分的样式*/
.left{
  width: 220px; 
}
.left>p, .center>p{
  height:30px;
  line-height: 30px;
  text-align: center;
  background-color: #f3f3f3;
}
.left-content .buttonGroup{
  padding: 10px;
}
.left-content .buttonGroup .choose{
  margin-top: 10px;
}
.left-content .tree{
}
/*中间部分的样式*/
.center{
  width:320px;
  left: 220px;
}
.center .center-content{
  padding: 0 10px 15px 10px;
}
.center-content p{
  margin-top: 15px;
}
.center th,td{
  height: 30px;
  border-top: 1px solid #dddee1;
  border-bottom: 1px solid #dddee1;
}
.center th{
  background-color: #f8f8f9;
}
.center td{
  text-align: center;
}
/*右边部分样式*/
.right{
  right: 0;
  left: 550px;
}
</style>