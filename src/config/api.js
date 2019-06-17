
/*默认使用协议*/
const protocol = 'http'
const baseConfig = {
  protocols: {
    http: 'http://',
    https: 'https://'
  },
  /*生产环境*/
  prod: {
    api: '114.55.36.16:9997/'
  },
  /*开发环境*/
  dev: {
    api: '172.16.5.7:9099/'
  },
  /*测试环境*/
  test: {
    api: '114.55.36.16:9997/'
  }
}
/*设置api转换*/
// let apiFormat = (api = '', hostkey = 'base', pt = protocol) => baseConfig.protocols[pt] + baseConfig[process.env.NODE_ENV][hostkey] + api
let apiFormat = (api = '', hostkey = 'base', pt = protocol) => baseConfig.protocols[pt] + baseConfig.dev[hostkey] + api
const api = {
  authCheck: apiFormat('wechatService/authCheck', 'api'),
  LiveBodyV2Customer: apiFormat('wechatService/demo/LiveBodyV2Customer', 'api'),
  IdNamePhotoCheck: apiFormat('wechatService/demo/IdNamePhotoCheck', 'api'),
  OcrCardCheck: apiFormat('wechatService/demo/OcrCardCheck', 'api'),
  FaceCompare: apiFormat('wechatService/demo/FaceCompare', 'api')
}
export default api
