let version = function (array) {
  let newarray = []
  let obj = {}
  for (let i = 0; i < array.length; i++) {
    if (obj[array[i].name] && array[i].type === 1) {
      newarray = version.getArray(newarray, obj[array[i].name], array[i])
    } else {
      if (array[i].type === 1) {
        obj[array[i].name] = array[i].name
      }
      newarray.push(array[i])
    }
  }
  return newarray
}
version.getArray = function (array, name, data) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].name === name) {
      if (array[i]['brothers']) {
        array[i]['brothers'].push(data)
      } else {
        array[i]['brothers'] = []
        array[i]['brothers'].push(data)
      }
    }
  }
  return array
}

module.exports = version
