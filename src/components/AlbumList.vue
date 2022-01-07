<template>
    <div class ="container">
        <div class="align-items-center">
            <label for="formMax">Albums Released Before</label>
            <input type="text" id="formMax" class="form-control mx-2 text-center"
                    style="width:60px;" v-model="maxYear">
            <input type="range" class="custom-range" min="1950" max="2022" v-model="maxYear">
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
      maxYear: 2022
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
      return this.albums.filter(x => x.releaseYear <= this.maxYear)
    },
    thumbsDownIcon: function () {
      return albumId => {
        return this.albums.find(x => x.id === `${albumId}`).albumVote === -1 ? ['fas', 'thumbs-down'] : ['far', 'thumbs-down']
      }
    },
    thumbsUpIcon: function () {
      return albumId => {
        return this.albums.find(x => x.id === `${albumId}`).albumVote === 1 ? ['fas', 'thumbs-up'] : ['far', 'thumbs-up']
      }
    }
  }
}
</script>

<style scoped>

</style>
