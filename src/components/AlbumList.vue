<template>
  <div class="bg-light">
    <transition
     class="align-items-center pb-3"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut">
      <div v-if="filters.includes('releaseYear')">
          <h4>Albums Released Between</h4>
          <input type="text" id="formMin" class="form-control mx-2 text-center"
                  style="width:70px; display:inline;" v-model="minYear"> -
          <input type="text" id="formMax" class="form-control mx-2 text-center"
                  style="width:70px; display:inline;" v-model="maxYear">
          <double-range-slider :minYear="minYear" :maxYear="maxYear" @update:minYear="value => minYear = value" @update:maxYear="value => maxYear = value"></double-range-slider>
      </div>
    </transition>
    <transition
      class="pb-3 row"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut">
      <div v-if="filters.includes('dateAdded')">
          <h4>Select Date Range</h4>
          <datepicker
            class="col-md-4 col-sm-12"
            v-model="dateRange"
            format="dd/MM/yyyy"
            :enableTimePicker="false"
            :minDate="new Date(2022, 0, 1)"
            :maxDate="new Date()"
            range twoCalendars autoApply></datepicker>
      </div>
    </transition>
  </div>
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
</template>

<script>
import moment from 'moment'
import AlbumCard from './AlbumCard.vue'
import DoubleRangeSlider from './DoubleRangeSlider.vue'

export default {
  components: {
    AlbumCard,
    DoubleRangeSlider
  },
  props: ['albums', 'musicServices', 'filterText', 'filters'],
  data: function () {
    return {
      minYear: 1950,
      maxYear: 2022,
      dateRange: null
    }
  },
  methods: {
    generatedLink: function (link) {
      return '<a href="' + link.url + '" target="_blank"><img height="50px" width="50px" src="' + this.musicServices.find(x => x.id === link.musicServiceId).imgSrc + '" /></a>'
    },
    epochToDate: function (date) {
      const epochDate = new Date(date * 1000)
      return moment(epochDate).format('MMMM Do')
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
