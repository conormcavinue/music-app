<template>
  <nav-bar :showFilters="Boolean(false)"></nav-bar>
  <div class="card mx-auto mt-3 mb-2">
    <div class="card-header mb-3">
      <h1>{{ album.albumName }}</h1>
    </div>
    <div class="row mb-3">
      <div class="col-md-12">
        <img :src="album.imageLink" class="img-width"/>
      </div>
    </div>
    <music-service-links :albumDetails="album" />
    <div>
      <h4>Artist</h4>
      <p class="mx-auto">{{ album.albumArtist }}</p>
      <h4>Release Year</h4>
      <p class="mx-auto">{{ album.releaseYear }}</p>
      <h4>Date Added</h4>
      <p class="mx-auto"><base-date :timestamp="album.publishedAt" /></p>
      <h4>Album Score</h4>
      <p class="mx-auto">{{ album.albumvote }}</p>
    </div>
  <vote-buttons :album="album"/>
  </div>
</template>

<script>
import NavBar from '@/components/utils/NavBar.vue'
import VoteButtons from '@/components/VoteButtons.vue'
import store from '@/store/albums-state.js'
import MusicServiceLinks from '@/components/MusicServiceLinks'

export default {
  props: {
    id: {
      required: true,
      type: String
    }
  },
  components: {
    NavBar,
    VoteButtons,
    MusicServiceLinks
  },
  data: function () {
    return {
      polling: null
    }
  },
  methods: {
    pollData: function () {
      this.polling = setInterval(() => {
        store.dispatch('updateAlbums')
      }, 3000)
    }
  },
  computed: {
    album: function () {
      return store.getters.allAlbums.find(a => a.id === parseInt(this.id))
    }
  },
  created () {
    this.pollData()
  },
  beforeUnmount () {
    clearInterval(this.polling)
  }

}
</script>

<style scoped>
  @media only screen and (max-width: 991px) {
    /* For mobile phones: */
    .card {
      width: 80%;
      margin: auto
    }
  }
  @media (max-width: 2000px) and (min-width: 992px) {
    /* For mobile phones: */
    .card {
      max-width: 40%
    }
  }
  .img-width {
    width: 80%;
    border-radius: 15px;
  }
</style>
