<template>
  <div class="resizeT">
    <div class="resizeIcon" style="text-align: center">
      <Icon type="android-arrow-dropup-circle" style="font-size: 16px"></Icon>
    </div>
  </div>
</template>
<script>
  var dragMinHeight = 300
  /* eslint-disable no-new */
  export default {
    props: ['modelSize'],
    mounted () {
      console.log(this.modelSize)
      var oScreen = document.getElementsByClassName('screenTop')[0]// 包裹器的节点
      var oDrag = document.getElementsByClassName('screenBottom')[0]// 包裹器的节点
      var oT = document.getElementsByClassName('resizeT')[0]// 包裹器的节点
      this.resize(oDrag, oT, false, true, true, false, oScreen)
//      oDrag.style.left = 0 + 'px'
      oDrag.style.bottom = 0 + 'px'
    },
    methods: {
      resize (oParent, handle, isLeft, isTop, lockX, lockY, topDiv) {
        const _this = this
        handle.onmousedown = function (event) {
          var event1 = event || window.event
          var disX = event1.clientX - handle.offsetLeft
          var disY = event1.clientY - handle.offsetTop
//      var iParentTop = oParent.offsetTop // 父元素 top
          var iParentLeft = oParent.offsetLeft
          var iParentWidth = oParent.offsetWidth
          var iParentHeight = oParent.offsetHeight
          var tParentHeight = topDiv.offsetHeight
          document.onmousemove = function (event) {
            var event2 = event || window.event
            var iL = event2.clientX - disX // 鼠标滚动的距离
            var iT = event2.clientY - disY // 鼠标滚动的高度
            var maxW = document.documentElement.clientWidth - oParent.offsetLeft
//        var maxH = document.documentElement.clientHeight - oParent.offsetTop
            var iW = isLeft ? iParentWidth - iL : handle.offsetWidth + iL
            var iH = isTop ? iParentHeight - iT : handle.offsetHeight + iT // 滚动之后的高度
            isLeft && (oParent.style.left = iParentLeft + iL + 'px')
//        isTop && (oParent.style.top = iParentTop + iT + 'px')
            isTop && (oParent.style.bottom = 0 + 'px')
            iW > maxW && (iW = maxW)
            lockX || (oParent.style.width = iW + 'px')
            iH < dragMinHeight && (iH = dragMinHeight)
//        iH < maxH && (iH = maxH)
//        lockY || (oParent.style.height = iH + 'px')
            _this.modelSize()
            if (!lockY) {
              oParent.style.height = iH + 'px'
              topDiv.style.height = tParentHeight + iT + 'px'
            }
            if ((isTop && iH === dragMinHeight)) document.onmousemove = null
            return false
          }
          document.onmouseup = function () {
            document.onmousemove = null
            document.onmouseup = null
          }
          return false
        }
      }
    }
  }
</script>

<style>
  .resizeT {
    position: absolute;
    top: 0;
    width: 100%;
    height: 8px;
    cursor: n-resize;
    z-index: 99;
  }
  .resizeIcon{
    position: absolute;
    top:8px;
    left:50%;
  }
</style>
