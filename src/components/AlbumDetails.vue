<template>
  <nav-bar></nav-bar>
  <div class="card mx-auto mt-3 mb-2">
    <div class="card-header mb-3">
      <h1>{{ album.albumName }}</h1>
    </div>
    <div class="row mb-3">
      <div class="col-md-12">
        <img :src="album.imageLink" class="img-width"/>
      </div>
    </div>
    <div>
      <h4>Artist</h4>
      <p class="mx-auto">{{ album.albumArtist }}</p>
      <h4>Release Year</h4>
      <p class="mx-auto">{{ album.releaseYear }}</p>
      <h4>Date Added</h4>
      <p class="mx-auto">{{ epochToDate(album.publishedAt) }}</p>
    </div>
  <vote-buttons :album="album"/>
  </div>
</template>

<script>
import sourceData from '@/data.json'
import NavBar from '@/components/NavBar.vue'
import VoteButtons from '@/components/VoteButtons.vue'

export default {
  props: {
    id: {
      required: true,
      type: String
    }
  },
  components: {
    NavBar,
    VoteButtons
  },
  data: function () {
    return {
      albums: []
    }
  },
  computed: {
    album () {
      return this.albums.find(x => x.id === this.id)
    }
  },
  methods: {
    getAlbums: function () {
      this.albums = sourceData.albums
    }
  },
  beforeMount: function () {
    this.getAlbums()
  }

}
</script>

<style scoped>
  .card {
    max-width: 40%
  }
  .img-width {
    width: 80%
  }
</style>
