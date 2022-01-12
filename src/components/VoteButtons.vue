<template>
  <div class="row mb-2">
    <div class="col">
      <font-awesome-icon @click="voteAlbum(-1)" class="thumbsDownClass" :icon="thumbsDownIcon" size="2x" />
    </div>
    <div class="col">
      <font-awesome-icon @click="voteAlbum(1)" class="thumbsUpClass" :icon="thumbsUpIcon" size="2x" />
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      vote: 0
    }
  },
  props: ['album'],
  methods: {
    voteAlbum: function (value) {
      this.$parent.$parent.$parent.$emit('albumVote', value, this.album.id)
      this.vote = value
    }
  },
  computed: {
    thumbsDownIcon: function () {
      return this.vote === -1 ? ['fas', 'thumbs-down'] : ['far', 'thumbs-down']
    },
    thumbsUpIcon: function () {
      return this.vote === 1 ? ['fas', 'thumbs-up'] : ['far', 'thumbs-up']
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
