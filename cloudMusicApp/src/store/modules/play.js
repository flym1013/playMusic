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
    isplaying: false, // 是否正在播放
    lrcData: [], // 歌词信息
    duration: 0, // 歌曲时间长
    loop: false // 是否循环播放
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
    }
  }
}
export default play
