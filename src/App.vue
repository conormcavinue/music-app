<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div v-for="album, key in albums" :key="key" class="card d-flex">
    <div class="row">
      <div class="col-md-6" v-for="link, key in album.links" :key="key">
        <div v-html="generatedLink(link)"></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data: function () {
    return {
      albums: [
        {
          id: 'a1',
          albumName: 'This is an album',
          links: [
            {
              id: 'l2',
              imageLinkId: 'il1',
              url: 'https://open.spotify.com/album/6RrfC1hxrS4ANiOQPTtCs3?si=3G_fYCvNSlqx3GcwQoXJAg',
              albumId: 'a1'
            },
            {
              id: 'l2',
              imageLinkId: 'il2',
              url: 'https://music.youtube.com/playlist?list=OLAK5uy_mL_qvbSjM2WJoav8nnwlrEgBrG3PLnWTo&feature=share',
              albumId: 'a1'
            }
          ],
          releaseYear: 2016,
          publishedAt: '2022-02-02'
        }
      ],
      musicServices: [
        {
          id: 'il1',
          serviceName: 'Spotify',
          imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Spotify_icon.png'
        },
        {
          id: 'il2',
          serviceName: 'Youtube Music',
          imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/159px-YouTube_full-color_icon_%282017%29.svg.png'
        }
      ]
    }
  },
  methods: {
    generatedLink: function (link) {
      return '<a href="' + link.url + '" target="_blank"><img src="' + this.musicServices.find(x => x.id === link.imageLinkId).imgSrc + '" /></a>'
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
