<template>
  <div class="row mx-auto pt-2">
    <router-link :to="{name: 'Albums', params: {id: albumDetails.id }} "><img class="albumImage" :src="albumDetails.imageLink" /></router-link>
  </div>
  <vote-buttons class="d-none d-sm-flex mt-3" :album="albumDetails" @albumVote="albumVote"></vote-buttons>
  <div class="mx-auto mb-2" style="line-height: 16px">
    <h3>{{ albumDetails.albumName }}</h3>
    <h4>{{ albumDetails.albumArtist }}</h4>
    <router-link :to="{name: 'Albums', params: {id: albumDetails.id }}" tag="button" class="btn btn-outline-secondary">Details</router-link>
  </div>
  <!-- <div class="row d-flex flex-wrap align-items-center pb-2">
    <div v-for="link, key in albumDetails.links" :key="key" class="col">
      <div v-html="$parent.$parent.generatedLink(link)"></div>
    </div>
  </div> -->
</template>

<script>
import axios from 'axios'
import VoteButtons from './VoteButtons.vue'

export default {
  props: ['albumDetails'],
  components: {
    VoteButtons
  },
  methods: {
    albumVote: function (value) {
      let vote = ''
      if (value === 1) {
        vote = 'upvote'
      } else {
        vote = 'downvote'
      }
      axios.post('http://localhost:5000/' + vote, null, {
        params: {
          album_id: this.albumDetails.id
        }
      })
    }
  }
}
</script>

<style scoped>
  @media (max-width: 991px) {
    h3 {
      font-size: 3vw;
    }
    h4 {
      font-size: 2vw;
    }
  }
  .albumImage {
    max-width: 90%;
    border-radius: 15px;
  }
</style>
