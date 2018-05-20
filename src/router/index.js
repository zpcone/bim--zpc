import Vue from 'vue'
import Router from 'vue-router'

// 登录
import index from '@/components/index'
import login from '@/components/login'
import main from '@/components/main'
import splitScreen from '@/components/splitScreen'
// 能源管理
import calculate from '@/components/energyment/calculate' // 计量表管理
import energyList from '@/components/energyment/energyList' // 能源列表
import energyCheck from '@/components/energyment/energyCheck' // 查看列表
import readingRecords from '@/components/energyment/readingRecords' // 抄表记录
import newRecord from '@/components/energyment/newRecord' // 新建抄表记录
import analysis from '@/components/energyment/analysis' // 能效管理统计
import building from '@/components/energyment/building' // 建筑能效概况
import energyReading from '@/components/energyment/energyReading' // 抄表
import buildingStatistics from '@/components/energyment/buildingStatistics' // 建筑能效统
// 设备管理
import equipmentList from '@/components/equipment/equipmentList'
import equipmentDetail from '@/components/equipment/equipmentDetail'
import summary from '@/components/equipment/summary'
import record from '@/components/equipment/record'
// 模型管理
import fileList from '@/components/model/fileList'
import codeManageIndex from '@/components/model/codeManage/codeManageIndex'
import codeManage from '@/components/model/codeManage/codeManage'
import matchFail from '@/components/model/matchFail'
import totalModel from '@/components/model/totalModel'
import dataCoding from '@/components/model/codeManage/dataCoding'
import codeMatch from '@/components/model/codeManage/codeMatch'
// 测试
import test from '@/components/test'
Vue.use(Router)
export default new Router({
  routes: [
    {path: '/index', component: index, alias: '/'},
    { path: '/login', component: login },
    {
      path: '/main',
      component: main,
      children: [
        {
          path: 'splitScreen',
          component: splitScreen,
          children: [
            // 设备管理
            {path: 'equipmentList', component: equipmentList},
            {
              path: 'equipmentDetail/:id/:eleId',
              component: equipmentDetail,
              children: [
                {path: 'summary', component: summary},
                {path: 'record', component: record}
              ]
            },
            // 能源管理
            {path: 'energyList', component: energyList},
            {path: 'calculate', component: calculate},
            {path: 'energyCheck/:id', component: energyCheck},
            {path: 'readingRecords/:id', component: readingRecords},
            {path: 'newRecord', component: newRecord}, // 新建抄表记录
            {path: 'energyReading/:id', component: energyReading}, // 抄表
            {path: 'analysis', component: analysis}, // 能效管理统计
            {path: 'building', component: building}, // 建筑能效概况
            {path: 'buildingStatistics', component: buildingStatistics} // 建筑能效统计
          ]
        },
        // 模型管理

        {path: 'matchFail', component: matchFail}, // 匹配
        {path: 'totalModel', component: totalModel}, // 查看整体模型
        {
          path: 'codeManageIndex',
          component: codeManageIndex,
          children: [
            {path: 'fileList', component: fileList}, // 文件管理
            {path: '', redirect: 'codeManage'},
            {path: 'codeManage', component: codeManage},
            {path: 'dataCoding', component: dataCoding}, // 图元编码
            {path: 'codeMatch', component: codeMatch}  // 编码匹配
          ]
        } // 编码管理
      ]
    },
    // 测试
    { path: '/test', component: test },
    // 其它
    { path: '*', redirect: '/' }
  ]
})
