<template>
  <div class='friend_page'>
    <div class="attion">
      <div class="more">
        <span>精彩别错过<i class="iconfont icon-icon"></i></span>
      </div>
      <div class="user clearfix">
        <div class="user_item" v-for="(item, index) in attionList" :key="index">
          <div class="user_head"><img :src="item.avatarUrl" alt=""></div>
          <div class="user_name">{{item.nickname}}</div>
        </div>
      </div>
    </div>
    <div class="dynamic">
      <div class="dynamic_item clearfix" v-for="(item, index) in dynamicList" :key="index">
        <div class="item_left">
          <img :src="item.user.avatarUrl"  v-lazy="item.user.avatarUrl" alt="">
        </div>
        <div class="item_right">
          <div class="right_name">
            <div class="name_left">
              <span class="font_color">{{item.user.nickname}}</span>
              <span>发布视频：</span>
              <div>{{item.showTime}}</div>
            </div>
            <div class="name_right">
              <i>+</i>关注
            </div>
          </div>
          <div class="right_content">
            <span>{{item.user.signature}}</span>
          </div>
          <div class="right_play">
            <!-- 图片懒加载，用v-lazy代替：src即可 -->
            <img v-lazy="item.user.backgroundUrl" alt="">
          </div>
          <div class="right_comment">
            <span><i class="iconfont icon-like icon_size"></i>{{item.info.likedCount}}</span>
            <span><i class="iconfont icon-buoumaotubiao48 icon_size"></i>{{item.info.commentCount}}</span>
            <span><i class="iconfont icon-fenxiang1 icon_size"></i>{{item.info.shareCount}}</span>
            <span class="more"><i class="iconfont icon-gengduo icon_size"></i></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getUserAttion, // 获取用户关注列表
  getFriendDynamic // 获取动态
} from '../../service/getDate.js'
import {getStore} from '@/utils/storage.js'
export default {
  data () {
    return {
      userInfo: [],
      attionList: [],
      dynamicList: []
    }
  },
  components: {},
  async created () {
    this.userInfo = JSON.parse(getStore('loginInfo'))
    await this.getUserAttion()
    this.getFriendDynamic()
  },
  methods: {
    // 获取用户关注列表
    async getUserAttion () {
      let res = await getUserAttion({
        uid: this.userInfo.id
      })
      this.attionList = res.data.follow.slice(0, 5)
    },
    // 获取动态
    async getFriendDynamic () {
      let res = await getFriendDynamic({
        uid: this.userInfo.id
      })
      this.dynamicList = res.data.event
      this.dynamicList.forEach((item, index) => {
        item.showTime = this.$moment(item.showTime).format('MM-DD HH:mm')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.friend_page{
  // padding-top: 2rem;
  background: #ffffff;
  .attion{
    width: 100%;
    height: 6rem;
    border-bottom: 1px solid #f3f3f3;
    .more{
      padding: 0.2rem;
    }
    .user{
      width: 100%;
      height: 3rem;
      .user_item{
        width: 20%;
        height: 100%;
        float: left;
        padding: 0.2rem 0.5rem;
        .user_head{
          height: 3rem;
          width: 100%;
          img{
            width: 100%;
            border-radius: 2rem;
          }
        }
        .user_name{
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
  .dynamic{
    .dynamic_item{
      height: 15rem;
      width: 100%;
      border-bottom: 1px solid #f3f3f3;
      .item_left{
        float: left;
        width: 15%;
        padding: .5rem;
        img{
          width: 100%;
          border-radius: 2rem;
        }
      }
      .item_right{
        float: right;
        width: 85%;
        height: 100%;
        padding: 0.5rem .5rem 0;
        .right_name{
          height: 2rem;
          display: flex;
          padding-right: .5rem;
          justify-content: space-between;
          // align-items: center;
          .name_left{
            .font_color{
              color: #528BFF;
            }
          }
          .name_right{
            height: 1rem;
            width: 3rem;
            text-align: center;
            border-radius: 1rem;
            background: #f56767;
            color: #ffffff;
          }
        }
        .right_content{
          height: 1rem;
          overflow: hidden;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        .right_play{
          height: 9rem;
          img{
            height: 100%;
            width: 100%;
          }
        }
        .right_comment{
          position: relative;
          height: 2rem;
          line-height: 2rem;
          span{
            margin-left: 0.5rem;
            .icon_size{
              margin: 0 .2rem;
              color: #6e6e6e;
            }
          }
          span:nth-of-type(1){
            margin-left: 0;
          }
          .more{
            position: absolute;
            right: 0.1rem;
          }
        }
      }
    }
  }
}
</style>
