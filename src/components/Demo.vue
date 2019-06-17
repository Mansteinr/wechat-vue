<template>
  <div class="teamplate-wrapper">
    <input type="button" value="OpenVideo" id="btnOpenVideo" />
    <input type="button" value="TakePicture" id="btnTakePicture" />
    <input type="button" value="CloseVideo" id="btnCloseVideo" />
    <br />
  <video style="width:500px;height:500px;border:1px solid #000000;" id="videoTest"></video>
  <canvas style="width:500px;height:500px;border:1px solid #000000;" id="canvasTest"></canvas>
  </div>
</template>

<script>

  import ajax from '../common/js/ajax'
  import { setCookie, getCookie } from '../utils'
  
  export default {
    data () {
      return {
        authCode: ''
      }
    },
    methods: {
      setAuthCode() {
        if (!this.authCode.length) { // 授权码 为六位随机数
          this.$weui.alert('请输入授权码')
        } else {
          ajax(this.API.authCheck, {authCode: this.authCode}).then(res => { // 验证授权码
            if (res.resCode) {
              setCookie('authCode', this.authCode)
              this.$router.push(getCookie('originUrl'))
            } else {
              this.$weui.alert(res.resMsg[0].msgText)
            }
          })
        }
      }
    },
    mounted() {
      window.onload = function () {
　　　　let btnOpenVideo = document.getElementById('btnOpenVideo');
　　　　let btnTakePicture = document.getElementById('btnTakePicture');
　　　　let btnCloseVideo = document.getElementById('btnCloseVideo');
　　　　let video = document.getElementById('videoTest');
　　　　let canvas = document.getElementById('canvasTest').getContext('2d');
　　　　btnOpenVideo.onclick = function () {
　　　　　　window.navigator.getUserMedia({
　　　　　　　　video: true/*视频/摄像头*/
　　　　　　　　/*audio:true*//*音频/麦克风*/
　　　　　　}, function (param) {
　　　　　　　　video.src = window.URL.createObjectURL(param);/*设置video控件路径,实时显示摄像头的图像*/
　　　　　　　　btnCloseVideo.onclick = function () {/*关闭摄像头*/
　　　　　　　　　　if (param.getTracks())/*Chrome*/
　　　　　　　　　　　　param.getTracks()[0].stop();
　　　　　　　　　　else
　　　　　　　　　　　　param.stop();
　　　　　　　　};
　　　　　　　　btnTakePicture.onclick = function () {/*拍照*/
　　　　　　　　　　canvas.drawImage(document.getElementById('videoTest'), 0, 0, 500, 500);/*将拍摄的照片画到canvas中*/
　　　　　　　　};
　　　　　　}, function (err) {
　　　　　　　　alert(err);
　　　　　　});
　　　　};
　　  }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .login-btn
    background url(../assets/login.png)
    position absolute
    width 75%
    bottom 30%
    height 45px
    text-align center
    left 12.5%
    background-position 0px 0px
    background-size 100% 100%
    line-height 45px
    color #0cebff
    font-size 14px
    font-family '微软雅黑'
  .auoth-title
    position absolute
    width 75%
    top 20%
    left 12.5%
    text-align center
    height 40px
    line-height 40px
    color #0cebff
    font-size 14px
    font-family '微软雅黑'
    background url(../assets/title.png)
    background-position 0px 0px
    background-size 100% 100%
  .auoth-code
    position absolute
    width 75%
    top 40%
    left 12.5%
    text-align center
    label,input
      display block
      width calc(100% - 20px)
      text-align left 
      border 1px solid #0cebff
      background-color rgba(23, 69, 103, .3)
      padding 0px 10px
      color #0cebff
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
