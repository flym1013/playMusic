<template>
  <div class="play_list_page">
    <transition name="fade-in">
      <div class="bg_cover" v-if="showPlayList" @click="isshowplaylist(false)"></div>
    </transition>
    <transition name="slide-in">
      <div v-if="showPlayList" class="play_list">
        <div class="list_header clearfix">
          <div class="left">
            <span @click="changPlayType">
              <i class="iconfont icon_size" :class="[playType.playClass]"></i>
              <span class="icon_text">{{playType.playText}}</span>
            </span>
            <span>
              <i class="iconfont icon-xiangqu icon_size"></i>
              <span class="icon_text">收藏</span>
            </span>
          </div>
          <div class="right">
            <span @click="clearPlayList">
              <i class="iconfont icon-iconfonttubiao icon_size"></i>
              <span class="icon_text">清空</span>
            </span>
          </div>
        </div>
        <div class="song_list">
          <div class="song_item clearfix" v-for="(item, index) in playList" :key="index" @click="playSong(item)">
            <div class="left" :class="{icon_color: item.id === play.id}">
              <span><i class="iconfont icon-yinyue" style="margin-right:.3rem" v-if="item.id === play.id"></i>{{item.name}}</span>
              <i>-</i>
              <span>{{item.album.artists[0].name}}</span>
            </div>
            <div class="right">
              <span @click="delSongs(item)">
                <i class="iconfont icon-chahao"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  data () {
    return {
      playTypes: [
        {
          text: '列表循环',
          Class: 'icon-liebiaoxunhuan'
        },
        {
          text: '随机播放',
          Class: 'icon-suiji'
        },
        {
          text: '单曲循环',
          Class: 'icon-danquxunhuan'
        }
      ],
      playTypeIndex: 0
    }
  },
  created () {
    console.log(this.showPlayList)
  },
  computed: {
    ...mapGetters([
      'showPlayList', 'playList', 'play', 'playType'
    ])
  },
  methods: {
    ...mapMutations({
      isshowplaylist: 'isshowplaylist'
    }),
    // 播放音乐
    playSong (obj) {
      this.$store.commit('updateplayinfo', {id: obj.id, name: obj.name, singer: obj.artists[0].name, singerImg: obj.album.blurPicUrl})
      this.$store.commit('playing', false)
    },
    // 从播放音乐列表移除
    delSongs (obj) {
      this.playList.forEach((item, index) => {
        if (item.id === obj.id) {
          this.playList.splice(index, 1)
        }
      })
    },
    // 清空播放音乐列表
    clearPlayList () {
      this.$store.commit('updatedplaylist', [])
      this.$store.commit('isshowplaylist', false)
      this.$store.commit('playing', false)
      this.$store.commit('updateshowplaybottom', false)
    },
    // 改变音乐列表播放模式
    changPlayType () {
      this.$store.commit('updatedloop', false)
      this.playTypeIndex++
      if (this.playTypeIndex > this.playTypes.length - 1) {
        this.playTypeIndex = 0
      }
      this.$store.commit('updatedplaytype', {playClass: this.playTypes[this.playTypeIndex].Class, playText: this.playTypes[this.playTypeIndex].text})
      if (this.playType.playText === '单曲循环') this.$store.commit('updatedloop', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.play_list_page{
  .bg_cover{
    background:rgba(0,0,0,.5);
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    z-index:22222;
  }
  .play_list{
    position:fixed;
    left:0;
    right:0;
    bottom:0;
    z-index:255;
    color:#2e2e2e;
    font-size:1.1em;
    height: 58%;
    width: 100%;
    background:#f3f3f3;
    z-index:22222;
    .list_header{
      height: 2.5rem;
      width: 100%;
      border-bottom: 1px solid #e0e0e0;
      .left{
        width: 70%;
        height: 100%;
        float: left;
        display: flex;
        justify-content: space-between;
        padding: 0 0.5rem;
        align-items: center;
        .icon_size{
          font-size: 1rem;
        }
        .icon_text{
          font-size: .9rem;
        }
      }
      .right{
        width: 30%;
        height: 100%;
        float: left;
        padding: .7rem 0;
        text-align: center;
        border-left: 1px solid #e0e0e0;
        .icon_size{
          font-size: 1rem;
        }
        .icon_text{
          font-size: .9rem;
        }
      }
    }
    .song_list{
      width: 100%;
      height: 18rem;
      overflow-x: hidden;
      overflow-y: auto;
      padding-bottom: 1rem;
      .song_item{
        height: 2rem;
        width: 100%;
        padding: 0 .4rem;
        line-height: 2rem;
        // display: flex;
        .left{
          width: 90%;
          height: 100%;
          float: left;
        }
        .right{
          width: 10%;
          height: 100%;
          float: left;
        }
      }
    }
  }
}

</style>
