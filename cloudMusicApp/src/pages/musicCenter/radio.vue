<template>
  <div class='radio_page'>
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
              <i class="iconfont icon-fenlei icon_size"></i>
            </router-link>
          </div>
          <p>电台分类</p>
        </div>
        <div>
          <div class="circle_bg">
            <router-link to="" class="circle_bg">
              <i class="iconfont icon-paihang icon_size"></i>
            </router-link>
          </div>
          <p>电台排行</p>
        </div>
        <div>
          <div class="circle_bg">
            <router-link to="" class="circle_bg">
              <i class="iconfont icon-huiyuan icon_size"></i>
            </router-link>
          </div>
          <p>付费精品</p>
        </div>
        <div>
          <div class="circle_bg">
            <router-link to="" class="circle_bg">
              <i class="iconfont icon-weikaifang icon_size"></i>
            </router-link>
          </div>
          <p>暂未开放</p>
        </div>
      </div>
    </div>
    <div class="day_recommend">
      <div class="recommend_head">
        今日优选
      </div>
      <div class="recommend_item clearfix" v-for="(item, index) in recommendList" :key="index">
        <div class="avator">
          <img v-lazy="item.dj.avatarUrl" alt="">
        </div>
        <div class="content">
          <div class="content_box">
            <div>{{item.name}}</div>
            <div>订阅数量：{{item.subCount}}</div>
            <div>{{item.rcmdtext}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="category" v-for="(item, index) in categoryList" :key="index">
      <div class="category_name">
        <span>{{item.name}}<i class="iconfont icon-icon icon_size"></i></span>
      </div>
      <div class="category_detail clearfix">
        <div class="detail_item" v-for="(n, i) in item.djDetail" :key="i">
          <div class="img_content">
            <img :src="n.picUrl" alt="">
          </div>
          <div class="detail_introduce">
            {{n.rcmdtext}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getBanner, // 获取轮播图
  getDjRecommend, // 获取电台推荐
  getDjCategory, // 获取电台分类
  getDjCategoryRecommend // 获取电台分类推荐
} from '../../service/getDate.js'
export default {
  data () {
    return {
      bannerList: [],
      recommendList: [],
      categoryList: [],
      djDetailList: []
    }
  },
  components: {},
  created () {
    this.getBanner()
    this.getDjRecommend()
    this.getDjCategory()
  },
  methods: {
    // 获取轮播图
    async getBanner () {
      let res = await getBanner()
      this.bannerList = res.data.banners
    },
    // 获取电台推荐
    async getDjRecommend () {
      let res = await getDjRecommend()
      this.recommendList = res.data.djRadios
    },
    // 获取电台分类并合并电台推荐
    async getDjCategory () {
      let res = await getDjCategory()
      this.categoryList = res.data.categories
      this.categoryList.forEach(async (item, index) => {
        let res = await getDjCategoryRecommend({ type: item.id })
        item.djDetail = res.data.djRadios.slice(0, 3)
      })
      console.log(this.categoryList)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/mixin.scss';
.radio_page{
  position: relative;
  box-sizing: border-box;
  background: #ffffff;
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
  .day_recommend{
    .recommend_head{
      padding: .2rem 0 0 .5rem;
      height: 1.5rem;
      width: 100%;
      line-height: 1.5rem;
      font-size: .8rem;
      font-weight: bold;
    }
    .recommend_item{
      height: 6rem;
      width: 100%;
      .avator{
        float: left;
        width: 30%;
        height: 100%;
        padding: 0.4rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .content{
        float: right;
        width: 70%;
        padding: 0 0.5rem;
        height: 100%;
        box-sizing: border-box;
        .content_box{
          height: 100%;
          border-bottom: 1px solid #e8dede;
          div:nth-of-type(1){
            font-size: .8rem;
            font-weight: bold;
            padding-top: 1rem;
          }
          div:nth-of-type(2){
            color: #7e7e7e;
            padding: 0.4rem 0 0.2rem 0;
          }
          div:nth-of-type(3){
            color: #7e7e7e;
          }
        }
      }
    }
  }
  .category{
    margin-top: 1rem;
    .category_name{
      padding: 0 .5rem;
      height: 2rem;
      line-height: 2rem;
      width: 100%;
      span{
        font-size: .8rem;
        font-weight: bold;
      }
    }
    .category_detail{
      height: 8rem;
      width: 100%;
      padding: 0 0.4rem;
      .detail_item{
        height: 100%;
        width: 33.3%;
        float: left;
        .img_content{
          height: 6rem;
          padding: 0.1rem;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
