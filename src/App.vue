<template>
    <div class ="container">
        <album-list
          :albums="albums"
          :musicServices="musicServices"
          @albumVote="albumVote"
          />
    </div>
</template>

<script>
import sourceData from '@/data.json'
import AlbumList from '@/components/AlbumList.vue'

export default {
  name: 'App',
  data: function () {
    return {
      albums: sourceData.albums,
      musicServices: sourceData.musicServices
    }
  },
  components: {
    AlbumList
  },
  methods: {
    enter: function (el) {
      el.className =
          'animate__animated animate__fadeInRight'
    },
    leave: function (el) {
      el.className = 'card d-flex col-sm-12 col-md-3 mx-1 mt-3 animate__animated animate__fadeOutRight'
    },
    albumVote: function (value, albumId) {
      const albumIndex = this.albums.findIndex(x => x.id === albumId)
      this.albums[albumIndex].albumVote = value
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
