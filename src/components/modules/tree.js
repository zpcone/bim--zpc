var tree = function (config) {
  if (!config) {
    config = {}
  }
  this.data = config.data || {}
  this.father = config.father || 'father'
  this.type = config.type || 'type'
  this.selfId = config.selfId || 'id'
  this.topId = config.topId || '0'
}
tree.prototype.getJson = function (data) {
  const self = this
  data = data || self.data
  function getChild (id) {
    let child = []
    for (let i = 0; i < data.length; i++) {
      if (data[i][self.father] === id) {
        if (data[i][self.type] === 0) {
          var newChild = data[i]
          newChild.child = getChild(data[i].id)
          child.push(newChild)
        } else {
          var newChildTwo = data[i]
          child.push(newChildTwo)
        }
      }
    }
    return child
  }
  return getChild('0')
}
tree.prototype.getFathers = function (data, selfID) {
  const self = this
  data = data || self.data
  let fatherArray = []
  let isReturn = false
  function isTop (selfId) {
    if (selfId === self.topId) {
      return fatherArray
    } else {
      for (let i = 0; i < data.length; i++) {
        if (data[i][self.selfId] === selfId) {
          if (data[i][self.selfId] === selfID) {
            fatherArray.unshift(data[i])
          }
          if (data[i][self.father] !== self.topId) {
            const fatherObj = getFather(data[i][self.father])
            fatherArray.unshift(fatherObj)
            isTop(fatherObj[self.selfId])
          } else {
            isReturn = true
          }
        }
      }
      if (isReturn) {
        return fatherArray
      }
    }
  }
  function getFather (selfId) {
    for (let i = 0; i < data.length; i++) {
      if (data[i][self.selfId] === String(selfId)) {
        return data[i]
      }
    }
  }
  return isTop(selfID)
}
module.exports = tree
