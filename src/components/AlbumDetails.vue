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
    <div>
      <h4>Artist</h4>
      <p class="mx-auto">{{ album.albumArtist }}</p>
      <h4>Release Year</h4>
      <p class="mx-auto">{{ album.releaseYear }}</p>
      <h4>Date Added</h4>
      <p class="mx-auto">{{ epochToDate(album.publishedAt) }}</p>
      <h4>Album Score</h4>
      <p class="mx-auto">{{ album.albumvote }}</p>
    </div>
  <vote-buttons :album="album" @albumVote="albumVote"/>
  </div>
</template>

<script>
import axios from 'axios'
import NavBar from '@/components/utils/NavBar.vue'
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
      album: '',
      polling: null
    }
  },
  methods: {
    getAlbum: function () {
      axios.get('http://localhost:83/album/' + this.id)
        .then(response => {
          this.album = response.data
        })
    },
    albumVote: function (value) {
      axios.post('http://localhost:83/vote', null, {
        params: {
          album_id: this.album.id,
          value: value
        }
      })
        .then(
          setTimeout(function () {
            this.getAlbum()
          }.bind(this), 200)
        )
    },
    pollData: function () {
      this.polling = setInterval(() => {
        this.getAlbum()
      }, 3000)
    }
  },
  mounted: function () {
    this.getAlbum()
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
