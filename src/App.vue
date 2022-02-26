<template>
    <router-view
      :albums="albums"
      :musicServices="musicServices"
      />
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data: function () {
    return {
      albums: [],
      musicServices: []
    }
  },
  methods: {
    getAlbums: function () {
      axios.get('http://localhost:83/albums')
        .then(response => {
          this.albums = response.data
        })
    },
    getMusicServices: function () {
      axios.get('http://localhost:83/music_services')
        .then(response => {
          this.musicServices = response.data
        })
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
@media (min-width: 512px) {
.img-max {
  max-width: 50px !important
}
}
</style>
