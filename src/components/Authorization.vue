<template>
  <div class="teamplate-wrapper">
    <div class="icon-img">
      <img :src="require('../assets/logo_01.png')" alt="">
    </div>
    <div class="auoth-title">
      接口体验
    </div>
    <div class="auoth-code">
      <label for="">授权码</label>
      <input type="text" v-model="authCode">
    </div>
    <div class="login-btn" @click="setAuthCode">
      授权
    </div>
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
    }
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
