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
import axios from 'axios'
import store from '@/store/albums-state.js'

export default {
  props: ['album'],
  methods: {
    updateAlbums: function () {
      store.dispatch('updateAlbums')
    },
    voteAlbum: function (value) {
      if (this.album.currentVote === -1) {
        this.albumVote(2, 1)
      } else if (this.album.currentVote === 1) {
        this.albumVote(-2, -1)
      } else {
        this.albumVote(value, value)
      }
    },
    albumVote: function (value, vote) {
      axios.post('http://localhost:83/vote', null, {
        params: {
          album_id: this.album.id,
          value: value
        }
      })
        .then(
          store.commit('voteAlbum', { albumId: this.album.id, vote: vote })
        )
        .then(
          setTimeout(function () {
            this.updateAlbums()
          }.bind(this), 200)
        )
    }
  },
  computed: {
    thumbsDownIcon: function () {
      return store.getters.allAlbums.find(a => a.id === this.album.id).currentVote === -1 ? ['fas', 'thumbs-down'] : ['far', 'thumbs-down']
    },
    thumbsUpIcon: function () {
      return store.getters.allAlbums.find(a => a.id === this.album.id).currentVote === 1 ? ['fas', 'thumbs-up'] : ['far', 'thumbs-up']
    },
    thumbsDownClass: function () {
      return 'thumbsDownClassColour ' + (store.getters.allAlbums.find(a => a.id === this.album.id).currentVote !== -1 ? 'enabled' : 'disabled')
    },
    thumbsUpClass: function () {
      return 'thumbsUpClassColour ' + (store.getters.allAlbums.find(a => a.id === this.album.id).currentVote !== 1 ? 'enabled' : 'disabled')
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
