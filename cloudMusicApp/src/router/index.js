import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// 音乐中心
import home from '@/pages/musicCenter/home.vue'
import recommendByday from '@/pages/musicCenter/recommendByday.vue'

// 登录
import selectLogin from '@/pages/login/selectLogin.vue'
import login from '@/pages/login/login.vue'

// 我的音乐
import myMusic from '@/pages/myMusic/myMusic.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/selectLogin',
      name: 'selectLogin',
      component: selectLogin,
      children: [ // 定义子路由时，必须在父路由页面加上<router-view></router-view>,访问子路由页面时，其父路由页面代码依然存在。
        // {
        //   path: 'login',
        //   name: 'login',
        //   component: login
        // }
      ]
    },
    { path: '/login', name: 'login', component: login },
    { path: '/myMusic', name: 'myMusic', component: myMusic },
    { path: '/recommendByday', name: 'recommendByday', component: recommendByday }
  ]
})
