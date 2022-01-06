<template>
    <div class ="container">
        <div class="align-items-center">
            <label for="formMax">Albums Released Before</label>
            <input type="text" id="formMax" class="form-control mx-2 text-center"
                    style="width:60px;" v-model="maxYear">
            <input type="range" class="custom-range" min="1950" max="2022" v-model="maxYear">
        </div>
        <div class="row">
            <div v-for="album, key in albumsReleasedBeforeYear" :key="key" class="card d-flex col-sm-12 col-md-3 mx-1 mt-3">
              <div class="row mx-auto pt-2">
                <img style="height: 250px;" :src="album.imageLink" />
              </div>
              <div class="mx-auto">
                <h3>{{ album.albumName }}</h3>
                <h4>{{ album.albumArtist }}</h4>
                <p>{{ epochToDate(album.publishedAt) }}</p>
              </div>
              <div class="row mb-2">
                <div class="col-md-6">
                  <font-awesome-icon @click="this.$emit('albumVote', -1, album.id)" :icon="thumbsDownIcon(album.id)" size="2x" />
                </div>
                <div class="col-md-6">
                  <font-awesome-icon @click="this.$emit('albumVote', 1, album.id)" :icon="thumbsUpIcon(album.id)" size="2x" />
                </div>
              </div>
              <div class="row mx-auto pb-2">
                <div v-for="link, key in album.links" :key="key" class="col-md-6">
                  <div v-html="generatedLink(link)"></div>
                </div>
              </div>
          </div>
      </div>
    </div>
</template>

<script>
import moment from 'moment'

export default {
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
