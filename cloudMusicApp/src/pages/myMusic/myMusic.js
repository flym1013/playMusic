import headerTop from '../../components/header.vue'
import sliderInfo from '../../components/sliderInfo.vue'
import {
  getUserDetail, // 获取用户详情
  getUserInfoNum, // 获取用户信息 , 歌单，收藏，mv, dj 数量
  getUserPlaylist, // 获取用户歌单
  updateUserPlaylist, // 更新歌单
  newUserPlaylist // 新建歌单
} from '../../service/getDate.js'
import {getStore} from '@/utils/storage.js'

export default {
  data () {
    return {
      sliderShow: false,
      userDetail: [],
      userInfoNum: [],
      userCreatPlaylist: [],
      userCollectPlaylist: [],
      update: [],
      newlist: [],
      activeNames: ['1']
    }
  },
  components: { headerTop, sliderInfo },
  async created () {
    this.userInfo = JSON.parse(getStore('loginInfo'))
    await this.getUserDetail()
    this.getUserInfoNum()
    this.getUserPlaylist()
  },
  methods: {
    showSlider () {
      this.sliderShow = !this.sliderShow
    },
    // 获取用户详情
    async getUserDetail () {
      let res = await getUserDetail({
        uid: this.userInfo.id
      })
      this.userDetail = res.data
    },
    // 获取用户信息 , 歌单，收藏，mv, dj 数量
    async getUserInfoNum () {
      let res = await getUserInfoNum({
        uid: this.userInfo.id
      })
      this.userInfoNum = res.data
    },
    // 获取用户歌单
    async getUserPlaylist () {
      let res = await getUserPlaylist({
        uid: this.userInfo.id
      })
      this.userCreatPlaylist = res.data.playlist.slice(0, 5)
      this.userCollectPlaylist = res.data.playlist.slice(5)
    },
    // 更新歌单
    async updateUserPlaylist () {
      let res = await updateUserPlaylist({
        uid: this.userInfo.id
      })
      this.update = res.data
    },
    // 新建歌单
    async newUserPlaylist (str) {
      let res = await newUserPlaylist({
        name: str
      })
      this.newlist = res.data
    }
  }
}
