<template>
  <nav-bar
    :showFilters="Boolean(true)"
    @setStartWeek="setStartWeek"
    @setEndWeek="setEndWeek"
    @setMinYear="setMinYear"
    @setMaxYear="setMaxYear"
    @setFilters="setFilters"
    @setFilterText="setFilterText"
    @setDateRange="setDateRange">
  </nav-bar>
  <div class ="container">
    <h1>Albums 2022</h1>
    <transition-group
      tag="div"
      class="row"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div v-for="album in filteredAlbums" :key="album.id" class="card col-4 mt-2 mb-2">
        <album-card :albumDetails="album"/>
      </div>
    </transition-group>
  </div>
</template>

<script>
import AlbumCard from './AlbumCard.vue'
import NavBar from './utils/NavBar.vue'
import store from '@/store/albums-state.js'

export default {
  components: {
    AlbumCard,
    NavBar
  },
  props: ['albums', 'musicServices'],
  methods: {
    generatedLink: function (link) {
      return '<a href="' + link.url + '" target="_blank"><img class="img-fluid img-max" src="' + this.musicServices.find(x => x.musicServiceName === link.musicServiceName).imgSrc + '" /></a>'
    }
  },
  computed: {
    filteredAlbums: function () {
      return store.getters.filteredAlbums
    }
  }
}
</script>

<style scoped>
  .animate__animated {
    animation-duration: 0.3s;
  }
  @media (max-width: 2000px) {
    /* For mobile phones: */
    [class*="col-"] {
      width: 30.3333333333%;
      padding-left: 1.5%;
      padding-right: 1.5%;
      margin: auto
    }
  }
  @media (max-width: 1200px) {
    *, *::before, *::after {
      box-sizing: content-box;
    }
  }
</style>
