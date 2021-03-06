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
import NavBar from './NavBar.vue'

export default {
  components: {
    AlbumCard,
    NavBar
  },
  props: ['albums', 'musicServices'],
  data: function () {
    return {
      startWeek: 1,
      endWeek: 52,
      minYear: 1950,
      maxYear: 2022,
      dateRange: null,
      filterText: '',
      filters: []
    }
  },
  methods: {
    generatedLink: function (link) {
      return '<a href="' + link.url + '" target="_blank"><img class="img-fluid img-max" src="' + this.musicServices.find(x => x.id === link.musicServiceId).imgSrc + '" /></a>'
    },
    setStartWeek: function (startWeek) {
      this.startWeek = startWeek
    },
    setEndWeek: function (endWeek) {
      this.endWeek = endWeek
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
      let startWeekSeconds = null
      let endWeekSeconds = null
      if (this.dateRange) {
        startDate = this.dateRange[0].getTime() / 1000
        endDate = this.dateRange[1].getTime() / 1000
      }
      if (this.filters.includes('dateAdded') && this.dateRange) {
        filteredAlbums = filteredAlbums
          .filter(x => x.publishedAt >= startDate && x.publishedAt <= endDate)
      }
      if (this.filters.includes('weekAdded')) {
        const initialAlbumDate = 1641081600
        startWeekSeconds = (this.startWeek - 1) * 604800
        endWeekSeconds = (this.endWeek - 1) * 604800
        filteredAlbums = filteredAlbums
          .filter(x => x.publishedAt >= (initialAlbumDate + startWeekSeconds) && x.publishedAt <= (initialAlbumDate + endWeekSeconds))
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
