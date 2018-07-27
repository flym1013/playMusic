<template>
  <div>1111</div>
</template>

<script>
import {
  getPlaylistDetail // 获取歌单详情
} from '../../service/getDate.js'
export default {
  data () {
    return {
      playlistDetail: []
    }
  },
  created () {
    console.log(this.$route.params.id)
    this.getPlaylistDetail()
  },
  methods: {
    // 获取歌单详情
    async getPlaylistDetail () {
      let res = await getPlaylistDetail({
        id: this.$route.params.id
      })
      this.playlistDetail = res.data
    }
  }
}
</script>

<style>

</style>
