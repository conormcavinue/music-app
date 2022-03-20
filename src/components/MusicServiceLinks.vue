<template>
  <div class="row d-flex flex-wrap align-items-center pb-2">
    <div v-for="link, key in albumDetails.links" :key="key" class="col">
      <a :href="link.url" target="_blank"><img class="img-fluid img-max" :src="linkImage(key)" /></a>
    </div>
  </div>
</template>

<script>
import store from '@/store/albums-state.js'

export default {
  props: ['albumDetails'],
  methods: {
    linkImage: function (key) {
      const musicServices = store.getters.allMusicServices
      return musicServices.find(x => x.musicServiceName === this.albumDetails.links[key].musicServiceName).imgSrc
    }
  }
}
</script>

<style scoped>

</style>
