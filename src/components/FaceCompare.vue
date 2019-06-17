<template>
  <div class="service-wrapper">
    <div class="img-wrapper">
      <p v-show="pFlag1">点击请上传图片</p>
      <div class="icon"></div>
      <img :src="imgSrc1" alt="">
      <input class="input-file" id="input-file1" type="file" accept="image/*" @change="idCardFront($event)" capture="camera"/>
    </div>
    <div class="img-wrapper">
      <p v-show="pFlag2">点击请上传图片</p>
      <div class="icon"></div>
      <img :src="imgSrc2" alt="">
      <input class="input-file" id="input-file2" type="file" accept="image/*"  @change="idCardReverse($event)" capture="camera"/>
    </div>
    <div class="display-wrapper">
      <div class="display" v-show="responseFlag">
        <div class="display-desc">描述</div>
        <div class="display-out">{{ out.MESSAGE === '1' ? '对比成功' : '对比失败' }}</div>
      </div>
      <div class="display" v-show="responseFlag">
        <div class="display-desc">相似度</div>
        <div class="display-out">{{ out.SCORE }}</div>
      </div>
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
      imgSrc2: require('../assets/1_05.png'),
      imgSrc1: require('../assets/1_05.png')
    }
  },
  methods: {
    send () {
      let authCode = getCookie('authCode')
      let options = {
        serviceName: "FaceCompare",
        authCode: authCode,
        param:{
          image1: this.imgSrc1.split(',')[1],
          image2: this.imgSrc2.split(',')[1]
        }
      }
      ajax(this.API.FaceCompare, options).then(res => {
        this.responseFlag = true
        this.out = res.resData
      })
    },
    idCardFront () {
      let _this = this
      var oFReader = new FileReader()
      var file = document.getElementById('input-file1').files[0]
      oFReader.readAsDataURL(file);
      oFReader.onloadend = function(oFRevent){
        _this.imgSrc1 = oFRevent.target.result
        _this.pFlag1 = false
      }
    },
    idCardReverse () {
      let _this = this
      var oFReader = new FileReader()
      var file = document.getElementById('input-file2').files[0]
      oFReader.readAsDataURL(file);
      oFReader.onloadend = function(oFRevent){
        _this.imgSrc2 = oFRevent.target.result
        _this.pFlag2 = false
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
    top 5%
    margin-left calc(50% - 80px)
    height 160px
    width 160px
    text-align center
    line-height 100px
    &:nth-child(2)
      margin-top 10px
    .icon
      background url(../assets/add_01.png)
    p 
      color #fff
      font-size 14px
      font-family '微软雅黑'
      position relative
      z-index 101
      height 50px
      line-height 50px
      position absolute
      width 100%
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
