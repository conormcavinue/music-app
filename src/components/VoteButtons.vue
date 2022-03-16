<template>
  <div class="row mb-2">
    <div class="col">
      <font-awesome-icon @click="voteAlbum(-1)" :class="thumbsDownClass" :icon="thumbsDownIcon" size="2x" />
    </div>
    <div class="col">
      <font-awesome-icon @click="voteAlbum(1)" :class="thumbsUpClass" :icon="thumbsUpIcon" size="2x" />
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
      if (this.vote === -1) {
        this.$emit('albumVote', 2, this.album.id)
      } else if (this.vote === 1) {
        this.$emit('albumVote', -2, this.album.id)
      } else {
        this.$emit('albumVote', value, this.album.id)
      }
      this.vote = value
    }
  },
  computed: {
    thumbsDownIcon: function () {
      return this.vote === -1 ? ['fas', 'thumbs-down'] : ['far', 'thumbs-down']
    },
    thumbsUpIcon: function () {
      return this.vote === 1 ? ['fas', 'thumbs-up'] : ['far', 'thumbs-up']
    },
    thumbsDownClass: function () {
      return 'thumbsDownClassColour ' + (this.vote !== -1 ? 'enabled' : 'disabled')
    },
    thumbsUpClass: function () {
      return 'thumbsUpClassColour ' + (this.vote !== 1 ? 'enabled' : 'disabled')
    }
  }
}
</script>

<style scoped>
  .thumbsDownClassColour {
    color: red;
  }

  .thumbsUpClassColour {
    color: green;
  }

  .disabled {
    cursor: default;
    pointer-events: none;
  }

  .enabled {
    cursor: pointer;
    pointer-events: auto;
  }

  .thumbsDownClass:hover, .thumbsUpClass:hover {
    cursor: pointer
  }
</style>
