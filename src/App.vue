<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div v-for="linkImg, key  in linkImages" :key="key">
    <img :src="linkImg.imgSrc" />
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
          links: [],
          releaseYear: 2016,
          publishedAt: '2022-02-02'
        }
      ],
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
      linkImages: [
        {
          id: 'il1',
          imgSrc: './assets/spotify.png'
        },
        {
          id: 'il2',
          imgSrc: './assets/youtube.png'
        }
      ]
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
