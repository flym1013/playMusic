<template>
  <div id="header">
    <div class="header_content">
      <div class="left" @click="showSlider">
        <router-link to="">
          <i class="iconfont icon-caidan icon_size"></i>
        </router-link>
      </div>
      <div class="center">
        <router-link to="/myMusic" class="margin-lr-10">
          <i class="iconfont icon-yinyue icon_size" :class="{icon_size_active: $route.path === '/myMusic'}"></i>
        </router-link>
        <router-link to="/" class="margin-lr-10">
          <i class="iconfont icon-wangyiyunyinlezizhi-copy icon_size" :class="{icon_size_active: $route.path === '/'}"></i>
        </router-link>
        <router-link to="" class="margin-lr-10">
          <i class="iconfont icon-shipin icon_size"></i>
        </router-link>
      </div>
      <div class="right">
        <router-link to="">
          <i class="iconfont icon-sousuo icon_size"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  created () {},
  methods: {
    showSlider () {
      this.$emit('showSlider')
    }
  }
}
</script>

<style scoped lang="scss">
@import 'src/styles/mixin.scss';
#header {
  background-color: $theme;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  @include wh(100%, 2rem);
}
.icon_size {
  font-size: 1.2rem;
  color: #d2c1c1;
}
.icon_size_active {
  color: #ffffff!important;
}
.header_content{
  display: flex;
  justify-content: space-between;
  align-items: center; // 作用于内部元素居中
  padding: 0 10px;
  height: 100%;
}
</style>
