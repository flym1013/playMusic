const play = {
  state: {
    // 播放信息
    showPlay: false, // 是否显示播放界面
    play: {
      id: '',
      name: '',
      singer: '',
      singerImg: ''
    },
    playType: {
      playClass: 'icon-liebiaoxunhuan',
      playText: '列表循环'
    },
    isplaying: false, // 是否正在播放
    lrcData: [], // 歌词信息
    duration: 0, // 歌曲时间长
    loop: false, // 是否循环播放
    playList: [], // 待播放列表
    showPlayList: false // 展示播放列表.
  },
  mutations: {
    // 是否显示播放界面
    isshowplay (state, show) {
      state.showPlay = show
    },
    // 更新播放信息
    updateplayinfo (state, {id, name, singer, singerImg}) {
      if (id) {
        state.play.id = id
      }
      if (name) {
        state.play.name = name
      }
      if (singer) {
        state.play.singer = singer
      }
      if (singerImg) {
        state.play.singerImg = singerImg
      }
    },
    // 是否正在播放
    playing (state, val) {
      state.isplaying = val
    },
    // 是否循环播放
    updatedloop (state, val) {
      state.loop = val
    },
    // lrcData 歌词数据
    updatelrcData (state, newVal) {
      state.lrcData = newVal
    },
    // 歌曲时间长
    updateduration (state, newVal) {
      state.duration = newVal
    },
    // 待播放列表更新
    updatedplaylist (state, newval) {
      state.playList = newval
    },
    // 是否展示播放列表
    isshowplaylist (state, newval) {
      state.showPlayList = newval
    },
    // 更新播放类型
    updatedplaytype (state, {playClass, playText}) {
      if (playClass) {
        state.playType.playClass = playClass
      }
      if (playText) {
        state.playType.playText = playText
      }
    }
  }
}
export default play
