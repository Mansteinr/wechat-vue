<template>
  <div class="service-wrapper">
    <div class="img-wrapper">
      <img :src="imgSrc" alt="">
    </div>
    <div class="display" v-show="responseFlag">
      <div class="display-desc">描述</div>
      <div class="display-out">{{ out }}</div>
    </div>
    <div class="btn">
      <input id="input-file" type="file" accept="image/*" capture="camera"/>
      拍照图片
    </div>
    <!-- <div class="send" @click="send">
      对比
    </div> -->
  </div>
</template>

<script>
import ajax from '../common/js/ajax'
import { getCookie } from '../utils'
export default {
  data() {
    return {
      imgSrc: require('../assets/1_08.png'),
      out: '',
      responseFlag: false
    }
  },
  methods: {
    send () {
      let authCode = getCookie('authCode')
      let options = {
        "serviceName":"LiveBodyV2Customer",
        "authCode": authCode,
        "param":{
          "image": this.imgSrc.split(',')[1]
        }
      }
      ajax(this.API.LiveBodyV2Customer,options).then(res => {
        this.responseFlag = true
        this.out = res.resData.MESSAGE
      })
    }
  },
  mounted() {
    let _this = this
    document.addEventListener('change', function() {
      var oFReader = new FileReader()
      var file = document.getElementById('input-file').files[0]
      oFReader.readAsDataURL(file);
      oFReader.onloadend = function(oFRevent){
        _this.imgSrc = oFRevent.target.result
        _this.send() // 发送请求
      }
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.service-wrapper
  overflow hidden
  .display
    position relative
    width 75%
    left 12.5%
    background 12.5%
    margin-top 30px
    display flex
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
    margin-top 25%
    margin-left calc(50% - 100px)
    height 200px
    width 200px
    text-align center
    line-height 100px
    img
      display inline-block
      max-width calc(100% - 14px)
      max-height calc(100% - 14px)
      vertical-align middle
      background url(../assets/5_03.png)
      background-position 0px 0px
      background-size 100% 100%
      padding 7px
  #input-file
    opacity 0
    position absolute
    top 0
    left 0
    width 100%
    height 100%
  .btn, .send
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
  .btn
    top 60%
  .send
    top calc(60% + 50px)
</style>
