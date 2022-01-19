import AlbumList from '@/components/AlbumList.vue'
import AlbumDetails from '@/components/AlbumDetails.vue'
import { createRouter, createWebHistory } from 'vue-router'

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
    props: true
  }
]

export default createRouter({
  history: createWebHistory(),
  routes: routes
})
