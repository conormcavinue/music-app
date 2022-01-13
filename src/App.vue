<template>
  <nav-bar
    @setFilters="setFilters"
    @setFilterText="setFilterText"
    @setDateRange="setDateRange"
    @setMinYear="setMinYear"
    @setMaxYear="setMaxYear">
  </nav-bar>
  <div class ="container">
    <album-list
      :albums="filteredAlbums"
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
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'App',
  data: function () {
    return {
      minYear: 1950,
      maxYear: 2022,
      dateRange: null,
      albums: [],
      musicServices: sourceData.musicServices,
      filterText: '',
      filters: []
    }
  },
  components: {
    AlbumList,
    NavBar
  },
  methods: {
    albumVote: function (value, albumId) {
      const albumIndex = this.albums.findIndex(x => x.id === albumId)
      this.albums[albumIndex].albumVote += value
    },
    getAlbums: function () {
      this.albums = sourceData.albums
    },
    setFilters: function (filters) {
      this.filters = filters
    },
    setFilterText: function (filterText) {
      this.filterText = filterText
    },
    setDateRange: function (dateRange) {
      this.dateRange = dateRange
    },
    setMinYear: function (minYear) {
      this.minYear = minYear
    },
    setMaxYear: function (maxYear) {
      this.maxYear = maxYear
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
    }
  },
  mounted () {
    this.getAlbums()
  }
}
</script>

<style>
.animate__animated {
  animation-duration: 2s;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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
