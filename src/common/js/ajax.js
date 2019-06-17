import axios from 'axios'
import weui from 'weui.js'
import 'weui'
let loading = null
export default function ajax (url, data, method = 'post') {
  let opt = {
    url,
    responseType: 'json',
    method,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }
  loading = weui.loading('', {
    className: 'custom-classname'
  })
  // if (data.)
  if (opt.method === 'post') {
    opt = Object.assign(opt, {data: data})
  } else {
    opt = Object.assign(opt, {params: data})
  }
  return new Promise((resolve, reject) => {
    axios(opt).then(res => {
      if (res.data.resCode) {
        resolve(res.data)
      } else {
        weui.alert(res.data.resMsg[0].msgText);
      }
      loading.hide(() => {
        console.log(90)
      })
    }).catch(err => { // 错误
      reject(err)
      weui.alert('未知错误')
      loading.hide(() => {
        console.log(90)
      })
    })
  })
}