<template>
  <div class="row mx-auto pt-2">
    <img style="max-height: 250px;" :src="albumDetails.imageLink" />
  </div>
  <div class="mx-auto">
    <h3>{{ albumDetails.albumName }}</h3>
    <h4>{{ albumDetails.albumArtist }}</h4>
    <p>{{ $parent.$parent.epochToDate(albumDetails.publishedAt) }}</p>
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
