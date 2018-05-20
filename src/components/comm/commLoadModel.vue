<template>
  <div ref="modelbrowser" >
    <slot name="modeltext"></slot>
  </div>
</template>
<script>
export default {
  name: 'commLoadModel',
  data () {
    return {
      modelUrl: ''
    }
  },
  props: ['initModel'],
  mounted () {
    this.loadModel()
  },
  methods: {
    /**
    * @ 加载模型
    */
    loadModel () {
      const _this = this
      const container = this.$refs.modelbrowser
      window.oViewer = null
      // var oViewer = null

      const options = { 'docid': './static/model/taoyuanjv/桃源居带水电删除双人床消毒柜.gbim', env: 'Local' }
      // var docs = {'path': 'static/model/model2/racsample.gbim'}

      Bimsop.XIE_TONG = true
      window.oViewer = new Bimsop.Viewing.Private.GuiViewer3D(container, {}) // With toolbar

      Bimsop.Viewing.Initializer(options, function () {
        oViewer.start()
        oViewer.load(options.docid)
        oViewer.autocam.calculateCubeTransform('top')
        oViewer.autocam.elapsedTime = 0
        _this.initModel()
        // _this.$emit('initModel', oViewer)
        // window.document.querySelector('#guiviewer3d-toolbar').style.display = 'none'
        // oViewer.setBackgroundColor(255, 255, 255, 1, 105, 105)
      })
    }
  }
}
</script>

<style scoped>
  .modelbrowser{
    position: absolute;
    left:0;
    right:0;
    bottom:0;
    top:0;
  }
</style>
