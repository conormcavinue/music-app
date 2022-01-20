<template>
  <nav-bar
    :showFilters="Boolean(true)"
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
      <div v-for="album in filteredAlbums" :key="album.id" class="card col-md-12 col-md-6 col-lg-4 mt-2 mb-2">
        <album-card :albumDetails="album"/>
      </div>
    </transition-group>
  </div>
</template>

<script>
import AlbumCard from './AlbumCard.vue'
import NavBar from './NavBar.vue'

export default {
  components: {
    AlbumCard,
    NavBar
  },
  props: ['albums', 'musicServices'],
  data: function () {
    return {
      minYear: 1950,
      maxYear: 2022,
      dateRange: null,
      filterText: '',
      filters: []
    }
  },
  methods: {
    generatedLink: function (link) {
      return '<a href="' + link.url + '" target="_blank"><img height="50px" width="50px" src="' + this.musicServices.find(x => x.id === link.musicServiceId).imgSrc + '" /></a>'
    },
    setMinYear: function (minYear) {
      this.minYear = minYear
    },
    setMaxYear: function (maxYear) {
      this.maxYear = maxYear
    },
    setFilters: function (filters) {
      this.filters = filters
    },
    setFilterText: function (filterText) {
      this.filterText = filterText
    },
    setDateRange: function (dateRange) {
      this.dateRange = dateRange
    }
  },
  computed: {
    filteredAlbums: function () {
      let filteredAlbums = this.albums
      let startDate = null
      let endDate = null
      if (this.dateRange) {
        startDate = this.dateRange[0].getTime() / 1000
        endDate = this.dateRange[1].getTime() / 1000
      }
      if (this.filters.includes('dateAdded') && this.dateRange) {
        filteredAlbums = filteredAlbums
          .filter(x => x.publishedAt >= startDate && x.publishedAt <= endDate)
      }
      if (this.filterText !== '') {
        filteredAlbums = filteredAlbums.filter(
          x => x.albumName.toLowerCase().includes(this.filterText.toLowerCase()) ||
          x.albumArtist.toLowerCase().includes(this.filterText.toLowerCase())
        )
      }
      return filteredAlbums
        .filter(x => x.releaseYear >= this.minYear && x.releaseYear <= this.maxYear)
        .filter(x => x.publishedAt <= new Date().getTime() / 1000)
        .sort((x, y) => (x.publishedAt < y.publishedAt) ? 1 : -1)
    }
  }
}
</script>

<style scoped>
  .animate__animated {
    animation-duration: 0.3s;
  }
  @media only screen and (max-width: 991px) {
    /* For mobile phones: */
    [class*="col-"] {
      width: 60%;
      margin: auto
    }
  }
  @media (max-width: 2000px) and (min-width: 992px) {
    /* For mobile phones: */
    [class*="col-"] {
      width: 30.3333333333%;
      padding-left: 1.5%;
      padding-right: 1.5%;
      margin: auto
    }
  }
</style>
