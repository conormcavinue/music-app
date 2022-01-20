<template>
    <router-view
      :albums="albums"
      :musicServices="musicServices"
      @albumVote="albumVote"
      />
</template>

<script>
import sourceData from '@/data.json'

export default {
  name: 'App',
  data: function () {
    return {
      albums: [],
      musicServices: []
    }
  },
  methods: {
    albumVote: function (value, albumId) {
      const albumIndex = this.albums.findIndex(x => x.id === albumId)
      this.albums[albumIndex].albumVote += value
    },
    getAlbums: function () {
      this.albums = sourceData.albums
    },
    getMusicServices: function () {
      this.musicServices = sourceData.musicServices
    }
  },
  mounted () {
    this.getAlbums()
    this.getMusicServices()
  }
}
</script>

<style>
.animate__animated {
  animation-duration: 2s;
}
#app {
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

li > input[type='checkbox'] {
  margin-left: 10px;
  margin-right: 5px;
}

li > input[type='checkbox']:hover, li > label:hover {
  cursor: pointer;
}

.min-half-width {
  min-width: 50%
}

.min-quarter-width {
  min-width: 25%
}
</style>
