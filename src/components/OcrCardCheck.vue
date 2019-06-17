<template>
  <div class="service-wrapper">
    <div class="img-wrapper">
      <p v-show="pFlag1">点击请上传身份证</p>
      <img :src="imgSrc" alt="">
      <input class="input-file" id="input-file1" type="file" accept="image/*" @change="idCardFront($event)" capture="camera"/>
    </div>
    <div class="title">识别结果</div> 
    <div class="display" v-show="responseFlag">
      <div class="display-desc">描述</div>
      <div class="display-out">{{ out.MESSAGE }}</div>
    </div>
    <div v-if="responseFlag">
      <template >
      <div  class="display"  v-for="(v,k) in dispalyObj" :key="k">
          <div class="display-desc">{{ v }}</div>
        <div class="display-out">{{ out.data[k] }}</div>
      </div>
    </template>
 
    </div>
  </div>
</template>

<script>
import ajax from '../common/js/ajax'
import { getCookie } from '../utils'
export default {
  data() {
    return {
      out: '',
      name: '',
      idCard: '',
      responseFlag: false,
      pFlag1: true,
      dispalyObj: {
        'type': '身份证类型',
        'name': '姓名',
        'nation': '民族',
        'sex': '性别',
        'idCard': '身份证',
        'address': '地址',
      },
      imgSrc: require('../assets/1_05.png')
    }
  },
  methods: {
    send () {
      let authCode = getCookie('authCode')
      let options = {
        serviceName: "OcrCardCheck",
        authCode: authCode,
        param:{
          image: this.imgSrc.split(',')[1]
        }
      }
      ajax(this.API.OcrCardCheck, options).then(res => {
        this.responseFlag = true
        this.out = res.resData
      })
    },
    idCardFront () {
      let _this = this
      var oFReader = new FileReader()
      var file = document.getElementById('input-file1').files[0]
      oFReader.readAsDataURL(file)
      oFReader.onloadend = function(oFRevent){
        _this.imgSrc = oFRevent.target.result
        _this.pFlag1 = false
        _this.send()
      }
    }
  }
}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.service-wrapper
  overflow hidden
  .title
    height 35px
    width 82px !important
    line-height 35px
    text-align center
    margin-left 5%
    margin-top 10px
    background url(../assets/5_07.png)
    background-position 0px 0px
    background-size 100% 100%
    color #fff
  .display
    position relative
    width 90%
    left 5%
    display flex
    margin-top 5px
    >div
      text-align left
      height 35px
      line-height 35px
      font-family '微软雅黑',
      font-size 14px
      color #606266
    .display-desc
      flex 2
    .display-out
      flex 6
      margin-left 9px
      font-size 12px 
  .img-wrapper
    position relative
    margin-top 5%
    margin-left calc(50% - 100px)
    height 200px
    width 200px
    text-align center
    line-height 100px
    &:nth-child(2)
      margin-top 10px
    p 
      color #fff
      font-size 14px
      font-family '微软雅黑'
      position relative
      z-index 101
      height 50px
      line-height 50px
      position absolute
      width 200px
    img
      display inline-block
      max-width calc(100% - 14px)
      max-height calc(100% - 14px)
      vertical-align middle
      background url(../assets/5_03.png)
      background-position 0px 0px
      background-size 100% 100%
      padding 7px
  .input-file
    opacity 0
    position absolute
    top 0
    left 0
    width 100%
    height 100%
  .send
    position absolute
    background url(../assets/login.png)
    width 75%
    left 12.5%
    text-align center
    height 40px
    line-height 40px
    color #0cebff
    font-size 14px
    font-family '微软雅黑'
    background-position 0px 0px
    background-size 100% 100%
    opacity 0.8
    bottom 15%
</style>
