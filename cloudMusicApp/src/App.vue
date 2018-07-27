<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
            <!-- 这里是会被缓存的视图组件 -->
       </router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive">
        <!-- 这里是不被缓存的视图组件 -->
    </router-view>
    <play @getCurTime="getCurTimes" :class="{'hidde_play':true,'show_play':showPlay}" ref="play"></play>
    <div class="play_bottom" v-if="showPlayBottom">
      <div class="pb_progress" :style="{width:bgWidth}"></div>
      <div class="play_bottom_content" @click="showPlayDisplay">
        <div class="left_content">
          <img :src="play.singerImg" alt="">
          <span class="song_infomation">
            <span class="name">{{play.name}}</span>
            <span class="lyric">{{lyric}}</span>
          </span>
        </div>
        <div class="right_content">
          <span @click.stop="playSong"><i class="iconfont icon_size_play" :class="{'icon-bofang3': isplaying, 'icon-zanting': !isplaying}"></i></span>
          <span><i class="iconfont icon-zhankaicaidan icon_size_play" @click.stop="isshowplaylist(true)"></i></span>
        </div>
      </div>
    </div>
    <play-list></play-list>
  </div>
</template>

<script>
import play from './components/play'
import playList from './components/playList'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      currentTime: 0,
      lyric: '',
      bgWidth: ''
    }
  },
  computed: {
    ...mapGetters([
      'showPlay', 'play', 'lrcData', 'showPlayBottom', 'duration', 'isplaying'
    ])
  },
  created () {
    console.log(this.showPlayBottom)
  },
  components: { play, playList },
  watch: {
    // 监听时间变化，获取对应的歌词
    currentTime (val) {
      this.lrcData.forEach(item => {
        if (item.minutes === val) {
          this.lyric = item.lrc
        }
      })
      this.bgWidth = ((val / Math.round(this.duration)) * 100).toFixed(1) + '%'
    }
  },
  methods: {
    ...mapMutations({
      playing: 'playing',
      isshowplaylist: 'isshowplaylist'
    }),
    // 获取播放时间
    getCurTimes (value) {
      this.currentTime = Math.round(value)
    },
    // 显示播放界面
    showPlayDisplay () {
      this.$store.commit('isshowplay', true)
    },
    // 播放 调用子组件play的playSong方法，从而可以保持一致
    playSong () {
      this.$refs.play.playSong()
    }
  }
}
</script>

<style lang='scss'>
@import './styles/index.scss';
#app{
  height: 100%;
}
.hidde_play{
  transform:translate3d(0,100%,0);
  -webkit-transform:translate3d(0,100%,0);
  transition:all .4s ease-out;
}
.show_play{
  transform:translate3d(0,0,0);
  -webkit-transform:translate3d(0,0,0);
}
.play_bottom{
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  height: 2.5rem;
  background: #fbfbfb;
  z-index: 10;
  .pb_progress{
    position: absolute;
    left: 0;
    bottom:0;
    height:3px;
    background: #f56767;
  }
  .play_bottom_content{
    display: flex;
    width: 100%;
    height: 100%;
    padding: .2rem;
    justify-content:space-between;
    .left_content{
      overflow: hidden;
      max-width: 12rem;
      height: 100%;
      display: flex;
      img{
        height: 2rem;
        margin-left: .2rem;
      }
      .song_infomation{
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: flex-start;
        margin-left: .3rem;
        .name{
          color: #343434;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .lyric{
          color: #7d7c7c;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 12px;
          margin-top: 0.13333rem;
        }
      }
    }
    .right_content{
      width: 4rem;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .icon_size_play{
        font-size: 1.5rem;
        color: #7d7c7c;
      }
    }
  }
}
</style>
