<template>
  <div class="page">
    <van-nav-bar
      title="手机号登录"
      left-text="返回"
      left-arrow
      @click-left="$router.back(-1)"
    />
    <div class="page_login">
      <van-cell-group>
        <van-field
          v-model="username"
          required
          clearable
          label="用户名"
          placeholder="请输入手机号码"
        />

        <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          required
        />
      </van-cell-group>
      <div class="login_button">
        <span @click="getLoginByPhone">登录</span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getLoginByPhone // 手机登录接口
} from '../../service/getDate.js'
import {notify} from '@/utils/index.js'
import {setStore, getStore} from '@/utils/storage.js'
export default {
  data () {
    return {
      username: '',
      password: '',
      userInfo: ''
    }
  },
  // beforeRouteEnter (to, from, next) {
  //   if (getStore('loginInfo')) {
  //     next('/')
  //   } else {
  //     next()
  //   }
  //   next()
  // },
  created () {
    if (getStore('loginInfo')) {
      let info = JSON.parse(getStore('loginInfo'))
      this.myphone = info.phone
      this.mypassword = info.password
    }
  },
  methods: {
    // 手机登录
    async getLoginByPhone () {
      let res = await getLoginByPhone({
        phone: this.username,
        password: this.password
      })
      if (res.data.code === 200) {
        notify(1, '登录成功')
        setTimeout(() => {
          this.$router.push('/')
        }, 1000)
        setStore('loginInfo', {
          id: res.data.account.id,
          nickname: res.data.profile.nickname,
          phone: this.myphone,
          password: this.mypassword,
          headBackground: res.data.profile.backgroundUrl
        })
        this.$store.commit('updateloginMsg', {
          id: res.data.account.id,
          nickname: res.data.profile.nickname
        })
      } else {
        notify(0, '密码错误')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/mixin.scss';
.page_login{
  background: #f3f3f3!important;
  .login_button{
    background: #f3f3f3;
    height: 2rem;
    width: 100%;
    text-align: center;
    margin-top: 2rem;
    span{
      width: 80%;
      height: 2rem;
      line-height: 2rem;
      display: inline-block;
      border-radius: 1rem;
      background: $theme;
    }
  }
}
</style>

<style lang="scss">
@import 'src/styles/mixin.scss';
.van-nav-bar{
  background: $theme;
  color: #ffffff;
}
.van-nav-bar__text{
  color: #ffffff;
}
.van-nav-bar .van-icon{
  color: #ffffff;
}
</style>
