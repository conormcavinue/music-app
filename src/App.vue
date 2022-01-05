<template>
    <div class ="container">
        <div class="align-items-center">
            <label for="formMax">Albums Released Before</label>
            <input type="text" id="formMax" class="form-control mx-2 text-center"
                    style="width:60px;" v-model="maxYear">
            <input type="range" class="custom-range" min="1950" max="2022" v-model="maxYear">
        </div>
        <div class="row">
            <div v-for="album, key in albumsReleasedBeforeYear" :key="key" class="card d-flex col-sm-12 col-md-3 mx-1 mt-3">
              <div class="row mx-auto pt-2">
                <img style="height: 250px;" :src="album.imageLink" />
              </div>
              <div class="mx-auto">
                <h3>{{ album.albumName }}</h3>
                <h4>{{ album.albumArtist }}</h4>
                <p>{{ album.publishedAt }}</p>
              </div>
              <div class="row mx-auto pb-2">
                <div v-for="link, key in album.links" :key="key" class="col-md-6">
                  <div v-html="generatedLink(link)"></div>
                </div>
              </div>
          </div>
      </div>
    </div>
</template>

<script>
import sourceData from '@/data.json'

export default {
  name: 'App',
  data: function () {
    return {
      maxYear: 2022,
      albums: sourceData.albums,
      musicServices: sourceData.musicServices
    }
  },
  methods: {
    generatedLink: function (link) {
      return '<a href="' + link.url + '" target="_blank"><img height="50px" width="50px" src="' + this.musicServices.find(x => x.id === link.musicServiceId).imgSrc + '" /></a>'
    },
    enter: function (el) {
      el.className =
          'animate__animated animate__fadeInRight'
    },
    leave: function (el) {
      el.className = 'card d-flex col-sm-12 col-md-3 mx-1 mt-3 animate__animated animate__fadeOutRight'
    }
  },
  computed: {
    albumsReleasedBeforeYear: function () {
      return this.albums.filter(x => x.releaseYear <= this.maxYear)
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
