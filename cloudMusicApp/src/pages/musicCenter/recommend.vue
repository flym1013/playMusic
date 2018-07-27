<template>
  <div class='recommend_page'>
    <div class="top_bg"></div>
    <div class="top_bannner clearfix">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item, index) in bannerList" :key="index">
          <!-- <img v-lazy="item.picUrl" /> -->
          <router-link to="">
            <img v-lazy="item.picUrl" class="banner_img">
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="top_tabbar">
      <div class="tabbar_box">
        <div>
          <div class="circle_bg center">
            <router-link to="">
              <i class="iconfont icon-FM icon_size"></i>
            </router-link>
          </div>
          <p>私人FM</p>
        </div>
        <div>
          <div class="circle_bg">
            <router-link to="/recommendByday" class="circle_bg">
              <i class="iconfont icon-rili icon_size"></i>
            </router-link>
          </div>
          <p>每日推荐</p>
        </div>
        <div>
          <div class="circle_bg">
            <router-link to="" class="circle_bg">
              <i class="iconfont icon-playlist icon_size"></i>
            </router-link>
          </div>
          <p>歌单</p>
        </div>
        <div>
          <div class="circle_bg">
            <router-link to="" class="circle_bg">
              <i class="iconfont icon-icon-ranking icon_size"></i>
            </router-link>
          </div>
          <p>排行榜</p>
        </div>
      </div>
    </div>
    <div class="recommend_playlist">
      <div class="playlist_more">
        <router-link to="">
          <span>推荐歌单</span>
          <i class="iconfont icon-icon icon_size"></i>
        </router-link>
      </div>
      <div class="playlist_box clearfix">
        <div v-for="(item, index) in playlist" :key="index" class="playlist_item" :class="{mr_lr_3:index === 1 || index === 4 || index === 7 || index === 10}">
          <div class="playlist_img">
            <router-link :to="{ name: 'playlistDetail', params: { id: item.id }}">
              <img v-lazy="item.picUrl" alt="">
            </router-link>
            <span class="play_count"><van-icon name="browsing-history" class="icon_size" />{{Number(item.playCount/10000).toFixed(2) + "万"}}</span>
          </div>
          <p>{{item.name}}</p>
        </div>
      </div>
    </div>
    <div class="recommend_playlist">
      <div class="playlist_more">
        <router-link to="">
          <span>最新音乐</span>
          <i class="iconfont icon-icon icon_size"></i>
        </router-link>
      </div>
      <div class="playlist_box clearfix">
        <div v-for="(item, index) in musicList" :key="index" class="playlist_item" :class="{mr_lr_3:index === 1 || index === 4 || index === 7}">
          <div class="playlist_img">
            <router-link to="">
              <img v-lazy="item.song.album.picUrl" alt="">
            </router-link>
          </div>
          <p>{{item.name}}</p>
        </div>
      </div>
    </div>
    <div class="recommend_playlist">
      <div class="playlist_more">
        <router-link to="">
          <span>主播电台</span>
          <i class="iconfont icon-icon icon_size"></i>
        </router-link>
      </div>
      <div class="playlist_box clearfix">
        <div v-for="(item, index) in djList" :key="index" class="playlist_item" :class="{mr_lr_3:index === 1 || index === 4}">
          <div class="playlist_img">
            <router-link to="">
              <img v-lazy="item.picUrl" alt="">
            </router-link>
          </div>
          <p>{{item.name}}</p>
        </div>
      </div>
    </div>
    <div class="program_box">
      <div class="program_item clearfix" v-for="(item, index) in programList" :key="index">
        <router-link to="">
          <div class="program_pic">
            <img v-lazy="item.coverUrl" alt="">
          </div>
          <div class="program_content">
            <div class="program_title">
              <p>{{item.name}}</p>
              <p><van-icon name="like-o" class="icon_size" />{{item.listenerCount}}</p>
            </div>
            <div class="program_author">
              <div>{{item.radio.name}}</div>
              <div><van-icon name="arrow" /></div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="exclusive_box">
      <div class="exclusive_item" v-for="(item, index) in exclusiveList" :key="index">
        <div class="exclusive_pic">
          <img :src="item.sPicUrl" alt="">
        </div>
        <div class="exclusive_describe">
          <span>{{item.copywriter}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getBanner, // 获取轮播图
  getRecommendPlaylist, // 获取推荐歌单(未登陆)
  getRecommendMusic, // 获取推荐最新音乐(未登录)
  getRecommendDJ, // 获取推荐电台
  getRecommendProgram, // 获取推荐节目
  getExclusive // 获取独家放送
} from '../../service/getDate.js'
export default {
  data () {
    return {
      bannerList: [],
      playlist: [],
      musicList: [],
      djList: [],
      programList: [],
      exclusiveList: []
    }
  },
  components: {},
  created () {
    this.getBanner()
    this.getRecommendPlaylist()
    this.getRecommendMusic()
    this.getRecommendDJ()
    this.getRecommendProgram()
    this.getExclusive()
  },
  methods: {
    // 获取轮播图
    async getBanner () {
      let res = await getBanner()
      this.bannerList = res.data.banners
    },
    // 获取推荐歌单(未登录)
    async getRecommendPlaylist () {
      let res = await getRecommendPlaylist()
      this.playlist = res.data.result.slice(0, 12)
    },
    // 获取推荐最新音乐(未登录)
    async getRecommendMusic () {
      let res = await getRecommendMusic()
      this.musicList = res.data.result.slice(0, 9)
    },
    // 获取推荐电台
    async getRecommendDJ () {
      let res = await getRecommendDJ()
      this.djList = res.data.result
    },
    // 获取推荐节目
    async getRecommendProgram () {
      let res = await getRecommendProgram()
      this.programList = res.data.programs
    },
    // 获取独家放送
    async getExclusive () {
      let res = await getExclusive()
      this.exclusiveList = res.data.result
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/mixin.scss';
.recommend_page{
  position: relative;
  box-sizing: border-box;
  .top_bg{
    height: 5rem;
    width: 100%;
    background: $theme;
  }
  .top_bannner{
    z-index: 10;
    height: 7rem;
    width: 100%;
    margin-top: -4.5rem;
    box-sizing: border-box;
    padding: 0 0.5rem;
    .banner_img{
      width: 100%;
      height: 100%;
    }
  }
  .top_tabbar{
    height: 4rem;
    margin-top: 1rem;
    border-bottom: 1px solid #e8dede;
    .tabbar_box{
      // display: flex;
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      >div {
        width: 25%;
        height: 100%;
        float: left;
        p{
          text-align: center;
          padding: 0.2rem;
        }
      }
      .circle_bg{
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        background-color: $theme;
        text-align: center;
        line-height: 2.5rem;
        margin: 0 auto;
      .icon_size {
        font-size: 1.2rem;
        color: #ffffff;
        }
      }
    }
  }
  .recommend_playlist{
    margin-top: .2rem;
    background: #fff;
    margin: 0.5rem 0;
    .playlist_more{
      padding: 0.5rem 0;
      span{
        font-weight: 600;
        font-size: 0.8rem;
        color: #000000;
        padding: 0.2rem 0.2rem 0.2rem 0.3rem;
      }
      .icon_size{
        margin-left: -0.3rem;
      }
    }
    .playlist_box{
      padding: 0 0.3rem;
      .playlist_item{
        position: relative;
        width: 32.7%;
        height: 7rem;
        float: left;
        .playlist_img{
          width: 100%;
          height: 5rem;
          .play_count{
            position: absolute;
            top: 0.1rem;
            left: 1.9rem;
            color: #ffffff;
            font-size: 0.1rem;
            .icon_size{
              padding: 0 0.2rem
            }
          }
          img{
            width: 100%;
            height: 100%;
          }
        }
        p{
          font-size: 0.5rem;
          padding: 0.1rem;
          overflow: hidden;
          text-overflow:ellipsis;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          white-space: wrap;
        }
      }
    }
  }
  .program_box{
    margin: 0.5rem 0;
    .program_item{
      width: 100%;
      background: #ffffff;
      margin: 0.5rem 0;
      // height: 5rem;
      .program_pic{
        width: 35%;
        float: left;
        height: 6rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .program_content{
        width: 65%;
        float: left;
        height: 6rem;
        display: flex;
        flex-direction: column;
        padding: 0.3rem 0.5rem;
        .program_title{
          height: 70%;
          border-bottom: 1px solid #e8dede;
          p:nth-of-type(1){
            color: #000000;
          }
          p:nth-of-type(2){
            padding: 0.5rem 0;
            color: #e8dede;
            .icon_size{
              padding-right: 0.4rem;
            }
          }
        }
        .program_author{
          height: 30%;
          display: flex;
          // align-items: center;
          justify-content: space-between;
          padding: 0.2rem 0.2rem;
          div:nth-of-type(1){
            color: #000000;
          }
        }
      }
    }
  }
  .exclusive_box{
    padding: 0.5rem 0;
    .exclusive_item{
      .exclusive_pic{
        img{
          width: 100%;
        }
      }
      .exclusive_describe{
        height: 2rem;
      }
    }
  }
}
</style>
<style lang='scss'>
.van-swipe{
  height: 100%!important;
  width: 100%!important;
  border-radius: 0.3rem;
}
</style>
