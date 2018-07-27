import fetch from '../utils/fetch.js'

// get params  post data
// 音乐中心

// 获取轮播图
export function getBanner (opt) {
  return fetch({
    url: '/banner',
    methods: 'get',
    params: opt
  })
}
// 获取推荐歌单 未登录
export function getRecommendPlaylist (opt) {
  return fetch({
    url: '/personalized',
    methods: 'get',
    params: opt
  })
}

// 获取推荐最新音乐未登录
export function getRecommendMusic (opt) {
  return fetch({
    url: '/personalized/newsong',
    methods: 'get',
    params: opt
  })
}

// 获取推荐电台 未登录
export function getRecommendDJ (opt) {
  return fetch({
    url: '/personalized/djprogram',
    methods: 'get',
    params: opt
  })
}

// 获取推荐节目 未登录
export function getRecommendProgram (opt) {
  return fetch({
    url: '/program/recommend',
    methods: 'get',
    params: opt
  })
}

// 获取独家放送
export function getExclusive (opt) {
  return fetch({
    url: '/personalized/privatecontent',
    methods: 'get',
    params: opt
  })
}

// 手机登录接口
export function getLoginByPhone (opt) {
  return fetch({
    url: '/login/cellphone',
    methods: 'get',
    params: opt
  })
}

// 获取用户关注列表
export function getUserAttion (opt) {
  return fetch({
    url: '/user/follows',
    methods: 'get',
    params: opt
  })
}

// 获取动态
export function getFriendDynamic (opt) {
  return fetch({
    url: '/event',
    methods: 'get',
    params: opt
  })
}

// 获取电台推荐
export function getDjRecommend (opt) {
  return fetch({
    url: '/dj/recommend',
    methods: 'get',
    params: opt
  })
}

// 电台分类
export function getDjCategory (opt) {
  return fetch({
    url: '/dj/catelist',
    methods: 'get',
    params: opt
  })
}

/**
 * 获取电台分类推荐
 * @param {Number} type 电台类型 ,
 */
export function getDjCategoryRecommend (opt) {
  return fetch({
    url: '/dj/recommend/type',
    methods: 'get',
    params: opt
  })
}

// 获取用户详情
export function getUserDetail (opt) {
  return fetch({
    url: '/user/detail',
    methods: 'get',
    params: opt
  })
}

// 获取用户信息 , 歌单，收藏，mv, dj 数量
export function getUserInfoNum (opt) {
  return fetch({
    url: '/user/subcount',
    methods: 'get',
    params: opt
  })
}

// 获取用户歌单
export function getUserPlaylist (opt) {
  return fetch({
    url: '/user/playlist',
    methods: 'get',
    params: opt
  })
}

/**
 * 更新歌单
 * @param {Number} id 歌单id
 * @param {String} name 歌单名字
 * @param {String} desc 歌单描述
 * @param {String} tags 歌单tag
 */
export function updateUserPlaylist (opt) {
  return fetch({
    url: '/playlist/update',
    methods: 'get',
    params: opt
  })
}

/**
 * 新建歌单
 * @param {Number} name 歌单名
 */
export function newUserPlaylist (opt) {
  return fetch({
    url: '/playlist/create',
    methods: 'get',
    params: opt
  })
}

/**
 * 获得每日推荐歌曲
 */
export function getRecommendSongByDay (opt) {
  return fetch({
    url: '/recommend/songs',
    methods: 'get',
    params: opt
  })
}

/**
 * 获取音乐 url
 */
export function getPlayUrl (opt) {
  return fetch({
    url: '/music/url',
    methods: 'get',
    params: opt
  })
}

/**
 * 获取歌词 url v不需要登录
 * @param {Number} id 音乐 id
 */
export function getPlayLyric (opt) {
  return fetch({
    url: '/lyric',
    methods: 'get',
    params: opt
  })
}

/**
 * 获取歌单详情 v不需要登录
 * @param {Number} id 歌单 id
 */
export function getPlaylistDetail (opt) {
  return fetch({
    url: '/playlist/detail',
    methods: 'get',
    params: opt
  })
}
