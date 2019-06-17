<template>
  <div class="service-wrapper">
    <div class="img-wrapper">
      <p v-show="pFlag">点击请上传身份证正面</p>
      <img :src="imgSrc" alt="" ref='img'>
      <input id="input-file" type="file" accept="image/*" capture="camera"/>
    </div>
    <div class="auoth-code">
      <input type="text" v-model="name" placeholder="姓名">
    </div>
     <div class="auoth-code">
      <input type="text" v-model="idCard" placeholder="身份证">
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
      pFlag: true,
      responseFlag: false,
      imgSrc: require('../assets/1_05.png')
    }
  },
  methods: {
    send () {
      let authCode = getCookie('authCode')
      let options = {
        serviceName: "IdNamePhotoCheck",
        authCode: authCode,
        param:{
          name: this.name,
          idCard: this.idCard,
          image: this.imgSrc.split(',')[1]
        }
      }
      ajax(this.API.IdNamePhotoCheck, options).then(res => {
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
        _this.pFlag = false
      }
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.service-wrapper
  overflow hidden
  .auoth-code
    &:nth-child(1) 
      margin-top: 60px;
  .display
    position relative
    width 75%
    left 12.5%
    background 12.5%
    display flex
    margin-top 30px
    >div
      text-align center
      height 2.1875rem
      line-height 2.1875rem
      font-family '微软雅黑',
      font-size 0.875rem
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
    margin-top 8%
    margin-left calc(50% - 100px)
    height 200px
    width 200px
    text-align center
    line-height 100px
    p 
      color #fff
      font-size 14px
      font-family '微软雅黑'
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
      position relative
  #input-file
    opacity 0
    position absolute
    top 0
    left 0
    width 100%
    height 100%
  .send
    position relative
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
    margin-top 30px
.auoth-code
  position relative
  width 75%
  // top 40%
  margin-top 30px
  left 12.5%
  text-align center
  label,input
    display block
    width calc(100% - 20px)
    text-align left 
    border 1px solid #C0C4CC
    // background-color rgba(23, 69, 103, .3)
    padding 0px 10px
    // color #0cebff
    color black
    font-size 14px
    font-family '微软雅黑'
  label
    font-size 13px
    height 24px
    line-height 24px
  input 
    height 35px
    &:focus 
      outline none
</style>
