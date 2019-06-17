import Vue from 'vue'
import Router from 'vue-router'

const Authorization = resolve => require(['../components/Authorization'], resolve) //获取授权码
const LiveBodyV2Customer = resolve => require(['../components/LiveBodyV2Customer'], resolve) //静默活体 
const IdNamePhotoCheck = resolve => require(['../components/IdNamePhotoCheck'], resolve) // 身份证照片三维对比
const OcrCardCheck = resolve => require(['../components/OcrCardCheck'], resolve) // 身份证双面
const FaceCompare = resolve => require(['../components/FaceCompare'], resolve) // 一比一人脸验证
const composite = resolve => require(['../components/composite'], resolve) // 一比一人脸验证
Vue.use(Router)

const ruoter = new Router({
  mode: 'history',
  routes: [{
    path: '/Authorization',
    label: 'Authorization',
    name: 'Authorization',
    component: Authorization
  }, {
    path: '/LiveBodyV2Customer',
    label: 'LiveBodyV2Customer',
    name: 'LiveBodyV2Customer',
    component: LiveBodyV2Customer
  }, {
    path: '/IdNamePhotoCheck',
    label: 'IdNamePhotoCheck',
    name: 'IdNamePhotoCheck',
    component: IdNamePhotoCheck
  }, {
    path: '/OcrCardCheck',
    label: 'OcrCardCheck',
    name: 'OcrCardCheck',
    component: OcrCardCheck
  }, {
    path: '/FaceCompare',
    label: 'FaceCompare',
    name: 'FaceCompare',
    component: FaceCompare
  }, {
    path: '/composite',
    label: 'composite',
    name: 'composite',
    component: composite
  }]
})

export default ruoter