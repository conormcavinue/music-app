<template>
    <div class ="container">
        <div class="align-items-center">
            <label for="formMax">Albums Released Before</label>
            <input type="text" id="formMax" class="form-control mx-2 text-center"
                    style="width:70px;" v-model="maxYear">
            <input type="range" class="custom-range" min="1950" max="2022" v-model="maxYear">
            <input type="text" id="filterText" class="form-control mx-2 text-center"
                    style="width:50%;" placeholder="Search for an Album or Artist" v-model="filterText">
        </div>
        <div class="row">
            <div v-for="album in albumsReleasedBeforeYear" :key="album.id" class="card d-flex col-sm-12 col-md-3 mx-1 mt-3">
              <album-card
                :albumDetails="album"
              />
          </div>
      </div>
    </div>
</template>

<script>
import moment from 'moment'
import AlbumCard from './AlbumCard.vue'

export default {
  components: {
    AlbumCard
  },
  props: ['albums', 'musicServices'],
  data: function () {
    return {
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
    albumsReleasedBeforeYear: function () {
      let filteredAlbums = this.albums
      if (this.filterText !== '') {
        filteredAlbums = this.albums.filter(
          x => x.albumName.toLowerCase().includes(this.filterText.toLowerCase()) ||
          x.albumArtist.toLowerCase().includes(this.filterText.toLowerCase())
        )
      }
      return filteredAlbums.filter(x => x.releaseYear <= this.maxYear)
    }
  }
}
</script>

<style scoped>

</style>
