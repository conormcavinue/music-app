<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="#">Music 2022</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Filters
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <input type="checkbox" id="releaseYearFilter" value="releaseYear" v-model="filters">
                <label for="releaseYearFilter">Release Year</label>
              </li>
              <li>
                <input type="checkbox" id="dateAddedFilter" value="dateAdded" v-model="filters">
                <label for="dateAddedFilter">Date Added</label>
              </li>
            </ul>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="filterText">
        </form>
      </div>
    </div>
  </nav>
  <div class ="container">
      <album-list
        :albums="albums"
        :musicServices="musicServices"
        :filterText="filterText"
        :filters="filters"
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
      albums: [],
      musicServices: sourceData.musicServices,
      filterText: '',
      filters: []
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
    },
    getAlbums: function () {
      this.albums = sourceData.albums
    }
  },
  mounted () {
    this.getAlbums()
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
}
</style>
