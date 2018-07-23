<template>
  <div class="page ba_pic">
    <div class="login_log">
      <span>
        <i class="iconfont icon-wangyiyunyinlezizhi-copy icon_size"></i>
      </span>
    </div>
    <div class="phone_login" @click="$router.push({path: '/login'})">
      <span>手机登录</span>
    </div>
    <div class="phone_login">
      <span>注册</span>
    </div>
    <!-- <transition name="login"> -->
        <router-view></router-view>
    <!-- </transition> -->
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import 'src/styles/mixin.scss';
.ba_pic{
  background: url(../../assets/bg.png) no-repeat 100% 100%;
  .login_log{
    text-align: center;
    height: 4rem;
    width: 100%;
    margin-top: 6rem;
    // background: url(../../assets/login_logo.png) no-repeat 100% 100%;
    span{
      height: 4rem;
      width: 4rem;
      display: inline-block;
      background-color: $theme;
      line-height: 4rem;
      border-radius: 0.4rem;
      .icon_size{
        color: #ffffff;
        font-size: 3rem;
      }
    }
  }
  .phone_login{
    height: 2rem;
    width: 100%;
    text-align: center;
    margin-top: 2rem;
    span{
      display: inline-block;
      width: 70%;
      height: 2rem;
      border: 1px solid $theme;
      border-radius: 1rem;
      color: $theme;
      line-height: 2rem;
      font-size: 0.8rem;
    }
  }
}
.login-enter-active, .login-leave-active {
  transition: opacity .3s
}
.login-enter, .login-leave-active {
  opacity: 0
}
</style>
