const getters = {
  showPlay: state => state.play.showPlay,
  loginMsg: state => state.user.loginMsg,
  play: state => state.play.play,
  isplaying: state => state.play.isplaying,
  loop: state => state.play.isplaying,
  lrcData: state => state.play.lrcData,
  duration: state => state.play.duration,
  showPlayBottom: state => state.user.showPlayBottom
}
export default getters
