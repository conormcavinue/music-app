<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light flex-wrap">
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
    <transition
      class="align-items-center pb-3"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut">
      <div class="container" v-if="filters.includes('releaseYear')">
        <div class="mb-3 mx-auto min-half-width">
            <h4>Albums Released Between</h4>
            <input type="text" id="formMin" class="form-control mx-2 text-center"
                    style="width:70px; display:inline;" v-model="minYear"> -
            <input type="text" id="formMax" class="form-control mx-2 text-center"
                    style="width:70px; display:inline;" v-model="maxYear">
            <double-range-slider :minYear="minYear" :maxYear="maxYear" @update:minYear="value => minYear = value" @update:maxYear="value => maxYear = value"></double-range-slider>
        </div>
      </div>
    </transition>
    <transition
      class="align-items-center pb-3"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut">
      <div class="container" v-if="filters.includes('dateAdded')">
        <div class="mb-3 mx-auto min-quarter-width">
            <h4>Select Date Range</h4>
            <datepicker
              v-model="dateRange"
              format="dd/MM/yyyy"
              :enableTimePicker="false"
              :minDate="new Date(2022, 0, 1)"
              :maxDate="new Date()"
              range twoCalendars autoApply></datepicker>
        </div>
      </div>
    </transition>
  </nav>
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
import DoubleRangeSlider from '@/components/DoubleRangeSlider.vue'

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
    DoubleRangeSlider
  },
  methods: {
    albumVote: function (value, albumId) {
      const albumIndex = this.albums.findIndex(x => x.id === albumId)
      this.albums[albumIndex].albumVote += value
    },
    getAlbums: function () {
      this.albums = sourceData.albums
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
  animation-duration: 0.3s;
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
