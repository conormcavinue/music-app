import AlbumList from '@/components/AlbumList.vue'
import AlbumDetails from '@/components/AlbumDetails.vue'
import PageNotFound from '@/components/PageNotFound.vue'
import { createRouter, createWebHistory } from 'vue-router'
import sourceData from '@/data.json'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: AlbumList
  },
  {
    path: '/albums/:id',
    name: 'Albums',
    component: AlbumDetails,
    props: true,
    beforeEnter (to, from, next) {
      const albumExists = sourceData.albums.find(album => album.id === to.params.id)
      if (albumExists) {
        return next()
      } else {
        next({
          name: 'notFound',
          params: { pathMatch: to.path.substring(1).split('/') }
        })
      }
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: PageNotFound
  }
]

export default createRouter({
  history: createWebHistory(),
  routes: routes
})
