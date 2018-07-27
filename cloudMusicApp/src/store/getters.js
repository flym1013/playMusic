const getters = {
  showPlay: state => state.play.showPlay,
  loginMsg: state => state.user.loginMsg,
  play: state => state.play.play,
  isplaying: state => state.play.isplaying,
  loop: state => state.play.loop,
  lrcData: state => state.play.lrcData,
  duration: state => state.play.duration,
  showPlayBottom: state => state.user.showPlayBottom,
  playList: state => state.play.playList,
  showPlayList: state => state.play.showPlayList,
  playType: state => state.play.playType
}
export default getters
