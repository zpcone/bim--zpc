let store = {
  state: {
    isLoadModel: false,     // 模型是否加载
    equipmentId: '',        // 设备图元id
    showCharts: false       // 设备详情列表页面的仪表图和柱状图
  },
  mutations: {
    // 更新设备图元id
    setEquipument (state, id) {
      state.equipmentId = id
    },
    setloadModel (state) {
      state.isLoadModel = true
    },
    // 设置是否显示charts
    isShowCharts (state, isShow) {
      state.showCharts = isShow
    }
  }
}

export default store
