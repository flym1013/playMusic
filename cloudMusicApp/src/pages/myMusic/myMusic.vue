<template>
  <div class="page">
    <headerTop @showSlider="showSlider"></headerTop>
    <div class="page_content">
      <div class="person_bg"></div>
      <div class="person_name">
        <div class="name">
          <div class="name_detail">
            <img :src="userDetail.profile.avatarUrl" alt="">
            <span>{{userDetail.profile.nickname}}</span>
            <span>开通会员</span>
          </div>
          <div class="member">
            黑胶vip送你三重礼
          </div>
        </div>
      </div>
      <div class="my_num">
        <div class="num_sty clearfix">
          <div class="icon"><i class="iconfont icon-yinyue icon_size"></i></div>
          <div class="content">
            本地音乐<span>(24)</span>
          </div>
        </div>
        <div class="num_sty clearfix">
          <div class="icon"><i class="iconfont icon-bofang1 icon_size"></i></div>
          <div class="content">
            最近播放<span>(107)</span>
          </div>
        </div>
        <div class="num_sty clearfix">
          <div class="icon"><i class="iconfont icon-fenlei icon_size"></i></div>
          <div class="content">
            下载管理<span>({{userInfoNum.artistCount}})</span>
          </div>
        </div>
        <div class="num_sty clearfix">
          <div class="icon"><i class="iconfont icon-FM icon_size"></i></div>
          <div class="content">
            我的电台<span>({{userInfoNum.djRadioCount}})</span>
          </div>
        </div>
        <div class="num_sty clearfix">
          <div class="icon"><i class="iconfont icon-gengduo icon_size"></i></div>
          <div class="content">
            我的收藏<span>({{userInfoNum.artistCount}})</span>
          </div>
        </div>
      </div>
      <div class="playlist">
        <van-collapse v-model="activeNames">
          <van-collapse-item title="" name="1">
            <div slot="title">创建的歌单<span class="numcolor">({{userInfoNum.createdPlaylistCount}})</span></div>
            <div class="creatList clearfix" v-for="(item, index) in userCreatPlaylist" :key="index">
              <div class="left"><img v-lazy="item.coverImgUrl" alt=""></div>
              <div class="right">
                <div>{{item.name}}</div>
                <div class="collect_num">{{item.trackCount}}首</div>
              </div>
            </div>
          </van-collapse-item>
          <van-collapse-item title="" name="2">
            <div slot="title">收藏的歌单<span class="numcolor">({{userInfoNum.subPlaylistCount}})</span></div>
            <div class="creatList clearfix" v-for="(item, index) in userCollectPlaylist" :key="index">
              <div class="left"><img v-lazy="item.coverImgUrl" alt=""></div>
              <div class="right">
                <div>{{item.name}}</div>
                <div class="collect_num">{{item.trackCount}}首</div>
              </div>
            </div>
          </van-collapse-item>
        </van-collapse>
      </div>
    </div>
    <div class="slider" :class="{'show_slidder':sliderShow}">
      <slider-Info></slider-Info>
    </div>
    <transition name="showcover">
      <div class="back_over" @click="sliderShow = !sliderShow" v-if="sliderShow"></div>
    </transition>
  </div>
</template>

<script>
import myMusic from './myMusic.js'
export default myMusic
</script>

<style lang='scss' scoped>
@import 'src/styles/mixin.scss';
.page_content{
  padding-top: 2rem;
  height: 100%;
  background: #ffffff;
  overflow: scroll;
}
.person_bg{
  height: 4rem;
  width: 100%;
  background: $theme;
}
.person_name{
  z-index: 10;
  height: 5rem;
  width: 100%;
  margin-top: -3rem;
  box-sizing: border-box;
  padding: 0 0.5rem;
  .name{
    background: #fafafa;
    height: 100%;
    width: 100%;
    padding: 0 .5rem;
    border-radius: .4rem;
    box-shadow: .1rem .2rem  .2rem  #eee;
    .name_detail{
      height: 3.5rem;
      width: 100%;
      position: relative;
      border-bottom: 1px solid #eee;
      img{
        // margin: .5rem;
        position: absolute;
        width: 2rem;
        height: 2rem;
        border-radius: 1rem;
        top: .5rem;
        left: .5rem;
      }
      span{
        position: absolute;
      }
      span:nth-of-type(1){
        left: 3rem;
        top: 1rem;
        font-weight: bold;
      }
      span:nth-of-type(2){
        top: 1rem;
        right: 1rem;
        height: 1rem;
        width: 4rem;
        text-align: center;
        color: $theme;
        border: 1px solid $theme;
        border-radius: .5rem;
      }
    }
    .member{
      height: 1.5rem;
      line-height: 1.5rem;
    }
  }
}
.my_num{
  margin-top: .8rem;
  .num_sty{
    height: 2rem;
    width: 100%;
    line-height: 2rem;
    .icon{
      width: 10%;
      height: 100%;
      float: left;
      text-align: center;
      .icon_size{
        font-size: 1rem;
        color:$theme;
      }
    }
    .content{
      width: 90%;
      height: 100%;
      float: left;
      border-bottom: 1px solid #eee;
      font-size: .8rem;
      span{
        color: #c9c9c9;
        padding-left: 0.4rem;
      }
    }
  }
}
.playlist{
  padding: 0 0.2rem;
  .creatList{
    height: 3rem;
    width: 100%;
    .left{
      float: left;
      width: 15%;
      height: 2.5rem;
      padding: .1rem;
      img{
        width: 100%;
        border-radius: .5rem;
      }
    }
    .right{
      padding: .2rem;
      float: right;
      width: 85%;
      height: 2.5rem;
      .collect_num{
        color: #c9c9c9;
      }
    }
  }
}
.slider{
  width: 75%;
  height: 100%;
  background: #ffffff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 101;
  transform: translateX(-100%);
  transition: all .5s;
  &.show_slidder{
    transform: translateX(0)
  }
}
.back_over{
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.3);
}
.showcover-enter-active, .showcover-leave-active {
  transition: opacity .3s
}
.showcover-enter, .showcover-leave-active {
  opacity: 0
}
</style>
<style lang="scss">
.playlist{
  .van-cell{
    background-color: #e8e8e8;
  }
  .van-collapse-item__content{
    padding: 0!important;
  }
}
</style>
