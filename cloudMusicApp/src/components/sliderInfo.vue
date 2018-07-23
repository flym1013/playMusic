<template>
  <div class="slider_page">
    <div class="slider_top slider_bachground" v-if="userInfo.length">
      <div class="top_box">
        <p>登录网易云音乐</p>
        <p>320k高音乐无限下载，多端同步</p>
        <div class="top_login">
          <span type="default" @click="$router.push({path: '/selectLogin'})">立即登录</span>
        </div>
      </div>
    </div>
    <div class="slider_top" :style="`background: url(${bgImg}) no-repeat;`" v-else>
      <div class="top_box">
        <p>网易云音乐</p>
        <p>320k高音乐无限下载，多端同步</p>
        <div class="top_login">
          <span type="default" @click="$router.push()">{{userInfo.nickname}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getStore} from '@/utils/storage.js'
export default {
  data () {
    return {
      userInfo: [],
      bgImg: ''
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.userInfo = JSON.parse(getStore('loginInfo')) ? JSON.parse(getStore('loginInfo')) : []
      this.bgImg = this.userInfo.headBackground
      console.log(this.userInfo)
    }
  }
}
</script>

<style lang="scss" scoped>
.slider_page{
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  background-color: #f3f3f3;
}
.slider_top{
  height: 8rem;
  width: 100%;
  .top_box{
    height: 100%;
    width: 100%;
    padding: 1rem;
    color: #ffffff;
    p{
      text-align: center;
      padding: 0.2rem 0;
    }
    .top_login{
      // width: 4rem;
      height: 2rem;
      text-align: center;
      margin-top: 1rem;
      span{
        display: inline-block;
        width: 6rem;
        height: 2rem;
        border: 1px solid #ffffff;
        border-radius: 1rem;
        line-height: 2rem;
      }
    }
  }
}
.slider_bachground{
  background: url(../assets/menu-left-bg.jpg) no-repeat 100% 100%;
}
</style>
