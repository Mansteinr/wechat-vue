<template>
  <div class="service-wrapper">
    <div class="img-wrapper">
      <div>
        <p v-show="pFlag1">点击上传人脸</p>
        <img :src="imgSrc1" alt="">
        <input class="input-file" id="input-file1" type="file" accept="image/*" @change="LiveBodyV2Customer($event)" capture="camera"/>
      </div>
      <div>
        <p v-show="pFlag1">点击上传身份证正面</p>
        <img :src="imgSrc2" alt="">
        <input class="input-file" id="input-file2" type="file" accept="image/*" @change="OcrCardCheck($event)" capture="camera"/>
      </div>
    </div>
    <div class="display" v-show="responseFlag">
      <div class="display-desc">描述</div>
      <div class="display-out">{{ out }}</div>
    </div>
    <div class="send" @click="send">
      对比
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
      pFlag2: true,
      isTrueFace: false,
      isPastOcr: false,
      imgSrc2: require('../assets/1_05.png'),
      imgSrc1: require('../assets/1_05.png')
    }
  },
  methods: {
    send () {
      if (this.name && this.idCard && this.isTrueFace && this.isPastOcr) {
        let authCode = getCookie('authCode')
        let options = {
          serviceName: "IdNamePhotoCheck",
          authCode: authCode,
          param:{
            name: this.name,
            idCard: this.idCard,
            image2: this.imgSrc2.split(',')[1]
          }
        }
        ajax(this.API.FaceCompare, options).then(res => {
          this.responseFlag = true
          this.out = res.resData.MESSAGE
        })
      }
    },
    LiveBodyV2Customer () {
      let _this = this
      var oFReader = new FileReader()
      var file = document.getElementById('input-file1').files[0]
      oFReader.readAsDataURL(file);
      oFReader.onloadend = function(oFRevent){
        _this.imgSrc1 = oFRevent.target.result
        _this.pFlag1 = false
        let authCode = getCookie('authCode')
        let options = {
          "serviceName":"LiveBodyV2Customer",
          "authCode": authCode,
          "param":{
            "image": _this.imgSrc1.split(',')[1]
          }
        }
        ajax(_this.API.LiveBodyV2Customer,options).then(res => {
          _this.isTrueFace = (res.resCode === '1' )
          _this.name = res.data.name
          _this.idCard = res.data.idCard
        })
      }
    },
    OcrCardCheck () {
      if (!isTrueFace) {
        this.$weui.alert('请上传真脸')
        return
      }
      let _this = this
      var oFReader = new FileReader()
      var file = document.getElementById('input-file2').files[0]
      oFReader.readAsDataURL(file);
      oFReader.onloadend = function(oFRevent){
        _this.imgSrc2 = oFRevent.target.result
        _this.pFlag2 = false
        let authCode = getCookie('authCode')
        let options = {
          serviceName: "OcrCardCheck",
          authCode: authCode,
          param:{
            image: _this.imgSrc2.split(',')[1]
          }
        }
        ajax(_this.API.OcrCardCheck, options).then(res => {
          _this.isPastOcr === (res.resCode === '1' )
        })
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.service-wrapper
  overflow hidden
  .display-wrapper
    .display
      position relative
      width 75%
      left 12.5%
      background 12.5%
      display flex
      margin-top 10px
      >div
        text-align center
        height 35px
        line-height 35px
        font-family '微软雅黑',
        font-size 14px
        color #fff
      .display-desc
        flex 2
        background url(../assets/5_07.png)
        background-position 0px 0px
        background-size 100% 100%
      .display-out
        flex 3
        background url(../assets/5_10.png)
        background-position 0px 0px
        background-size 100% 100%
        margin-left 9px
  .img-wrapper
    position relative
    margin-top 5%
    height 160px
    text-align center
    line-height 100px
    display flex
    justify-content space-around
    >div
      width 45%
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
      width 45%
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
    position relative
    width 75%
    height 40px
    line-height 40px
    left 12.5%
    margin-top 40px
    text-align center
    color #0cebff
    font-size 14px
    font-family '微软雅黑'
    background url(../assets/login.png)
    background-position 0px 0px
    background-size 100% 100%
    opacity 0.8
</style>
