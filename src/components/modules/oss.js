import Comm from '../comm.js'
import co from 'co'
import aliOSS from 'ali-oss'
import axios from 'axios'

var urllib = aliOSS.urllib
var Buffer = aliOSS.Buffer
var OSS = aliOSS.Wrapper
var STS = OSS.STS

exports.applyTokenDo = function (func,file,key,url,sapceId,fatherId,accessToken,callback) {
  console.log(file)
  return axios.post(url + '?access_token=' +  accessToken, {
    'filename': file.name,
    'size': file.size,
    'sapceId': sapceId,
    'fatherId': fatherId
  }).then(function (result) {
    var creds = result.data
    console.log(creds.SecurityToken)
    var client = new OSS({
      region: creds.region,
      accessKeyId: creds.AccessKeyId,
      accessKeySecret: creds.AccessKeySecret,
      stsToken: creds.SecurityToken,
      bucket: creds.bucket
    })
    return func(client, file, key, callback, creds)
  })
}

exports.uploadFile = function (client,file,key,callback, creds) {
  co(function* () {
    var checkpoint;
    // retry 5 times
    for (var i = 0; i < 5; i++) {
      var result = yield client.multipartUpload(creds.fileName, file, {
        checkpoint: checkpoint,
        progress: function* (percentage, cpt) {
          checkpoint = cpt;
          callback({progress:percentage, name:file.name})
        },
        headers: {
           "x-oss-callback": creds.callback,
           "x-oss-callback-var": creds.callbackVar
        }
      });
      console.log('上传结果', result);
      break; // break if success
    }
  }).catch(function (err) {
    console.log(err)
  })
}

exports.downloadFile = function (client) {
  var object = document.getElementById('dl-object-key').value.trim()
  var filename = document.getElementById('dl-file-name').value.trim()
  console.log(object + ' => ' + filename)

  var result = client.signatureUrl(object, {
    response: {
      'content-disposition': 'attachment; filename="' + filename + '"'
    }
  })
  window.location = result
  return result
}
