<template>
  <transition name="slide-in">
    <div class="play_page">
      <div class="play_cover">
        <img :src="play.singerImg" alt="" class="blur">
      </div>
      <div class="header">
        <span @click="hiddenPlay" class="header_back"><i class="iconfont icon-iconfontyoujiantou icon_size"></i></span>
        <div class="song">
          <span class="name">{{play.name}}</span>
          <span class="singer">{{play.singer}}</span>
        </div>
        <span class="fenxiang"><i class="iconfont icon-fenxiang1 icon_size"></i></span>
      </div>
      <audio :src="playSongUrl" ref="radio" :autoplay="isautoplay" :loop="loop"
        @play= "audioPlay"
        @pause= "audioPause"
        @canplay="audioCanplay"
      ></audio>
      <div class="play_design" v-show="!showDseign" @click="showDseign = !showDseign">
        <div class="play_bar">
          <img src="../assets/play-bar-s.png" alt="" class="play-bar-s">
          <img src="../assets/play-bar.png" alt="" class="play-bar" :class="{'play_bar_rotate': isplaying}">
        </div>
        <div class="play_img">
          <div class="img_rotate" :class="{'img_rotate_control': !isplaying}">
           <div class="rotate-img-center">
              <img :src="play.singerImg" alt="" >
           </div>
          </div>
        </div>
        <div class="play_link">
          <span><i class="iconfont icon-xiangqu icon_size"></i></span>
          <span><i class="iconfont icon-weikaifang icon_size"></i></span>
          <span><i class="iconfont icon-buoumaotubiao48 icon_size"></i></span>
          <span><i class="iconfont icon-gengduo icon_size"></i></span>
        </div>
      </div>
      <div class="play_design play_vol_control" v-show="showDseign" @click="showDseign = !showDseign">
         <div class="vol_control">
            <span class="vol_icon">
              <i class="iconfont icon-yinyue"></i>
            </span>
            <div class="control_bar" ref="volControl">
              <div class="control_bar_bg" :style="{width:vol.voldisX+'px'}"></div>
              <div class="hide_vol_click" @touchstart="changeVol"></div>
              <span class="vol_control_dot" :style="{transform:'translateX('+vol.voldisX+'px)'}"></span>
              <span class="vol_control_dots"
                @touchstart="VolStart"
                @touchmove="VolMove"
                @touchend="VolEnd"
                :style="{transform:'translateX('+vol.voldisX+'px)'}"
                >
              </span>
            </div>
         </div>
         <div class="play_lyric" ref="lyricBox" >
           <div class="play_lyric_box" v-if="lrcData.length" :style="{transform:'translateY('+ -lyricDis + 'px)'}">
             <p v-for="(item,index) in lrcData" :key="index" :class="{'play_lyric_text': true, 'play_lyric_active': index == activeIndex}">{{ item.lrc }}</p>
           </div>
           <div v-else class="no_lyric">
             暂无歌词
           </div>
         </div>
      </div>
      <div class="play_footer">
        <div class="play_progress">
          <span class="current_time">{{transformTime(currentTime)}}</span>
          <div class="current_progress" ref="myslider">
            <div class="slider_box">
              <div class="slider_bar" id="slider"   ref="slider">
                <div class="hide_click" @touchstart="jump"></div>
                <div class="slider_bg" :style="{width: disX + 'px'}"></div>
                <div class="load_progress"></div>
                <span class="slider_dot" ref="dots"
                    @touchstart="sliderStart"
                    @touchmove="sliderMove"
                    @touchend="sliderEnd"
                    :style="{transform:'translate3d('+disX+'px,0,0)'}"
                    >
                </span>
              </div>
            </div>
          </div>
          <span class="duration">{{transformTime(duration)}}</span>
        </div>
        <div class="play_control">
          <div class="play_type">
            <i class="iconfont icon-danquxunhuan icon_size"></i>
          </div>
          <div class="play_contorl_box">
            <span class="play_upwarp"><i class="iconfont icon-shangyiqu101 icon_size"></i></span>
            <span class="play_start" @click="playSong">
              <i class="iconfont icon_size_play" :class="{'icon-bofang3': isplaying, 'icon-zanting': !isplaying}"></i>
            </span>
            <span class="play_next"><i class="iconfont icon-xiayiqu101 icon_size"></i></span>
          </div>
          <div class="play_list">
            <i class="iconfont icon-zhankaicaidan icon_size"></i>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  getPlayUrl, // 获取音乐 url
  getPlayLyric // 获取歌词
} from '../service/getDate.js'
import {notify} from '@/utils/index.js'
export default {
  data () {
    return {
      playSongUrl: '', // 歌曲播放url
      currentTime: 0, // 歌曲播放当前时间
      timer: null, // 播放定时器
      duration: 0, // 歌曲播放时间长
      startX: 0, // 滑动条box的offsetLeft
      boxW: 0, // 滑动条box的offsetWidth
      sliderstart: false, // 开始touch
      disX: 0, // 当前位移,滑块位移和背景长度
      showDseign: false, // 歌词或播放动画显示
      // 音量slider状态
      vol: {
        volStart: false,
        voldisX: 0,
        volLeft: 0,
        volboxW: 0,
        currentVol: 0
      },
      // 歌词
      activeIndex: -1, // 歌词的当前索引
      lyricDis: 0
    }
  },
  async created () {
    this.getSongsData() // 获取歌曲播放信息
  },
  computed: {
    ...mapGetters([
      'showPlay', 'play', 'isplaying', 'loop', 'lrcData'
    ]),
    // 通过计算属性获取播放歌曲的id
    currentPlayId () {
      return this.play.id
    }
  },
  watch: {
    // 监听当前歌曲播放id的变化，重新获取歌词信息
    currentPlayId (val) {
      this.getSongsData(val)
    }
  },
  methods: {
    // 隐藏播放界面
    hiddenPlay () {
      this.$store.commit('isshowplay', false)
    },
    // 播放界面播放歌曲按钮
    playSong () {
      // console.log(111)
      this.boxW = this.$refs.myslider.offsetWidth
      if (this.isplaying) {
        setTimeout(() => {
          this.$store.commit('playing', false)
          this.$refs.radio.play() // 播放
          clearInterval(this.timer)
          this.timer = null
        }, 500)
      } else {
        this.$store.commit('playing', true)
        this.$refs.radio.pause() // 暂停
      }
      // console.log(this.isplaying)
    },
    // 获取更新播放信息
    getSongsData () {
      // 获取音乐 url
      const getPlayUrl1 = async () => {
        let res = await getPlayUrl({
          id: this.play.id
        })
        if (res.data.code === 200 && res.data.data[0].url) {
          this.playSongUrl = res.data.data[0].url || `'http://music.163.com/song/media/outer/url?id=${this.play.id}.mp3 '`
        } else {
          this.playSongUrl = ''
          this.$store.commit('playing', false)
          notify(0, 'sorry,因为版权原因无法播放~')
        }
      }
      // 获取歌词
      const getPlayLyric1 = async () => {
        this.$store.commit('updatelrcData', [])
        let res = await getPlayLyric({
          id: this.play.id
        })
        if (res.data.code === 200) {
          let list = res.data.lrc.lyric.split('\n').join('')
          let a = list.split('[')
          // console.log(a)
          let tempLrcData = []
          a.forEach((v, i) => {
            let arr = v.split(']')
            // console.log(arr[1])
            if (arr[1] !== undefined) {
              if (arr[1].trim() !== '') {
                // 过滤为空的歌词
                let T = arr[0].match(/(.+)?:(.+)?\.(.+)?/)
                let minutes = Math.round((+T[1] * 60) + (+T[2]) + (+T[3] / 1000))
                tempLrcData.push({
                  minutes,
                  lrc: arr[1]
                })
                this.$store.commit('updatelrcData', tempLrcData)
              }
            }
          })
          // console.log(tempLrcData)
        }
      }
      getPlayUrl1() // 获取音乐 url
      getPlayLyric1() // 获取歌词
    },
    // 时间转换
    transformTime (timerValue) {
      let minutes = Math.floor(timerValue / 60)
      minutes = minutes < 0 ? '0' + minutes : minutes
      let seconds = Math.round(timerValue % 60)
      seconds = seconds < 10 ? '0' + seconds : seconds
      return minutes + ':' + seconds
    },
    // 媒体播放
    // 自动播放函数
    audioPlay () {
      clearInterval(this.timer)
      this.boxW = this.$refs.myslider.offsetWidth
      this.timer = null
      this.timer = setInterval(() => {
        this.currentTime = this.$refs.radio.currentTime
        this.$emit('getCurTime', this.currentTime)
        // console.log(this.$refs.radio.currentTime)
        this.disX = Math.round(this.currentTime / this.duration * this.boxW)
        // 歌词播放计算位移
        this.calTranslate(this.currentTime)
      }, 1000)
      this.duration = this.$refs.radio.duration
      this.$store.commit('updateduration', this.duration)
    },
    audioPause () {
      clearInterval(this.timer)
    },
    audioCanplay () {},
    isautoplay () {
      return this.isplaying
    },
    // 播放进度条
    jump (e) {
      // console.log(e)
      this.disX = e.touches[0].pageX - this.$refs.slider.offsetLeft
      this.boxW = e.touches[0].target.parentElement.offsetWidth
      this.currentTime = Math.ceil(this.disX / this.boxW * this.duration)
      this.$refs.radio.currentTime = this.currentTime
      this.$emit('getCurTime', this.currentTime)
      // 歌词播放计算位移
      this.calTranslate(this.currentTime)
    },
    sliderStart (e) {
      clearInterval(this.timer) // touch时停止自动播放
      // 如果duration还没获取到，禁止拖动
      if (!this.duration) return
      this.sliderstart = true
      this.boxW = e.touches[0].target.parentElement.offsetWidth
      this.startX = e.touches[0].target.parentElement.offsetLeft
    },
    sliderMove (e) {
      if (this.sliderstart) {
        // let el = e.touches[0].target
        this.disX = e.touches[0].pageX - this.startX
        if (this.disX < 0) {
          this.disX = 0
        } else if (this.disX > this.boxW) {
          this.disX = this.boxW
        }
        // 修改currentTime
        this.currentTime = Math.ceil(this.disX / this.boxW * this.duration)
      }
    },
    sliderEnd () {
      this.sliderstart = false
      this.$refs.radio.currentTime = this.currentTime
      this.playSong()
      // if (this.isplaying) {
      //   this.$refs.radio.play()
      // } else {
      //   this.$refs.radio.pause()
      // }
      this.$emit('getCurTime', this.currentTime)
      // 歌词播放计算位移
      this.calTranslate(this.currentTime)
    },
    // 音量slider
    changeVol (e) {
      this.vol.voldisX = e.changedTouches[0].clientX - e.changedTouches[0].target.parentElement.offsetLeft
      this.vol.volboxW = e.changedTouches[0].target.parentElement.offsetWidth
      this.vol.currentVol = this.vol.voldisX / this.vol.volboxW
      this.$refs.radio.volume = this.vol.currentVol
    },
    VolStart (e) {
      this.vol.volStart = true
      this.vol.volLeft = e.touches[0].target.parentElement.offsetLeft
      this.vol.volboxW = e.touches[0].target.parentElement.offsetWidth
    },
    VolMove (e) {
      if (this.vol.volStart) {
        this.vol.voldisX = e.touches[0].clientX - this.vol.volLeft
        if (this.vol.voldisX < 0) {
          this.vol.voldisX = 0
        } else if (this.vol.voldisX > this.vol.volboxW) {
          this.vol.voldisX = this.vol.volboxW
        }
      }
    },
    VolEnd () {
      this.vol.currentVol = this.vol.voldisX / this.vol.volboxW
      this.$refs.radio.volume = this.vol.currentVol
    },
    // 根据currentTime计算位移
    calTranslate (curTime) {
      this.lrcData.forEach((item, i) => {
        if (Math.round(curTime) === item.minutes) {
          let boxH = this.$refs.lyricBox.offsetHeight * 0.38
          let dis = this.$refs.lyricBox.children[0].children[i].offsetTop
          // animation(this.$refs.lyricBox, dis - boxH, 500)
          this.lyricDis = dis - boxH
          this.activeIndex = i
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.blur {
  filter: blur(10px);
}
.play_page{
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  // color: #ffffff;
  z-index: 9999;
  overflow: hidden;
  .play_cover{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 99;
    background-color: #000;
    img{
      width: 100%;
      height: 100%;
      z-index: 100;
      transform: scale(3)
    }
  }
}
.header{
  height: 2.5rem;
  width: 100%;
  position: fixed;
  z-index: 105;
  display: flex;
  .header_back{
    width: 12%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    .icon_size{
      font-size: 1rem;
    }
  }
  .song{
    width: 75%;
    height: 100%;
    overflow: hidden;
    color: #ffffff;
    position: relative;
    left: .5rem;
    .name{
      position: absolute;
      left: 0;
      top: 0.3rem;
      display: block;
      font-size: .9rem;
      white-space: nowrap;
    }
    .singer{
      position: absolute;
      left: 0;
      top: 1.5rem;
      width: 100%;
      display: block;
      color: rgba(255, 255, 255, 0.7);
      font-size: .7rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .fenxiang{
    height: 100%;
    width: 13%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    .icon_size{
      font-size: 1rem;
    }
  }
}
.play_bar_rotate{
  transform: rotate(-25deg);
  transform-origin:20% 10.81%;
}
.play_design{
  position: fixed;
  margin-top: 2.5rem;
  height: 24rem;
  width: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 105;
  overflow-x: hidden;
  overflow-y: auto;
  .play_bar{
    height: 3rem;
    width: 100%;
    position: relative;
    .play-bar-s{
      position: absolute;
      width: 1.5rem;
      left: 50%;
      margin-top: -.7rem;
      transform: translateX(-50%);
      z-index: 777;
    }
    .play-bar{
      position: absolute;
      width: 5rem;
      left: 8rem;
      z-index: 666;
      transition: all 1s;
    }
  }
  .play_img{
    margin: 0 auto;
    height: 16rem;
    width: 16rem;
    display: flex;
    .img_rotate{
      margin: auto;
      width: 15rem;
      height: 15rem;
      display: flex;
      background: url('../assets/play_bg.png') no-repeat;
      background-size: 15rem 15rem;
      animation-fill-mode: forwards;
      animation:CDturn 18s linear infinite;
      animation-play-state:paused;
      .rotate-img-center{
        margin:auto;
        img{
          width: 10.2rem;
          height: 10.2rem;
          border-radius: 50%;
        }
      }
    }
    .img_rotate_control{
      animation-play-state:running;
    }
    @keyframes CDturn{
      from{transform:rotate(0deg)}
      to{transform:rotate(360deg)}
    }
  }
  .play_link{
    margin-top: 3rem;
    height: 2rem;
    width: 100%;
    display: flex;
    justify-content: center;
    span{
      width: 15%;
      height: 100%;
      line-height: 2rem;
      margin-left: 1rem;
      .icon_size{
        font-size: 1.2rem;
        font-weight: bold;
        color: rgba(255, 255, 255, 0.7);
      }
    }
  }
}
.play_vol_control{
  .vol_control{
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 .8rem;
    .vol_icon{
      margin-right: .5rem;
      width: 10%;
      i{
        font-size:.8rem;
        color: rgba(255,255,255,.6);
      }
    }
    .control_bar{
      height: 5px;
      width: 90%;
      background: rgba(255,255,255,.3);
      position: relative;
      border-radius: 6px;
      .control_bar_bg{
        width:100%;
        height:100%;
        background: rgba(255,255,255,.7);
        position: absolute;
        left:0;
        top:0;
        border-radius: 6px;
        z-index: 111;
      }
      .hide_vol_click{
        position: absolute;
        width:100%;
        height:1rem;
        background: rgba(0,0,0,.7);
        left:0;
        top:0;
        transform: translateY(-50%);
        z-index: 333;
        opacity: 0;
      }
      .vol_control_dot{
        width:.8rem;
        height:.8rem;
        background:white;
        border-radius:50%;
        position:absolute;
        left:-.4rem;
        top: 50%;
        margin-top: -.4rem;
        transition:width .5s ease;
      }
      .vol_control_dots{
        width:1rem;
        height:1rem;
        background:red;
        border-radius:50%;
        position:absolute;
        left:-.5rem;
        top: 50%;
        margin-top: -.5rem;
        opacity: 0;
        border-radius: 50%;
        z-index: 555;
      }
    }
  }
  .play_lyric{
    width: 100%;
    top: 1.5rem;
    height: 22.5rem;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: auto;
    .play_lyric_box{
      transition: all 1s ease;
      padding: 1rem 0;
      .play_lyric_text{
        padding: .5rem;
        line-height: .8rem;
        max-width: 80%;
        margin: 0 auto;
        color:rgba(255,255,255,.6);
        transition: all 1s ease;
        text-align: center;
      }
      .play_lyric_active{
        color:rgba(255,255,255,1);
        transform: scale(1.15);
      }
    }
    .no_lyric{
      width: 100%;
      text-align: center;
      margin-top: 3rem;
      color: #ffffff;
    }
  }
}
.play_footer{
  margin-top: 26.5rem;
  position: fixed;
  height: 6.8rem;
  width: 100%;
  z-index: 105;
  padding: 0 .5rem;
  .play_progress{
    height: 2.3rem;
    width: 100%;
    display: flex;
    // align-items: center;
    line-height: 2.3rem;
    .current_time{
      width: 10%;
      height: 100%;
      color: #ffffff;
    }
    .current_progress{
      width: 80%;
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 .2rem;
      .slider_box{
        width: 100%;
        margin: 0 .2rem;
        height: 5px;
        .slider_bar{
            border-radius: 6px;
            position: relative;
            width: 100%;
            height: 100%;
            background: rgba(255,255,255,.5);
              .hide_click{
                width:100%;
                height: 1rem;
                position: absolute;
                left:0;
                top:50%;
                margin-top:-.5rem;
                background: rgba(0,0,0,.5);
                opacity:0;
                z-index: 55;
              }
              .slider_bg{
                width: 0;
                height: 100%;
                background: #57bcc1;;
                border-radius: 6px;
                position: absolute;
                left: 0;
                top: 0;
                z-index: 11;
              }
              .load_progress{
                width: 0;
                height: 100%;
                position: relative;
                background: gray;
                border-radius: 6px;
                position: absolute;
                left: 0;
                top: 0;
                z-index: 5;
              }
              .slider_dot{
                position: absolute;
                width: .8rem;
                height: .8rem;
                border-radius: 50%;
                background: white;
                left: 0;
                top: 50%;
                margin-left: -.4rem;
                margin-top: -.4rem;
                z-index: 55;
              }
          }
      }
    }
    .duration{
      width: 10%;
      height: 100%;
      color: #ffffff;
    }
  }
  .play_control{
    height: 4.5rem;
    width: 100%;
    display: flex;
    padding-left: 1.5rem;
    color: rgba(255, 255, 255, 0.7);
    .play_type{
      width: 20%;
      height: 100%;
      display: flex;
      align-items: center;
      .icon_size{
        font-size: 1.5rem;
      }
    }
    .play_contorl_box{
      width: 60%;
      height: 100%;
      display: flex;
      align-items: center;
      .play_upwarp{
        width: 30%;
      }
      .play_start{
        width: 40%;
      }
      .play_next{
        width: 30%;
      }
      .icon_size{
        font-size: 1.5rem;
      }
      .icon_size_play{
        font-size: 2rem;
        color: #ffffff;
      }
    }
    .play_list{
      width: 20%;
      height: 100%;
      display: flex;
      align-items: center;
      .icon_size{
        font-size: 1.5rem;
      }
    }
  }
}
</style>
<style lang="scss">
</style>
