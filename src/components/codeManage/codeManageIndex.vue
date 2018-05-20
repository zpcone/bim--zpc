<template>
  <div class="main">
    <div class="top">
      <router-link :to="{ path: 'dataCoding'}">
        <div class="group" @click="lightCode">
          <Button type="primary">图元编码</Button>
          <div v-if="isCode" class="mask-layer"></div>
        </div>
      </router-link>
      <router-link :to="{ path: 'codeMatch'}">
        <div class="group" @click="lightMatch">
          <Button type="primary">编码匹配</Button>
          <div v-if="isMatch" class="mask-layer"></div>
        </div>
      </router-link>
      <Select v-model="singerFloor" style="width:200px" placeholder="单体-楼层" class="top-btn select">
        <Option-group label="1#">
            <Option v-for="item in singerGroup1" :value="item.value" :key="item"><Checkbox>{{ item.label }}</Checkbox></Option>
        </Option-group>
        <Option-group label="2#">
            <Option v-for="item in singerGroup2" :value="item.value" :key="item"><Checkbox>{{ item.label }}</Checkbox></Option>
        </Option-group>
      </Select>
      <Select v-model="professors" style="width:200px;" placeholder="专业" multiple class="top-btn select">
        <Option v-for="item in professorGroup" :value="item.value" :key="item"><Checkbox>{{ item.label }}</Checkbox></Option>
      </Select>
      <Select v-model="system" style="width:200px" placeholder="系统" class="top-btn select">
        <Option v-for="item in systemGroup" :value="item.value" :key="item"><Checkbox>{{ item.label }}</Checkbox></Option>
      </Select>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  
  export default {
    name: 'codeManageIndex',
    data () {
      return {
        singerFloor: '',
        professors: [],
        system: '',
        isMatch: false, // 是否遮罩编码匹配
        isCode: false, // 是否遮罩图元编码
        singerGroup1: [
          {
            value: '1',
            label: 'F001'
          },
          {
            value: '2',
            label: 'F002'
          },
          {
            value: '3',
            label: 'F003'
          },
          {
            value: '4',
            label: 'F004'
          }
        ],
        singerGroup2: [
          {
            value: '1',
            label: 'F001'
          },
          {
            value: '2',
            label: 'F002'
          }
        ],
        professorGroup: [
          {
            value: '1',
            label: '建筑'
          },
          {
            value: '2',
            label: '结构'
          },
          {
            value: '3',
            label: '给排水'
          },
          {
            value: '4',
            label: '暖通'
          },
          {
            value: '5',
            label: '电气'
          },
          {
            value: '6',
            label: '幕墙'
          }
        ],
        systemGroup: [
          {
            value: '1',
            label: '排水系统'
          },
          {
            value: '2',
            label: '送风系统'
          }
        ]
      }
    },
    methods: {
      lightCode () {
        this.isMatch = true
        this.isCode = false
      },
      lightMatch () {
        this.isCode = true
        this.isMatch = false
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
    height: 50px;
    line-height: 50px;
    background-color: #1b212d;
    
  }
  .top .top-btn{
    margin-left: 10px;
  }
  .top .top-btn a{
    color: #fff;
  }
  .group, .select{
    float: left;
  }
  .select{
    margin-top: 10px;
  }
  .group{
    font-size: 0;
    position: relative;
    margin-left: 10px;
  }
  .mask-layer{
    position: absolute;
    display: inline-block;
    height: 100%;
    width: 100%;
    left: 0px;
    background-color: rgba(0,0,0,.2);
  }
  /*显示模型样式表 */
  .content{
    position: absolute;
    top: 60px;
    bottom: 10px;
    left: 0;
    right: 10px;
  }
</style>