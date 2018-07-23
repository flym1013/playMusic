
const user = {
  state: {
    // 登录信息
    loginMsg: {
      uid: 0,
      nickname: ''
    },
    // 底部播放显示
    showPlayBottom: false
  },
  mutations: {
  // 用户信息
    updateloginMsg (state, {uid, nickname}) {
      if (uid) {
        state.loginMsg.uid = uid
      }
      if (nickname) {
        state.loginMsg.nickname = nickname
      }
    },
    // 切换底部播放条
    updateshowplaybottom (state, value) {
      state.showPlayBottom = value
    }
  }
}
export default user
