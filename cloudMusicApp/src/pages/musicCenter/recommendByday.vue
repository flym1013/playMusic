<template>
  <div class="page recommend_day_page">
    <div class="recommend_day_song">
      <van-nav-bar title="每日推荐" left-text="返回" left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight">
        <van-icon name="question" slot="right" />
      </van-nav-bar>
    </div>
    <div class="r_songList">
      <div class="r_play">
        <span class="icon"><i class="iconfont icon-bofang icon_size"></i></span>
        <span class="icon_text">播放全部</span>
      </div>
      <div class="r_song_item clearfix" v-for="(item, index) in songList" :key="index" @click="playDaySong(item)">
        <div class="left">
          <img v-lazy="item.album.picUrl" alt="">
        </div>
        <div class="right">
          <div class="right_content">
            <p>{{item.name}}</p>
            <p>{{item.album.artists[0].name}}-{{item.album.name}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
// import { mapMutations,mapGetters,mapState } from 'vuex'
import {
  getRecommendSongByDay // 获取每日推荐歌曲
} from '../../service/getDate.js'
export default {
  data () {
    return {
      songList: []
    }
  },
  components: {},
  created () {
    this.getRecommendSongByDay()
  },
  methods: {
    onClickLeft () {
      this.$router.back(-1)
    },
    onClickRight () {
      Toast({
        message: '暂未开放',
        duration: 1000
      })
    },
    // 播放每日推荐音乐
    playDaySong (obj) {
      // console.log(obj)
      // this.$store.commit('isshowplay', true)
      this.$store.commit('playing', false)
      this.$store.commit('updateshowplaybottom', true)
      this.$store.commit('updateplayinfo', {id: obj.id, name: obj.name, singer: obj.artists[0].name, singerImg: obj.album.blurPicUrl})
      this.$store.commit('updatedplaylist', this.songList)
    },
    // 获取每日推荐歌曲
    async getRecommendSongByDay () {
      let res = await getRecommendSongByDay()
      this.songList = res.data.recommend
    }
  }
}
</script>

<style lang="scss" scoped>
.recommend_day_page{
  overflow: scroll;
  background: #ffffff;
}
.r_songList{
  margin-top: 47px;
  .r_play{
    border-bottom: 1px solid #eee;
    height: 2rem;
    line-height: 2rem;
    padding: 0 .2rem;
    .icon{
      height: 100%;
      .icon_size{
        font-size: 1rem;
      }
    }
    .icon_text{
      font-size: .9rem;
      font-weight: 500;
    }
  }
  .r_song_item{
    height: 2.8rem;
    padding: 0 .2rem;
    .left{
      float: left;
      height: 2.8rem;
      padding: .4rem 0;
      width: 10%;
      img{
        height: 2rem;
        width: 100%;
        border-radius: .2rem;
      }
    }
    .right{
      float: right;
      height: 2.8rem;
      width: 90%;
      padding: .4rem .4rem 0;
      .right_content{
        width: 100%;
        border-bottom: 1px solid #eee;
        padding-bottom: .4rem;
        p:nth-of-type(2){
          font-size: .01rem;
          color: #c9c9c9;
        }
      }
    }
  }
}
</style>

<style lang="scss">
@import 'src/styles/mixin.scss';
.recommend_day_song{
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 100;
  width: 100%;
  .van-nav-bar{
    color: #ffffff;
    background: $theme;
  }
  .van-nav-bar .van-icon{
    color: #ffffff!important;
  }
  .van-nav-bar__text{
    color: #ffffff!important;
  }
  .van-nav-bar .van-icon{
    color: #ffffff!important;
  }
}

</style>
