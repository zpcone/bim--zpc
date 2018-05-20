import requestData from './components/modules/requestData'

class Comm {
  constructor () {
    this.baseUrl = `http://file.helloufu.com/?c=Port&m=actionGet_Web_v2_Port`
    this.emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/   // 邮箱正则
    this.phoneReg = /^1[35678]\d{9}$/   // 手机号6位验证码
    this.shopIds = requestData.shopIds
    this.modules = requestData.modules
    this.fileUploadUrl = 'http://917.bimsop.com'
  }
  /**
  * @ 获取 eleId
  */
  getEleId (id) {
    let arrs = id.split('-')
    return arrs[arrs.length - 1]
  }
  getImageUrl (container, imageName) {
    return 'containers/' + container + '/download/' + imageName
  }
  /**
  * @ 获取 postURL token
  * @ url
  */
  getAccessTokenUrl (url) {
    return this.baseURL + url + '?access_token=' + this.getLocalStorage('accessToken')
  }
  /**
  * @ 获取 localStorage
  * @ key 字段的名字
  */
  getLocalStorage (key) {
    return window.localStorage.getItem(key)
  }
  /**
  * @ 设置 localStorage
  * @ key 字段的名字
  * @ value 字段的内容
  */
  setLocalStorage (key, value) {
    window.localStorage.setItem(key, value)
  }
  /**
  * @ 清除 localStorage
  */
  clearLocalStorage () {
    window.localStorage.clear()
  }
  /**
   * 可见区域的宽和高属性
   */
  screenParmer () {
    let screenParmer = {}
    if (typeof window.innerWidth !== 'undefined') { // Notice:'undefined' is right
      screenParmer.width = window.innerWidth
      screenParmer.height = window.innerHeight
    } else {
      screenParmer.width = document.documentElement.clientWidth
      screenParmer.height = document.documentElement.clientHeight
    }
    return screenParmer
  }
   /**
   * 把json对象解析成url后面的参数
   * param 将要转为URL参数字符串的对象
   * key URL参数字符串的前缀
   * encode true/false 是否进行URL编码,默认为true
   * return URL参数字符串
   */
  urlEncode (param, key, encode) {
    if (param == null) return ''
    var paramStr = ''
    var t = typeof (param)
    if (t === 'string' || t === 'number' || t === 'boolean') {
      paramStr += '&' + key + '=' + ((encode === null || encode) ? encodeURIComponent(param) : param)
    } else {
      for (var i in param) {
        paramStr += '&' + i + '=' + param[i]
      }
    }
    return '?' + paramStr.slice(1)
  }
  /*
   * 格式化时间
   */
  formatTime (time, num) {
    let yy, mm, dd, hh, min, ss, isMorning
    let formatTime = ''
    if (time !== '') {
      time = new Date(Number(time))
      yy = time.getFullYear()
      mm = (time.getMonth() + 1)
      if (mm + 1 < 10) {
        mm = '0' + mm
      }
      dd = time.getDate()
      if (dd < 10) {
        dd = '0' + dd
      }
      hh = time.getHours()
      if (hh < 10) {
        hh = '0' + hh
      }
      isMorning = hh < 12 ? 'AM' : 'PM'
      min = time.getMinutes()
      if (min < 10) {
        min = '0' + min
      }
      ss = time.getSeconds()
      if (ss < 10) {
        ss = '0' + ss
      }
      switch (num) {
        case 0:
          formatTime = yy + mm + dd + hh + min + ss
          break
        case 1:
          formatTime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + min + ':' + ss
          break
        case 2:
          formatTime = yy + '/' + mm + '/' + dd + ' ' + hh + ':' + min + ':' + ss
          break
        case 3:
          formatTime = yy + '年' + mm + '月' + dd + '日' + hh + '时' + min + '分' + ss + '秒'
          break
        case 4:
          formatTime = yy + '-' + mm + '-' + dd
          break
        case 5:
          formatTime = yy + '_' + mm + '_' + dd + ' ' + hh + '_' + min + '_' + ss
          break
        case 6:
          formatTime = mm + '/' + dd
          break
        case 7:
          formatTime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + min
          break
        case 8:
          formatTime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + min + ':' + ss + ' ' + isMorning
          break
      }
    }
    return formatTime
  }
  /*
   * 格式化时间
   */
  attributeTransformation (arr) {
    let result = []
    for (var i = 0; i < arr.length; i++) {
      if (result.length > 0) {
        let isTrue = false
        for (var j = 0; j < result.length; j++) {
          if (result[j].name === arr[i]['groupName']) {
            isTrue = true
            if (arr[i].value.displayValue && arr[i].value.hasValue) {
              result[j].children.push(arr[i])
            }
            continue
          }
        }
        if (!isTrue) {
          result[result.length] = {}
          result[result.length - 1].name = arr[i]['groupName']
          result[result.length - 1].children = []
          if (arr[i].value.displayValue && arr[i].value.hasValue) {
            result[result.length - 1].children.push(arr[i])
          }
        }
      } else {
        result[result.length] = {}
        result[result.length - 1].name = arr[i]['groupName']
        result[result.length - 1].children = []
        if (arr[i].value.displayValue && arr[i].value.hasValue) {
          result[result.length - 1].children.push(arr[i])
        }
      }
    }
    return result
  }
  /*
   * @将对象转化成数组
   */
  jsonToArray (json) {
    let result = []
    for (var i in json) {
      if (json[i].name) {
        result.unshift(json[i])
      }
    }
    return result
  }
  /*
   * @ 获取模型文件的路径
   * @ name 模型的名字不带后缀
   * @ type 文件的类型
   * @ isConvert 是否转换
   */
  getModelFileUrl (name, type, isConvert) {
    let newName, fileUrl
    let index = name.lastIndexOf('.')
    if (!isConvert) {
      if (index !== -1) {
        name = this.transformURL(encodeURI(name.slice(0, index)))
      } else {
        name = this.transformURL(encodeURI(name))
      }
    }
    switch (type) {
      case 0:
        newName = name + '.gbim'
        break
      case 1:
        newName = name + '.pi'
        break
      case 3:
        newName = name + '.sum.json'
        break
      case 4:
        newName = ''
        break
      default:
        newName = name
    }
    fileUrl = `${this.modelConversionAddress}/${name}/${newName}`
    console.log(fileUrl)
    return fileUrl
  }
  /*
   * @ Filter data
   */
  filterArray (arr) {
    let result = []
    arr.forEach(function (item) {
      if (item.elementCount) {
        result.push(item)
      }
    })
    return result
  }
  /*
   * @ Filter data
   */
  transformURL (url) {
    if (url) {
      return url.replace(/\+/g, '%2B')
      .replace(/#/g, '%23')
      .replace(/&/g, '%26')
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29')
      .replace(/=/g, '%3D')
    }
  }
  /*
   * @ 去除空格
   */
  trim (str) {
    return str.replace(/\s/g, '')
  }
}

export default Comm
