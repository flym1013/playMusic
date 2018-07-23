import headerTop from '../../components/header.vue'
import recommend from './recommend.vue'
import friends from './friends.vue'
import radio from './radio.vue'
import sliderInfo from '../../components/sliderInfo.vue'

export default {
  data () {
    return {
      tabContent: [
        {id: 0, name: '推荐'},
        {id: 1, name: '朋友'},
        {id: 2, name: '电台'}
      ],
      active: 0,
      currentTab: 0,
      sliderShow: false
    }
  },
  components: { headerTop, recommend, friends, radio, sliderInfo },
  created () {},
  methods: {
    // 获取当前的tab
    getCurrentTab (index) {
      this.currentTab = index
    },
    showSlider () {
      this.sliderShow = !this.sliderShow
    }
  }
}
