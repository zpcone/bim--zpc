<template>
  <div>
    <div class="screenTop">
      <commLoadModel :initModel="initModel"></commLoadModel>
      <i >{{test}}</i>
      <charts class='show_charts' v-if='this.$store.state.showCharts'></charts>
    </div>
    <div class="screenBottom">
      <drag :modelSize="modelSize"></drag>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  import drag from './comm/commDrag'
  import commLoadModel from './comm/commLoadModel'
  import charts from './equipment/MeterReadingCharts'
  import codeData from './modules/codeData'
  export default {
    name: 'splitScreen',
    data () {
      return {
      }
    },
    components: {commLoadModel, drag, charts},
    mounted () {
    },
    computed: {
      'test' () {
        // console.log(window.oViewer)
        if (this.$store.state.isLoadModel) {
          if (this.$store.state.equipmentId) {
            let arrId = []
            let dbId = codeData[this.$store.state.equipmentId][0]
            if (dbId) {
              arrId.push(dbId)
              // window.oViewer.inspect(arrId)
              debugger
              window.oViewer.select(arrId)
              // window.oViewer.isolate(arrId)
              // window.oViewer.fitToView()
            }
            this.$store.commit('setEquipument', '')
          }
        }
      }
    },
    watch: {
      '$route': function () {
        if (this.$route.fullPath.split('/')[2] === 'equipmentDetail' || this.$route.fullPath.split('/')[2] === 'energyCheck') {
          this.$store.commit('isShowCharts', true)
        } else {
          this.$store.commit('isShowCharts', false)
        }
      }
    },
    methods: {
      /*
       * 初始化模型
       */
      initModel () {
        const _this = this
        this.$store.commit('setloadModel')
        oViewer.addEventListener(Bimsop.Viewing.OBJECT_TREE_CREATED_EVENT, function (event) {
          oViewer.getPropertyPanel(true)
          Bimsop.FIRE_PROPERTY = true   // 开启属性按钮
          _this.addressState = oViewer.getState()
          oViewer.addEventListener('CLICK_PROPERTY', function (event) {
            if (event.data) {
              event.data.parameters.forEach(function (item) {
                if (item.name === '注释') {
                  console.log(item.value.valueString, '注释id')
                  if (item.value.valueString) {
                    let id = codeData[item.value.valueString][1]
                    if (id) {
                      _this.$router.push({path: `/splitScreen/equipmentDetail/${id}/${item.value.valueString}/summary`})
                    }
                  }
                }
              })
            }
          })
          oViewer.addEventListener(Bimsop.Viewing.SELECTION_CHANGED_EVENT, function (event) {
            if (event.dbIdArray.length > 0) {
              var dbId = event.dbIdArray[0]
              console.log(dbId, 'dbId')
              window.oViewer.select(arrId)
              // oViewer.getProperties(dbId, function (data) {
              //   console.log(data)
              // })
              // oViewer.search(428, function (data) {
              //   console.log(data)
              //   console.log('qqqqqqqqqqqqqqqqqqqqqqq')
              // }, function (err) {
              //   console.log(err)
              // }, ['注释'])
            }
          })
        })
      },
      /*
       * 修改加载模型的大小
       */
      modelSize () {
        window.oViewer.resize()
      },

      // 销毁组件
      beforeDestroy () {
        window.oViewer.tearDown()()
        window.oViewer.uninitialize()
      }
    }
  }
</script>
<style>
   .screenTop{
     position: absolute;
     height:50%;
     top:0;
     left:0;
     right:0;
   }
  .screenBottom{
    position: absolute;
    height:50%;
    bottom:0;
    left:0;
    right:0;
    overflow-y: auto;
    background: #1b212d;
  }
  .show_charts{
    width: 640px;
    height: 320px;
    z-index: 2;
    position: relative;
    margin: 0 auto;
    top: 40px;
  }
</style>
