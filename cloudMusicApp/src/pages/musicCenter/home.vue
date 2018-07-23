<template>
  <div class='page'>
    <headerTop @showSlider="showSlider"></headerTop>
    <div class="page_content">
      <div class="tabs_box">
        <!-- 传入数字，需把它转变js字符，故须v-bing绑定传值 -->
        <van-tabs v-model="active" swipeable :line-width='30' @click="getCurrentTab">
          <van-tab v-for="(item, index) in tabContent" :key="index" :title="item.name">
          </van-tab>
        </van-tabs>
        <div class="component_box">
          <recommend v-if="currentTab === 0"></recommend>
          <friends v-if="currentTab === 1"></friends>
          <radio v-if="currentTab === 2"></radio>
        </div>
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
import home from './home.js'
export default home
</script>

<style lang="scss" scoped>
.page_content{
  padding-top: 2rem;
  height: 100%;
}
// .tabs_box{
//   margin-top: 2rem;
// }
.component_box{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  padding-top: 4.3rem; // 减去上面所固定的元素高度
  overflow-x: hidden;
  overflow-y: auto;
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
<style lang='scss'>
@import 'src/styles/mixin.scss';
.van-tabs__nav{
  background-color: $theme!important;
}
.van-tab{
  background-color: $theme!important;
  color: $gray;
}
.van-tab--active{
  color: #ffffff;
}
.van-tabs__line{
  background-color: #ffffff;
  bottom: 20px;
}
.van-hairline--top-bottom::after{
  border: none;
}
.van-tabs--line .van-tabs__wrap{
  height: 2.3rem!important;
}
</style>
