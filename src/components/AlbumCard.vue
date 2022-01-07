<template>
  <div class="row mx-auto pt-2">
    <img style="height: 250px;" :src="albumDetails.imageLink" />
  </div>
  <div class="mx-auto">
    <h3>{{ albumDetails.albumName }}</h3>
    <h4>{{ albumDetails.albumArtist }}</h4>
    <p>{{ $parent.$parent.epochToDate(albumDetails.publishedAt) }}</p>
  </div>
  <div class="row mb-2">
    <div class="col-md-6">
      <font-awesome-icon @click="$parent.$parent.$emit('albumVote', -1, albumDetails.id)" class="thumbsDownClass" :icon="thumbsDownIcon" size="2x" />
    </div>
    <div class="col-md-6">
      <font-awesome-icon @click="$parent.$parent.$emit('albumVote', 1, albumDetails.id)" class="thumbsUpClass" :icon="thumbsUpIcon" size="2x" />
    </div>
  </div>
  <div class="row mx-auto pb-2">
    <div v-for="link, key in albumDetails.links" :key="key" class="col-md-6">
      <div v-html="$parent.$parent.generatedLink(link)"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['albumDetails'],
  computed: {
    thumbsDownIcon: function () {
      return this.albumDetails.albumVote === -1 ? ['fas', 'thumbs-down'] : ['far', 'thumbs-down']
    },
    thumbsUpIcon: function () {
      return this.albumDetails.albumVote === 1 ? ['fas', 'thumbs-up'] : ['far', 'thumbs-up']
    }
  }
}
</script>

<style scoped>
  .thumbsDownClass {
    color: red
  }

  .thumbsUpClass {
    color: green
  }

  .thumbsDownClass:hover, .thumbsUpClass:hover {
    cursor: pointer
  }
</style>
