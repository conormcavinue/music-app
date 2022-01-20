<template>
  <div class="row mx-auto pt-2">
    <router-link :to="{name: 'Albums', params: {id: albumDetails.id }} "><img style="max-width: 90%;" :src="albumDetails.imageLink" /></router-link>
  </div>
  <div class="mx-auto">
    <h3>{{ albumDetails.albumName }}</h3>
    <h4>{{ albumDetails.albumArtist }}</h4>
    <router-link :to="{name: 'Albums', params: {id: albumDetails.id }}" tag="button" class="btn btn-outline-secondary">Details</router-link>
  </div>
  <vote-buttons :album="albumDetails"></vote-buttons>
  <div class="row mx-auto pb-2">
    <div v-for="link, key in albumDetails.links" :key="key" class="col">
      <div v-html="$parent.$parent.generatedLink(link)"></div>
    </div>
  </div>
</template>

<script>
import VoteButtons from './VoteButtons.vue'

export default {
  props: ['albumDetails'],
  components: {
    VoteButtons
  }
}
</script>

<style scoped>

</style>
