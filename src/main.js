import { createApp } from 'vue'
import App from './App.vue'
import AlbumList from '@/components/AlbumList.vue'
import * as VueRouter from 'vue-router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'animate.css/animate.css'
import 'vue3-date-time-picker/dist/main.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import DatePicker from 'vue3-date-time-picker'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fas)
library.add(fab)
library.add(far)

const routes = [
  {
    path: '/',
    component: AlbumList
  }
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: routes
})

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .component('datepicker', DatePicker)
  .use(router)
  .mount('#app')
