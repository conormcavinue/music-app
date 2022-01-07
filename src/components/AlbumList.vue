<template>
    <div class ="container">
        <div class="align-items-center">
            <label for="formMax">Albums Released Between</label>
            <input type="text" id="formMin" class="form-control mx-2 text-center"
                    style="width:70px; display:inline;" v-model="minYear"> -
            <input type="text" id="formMax" class="form-control mx-2 text-center"
                    style="width:70px; display:inline;" v-model="maxYear">
            <double-range-slider :minYear="minYear" :maxYear="maxYear" @update:minYear="value => minYear = value" @update:maxYear="value => maxYear = value"></double-range-slider>
            <input type="text" id="filterText" class="form-control mx-auto text-center"
                    style="width:50%;" placeholder="Search for an Album or Artist" v-model="filterText">
        </div>
          <transition-group
            tag="div"
            class="row"
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
          >
            <div v-for="album in filteredAlbums" :key="album.id" class="card d-flex col-sm-12 col-md-3 mx-1 mt-3">
              <album-card
                :albumDetails="album"
              />
            </div>
          </transition-group>
    </div>
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
  props: ['albums', 'musicServices'],
  data: function () {
    return {
      minYear: 1950,
      maxYear: 2022,
      filterText: ''
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
      if (this.filterText !== '') {
        filteredAlbums = this.albums.filter(
          x => x.albumName.toLowerCase().includes(this.filterText.toLowerCase()) ||
          x.albumArtist.toLowerCase().includes(this.filterText.toLowerCase())
        )
      }
      return filteredAlbums.filter(x => x.releaseYear >= this.minYear && x.releaseYear <= this.maxYear)
    }
  }
}
</script>

<style scoped>
  .animate__animated {
    animation-duration: 0.3s;
  }
</style>
