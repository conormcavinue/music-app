<template>
  <div class="row mx-auto pt-2">
    <router-link :to="{name: 'Albums', params: {id: albumDetails.id }} "><img class="albumImage" :src="albumDetails.imageLink" /></router-link>
  </div>
  <vote-buttons class="d-none d-sm-flex mt-3" :album="albumDetails"></vote-buttons>
  <div class="mx-auto mb-2" style="line-height: 16px">
    <h3>{{ albumDetails.albumName }}</h3>
    <h4>{{ albumDetails.albumArtist }}</h4>
    <router-link :to="{name: 'Albums', params: {id: albumDetails.id}}" tag="button" class="btn btn-outline-secondary">Details</router-link>
  </div>
  <music-service-links :albumDetails="albumDetails"/>
</template>

<script>
import VoteButtons from './VoteButtons.vue'
import MusicServiceLinks from './MusicServiceLinks.vue'

export default {
  props: ['albumDetails'],
  components: {
    VoteButtons,
    MusicServiceLinks
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
