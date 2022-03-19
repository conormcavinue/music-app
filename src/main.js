import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'animate.css/animate.css'
import 'vue3-date-time-picker/dist/main.css'
import store from '@/store/albums-state.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import BaseDate from '@/components/utils/BaseDate.vue'
import DatePicker from 'vue3-date-time-picker'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fas)
library.add(fab)
library.add(far)

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .component('datepicker', DatePicker)
  .component('BaseDate', BaseDate)
  .use(router)
  .use(store)
  .mount('#app')
