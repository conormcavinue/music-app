<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light flex-wrap">
    <div class="container">
      <router-link class="navbar-brand" :to="`/`">Music 2022</router-link>
      <button v-if="showFilters" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent" v-if="showFilters">
        <ul :class="filterDropdownClass">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Filters
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <input type="checkbox" id="releaseYearFilter" value="releaseYear" v-model="filters">
                <label for="releaseYearFilter">Release Year</label>
              </li>
              <li>
                <input type="checkbox" id="weekAddedFilter" value="weekAdded" v-model="filters">
                <label for="weekAddedFilter">Week Added</label>
              </li>
              <li>
                <input type="checkbox" id="dateAddedFilter" value="dateAdded" v-model="filters">
                <label for="dateAddedFilter">Date Added</label>
              </li>
            </ul>
          </li>
        </ul>
        <button v-if="filters && filters.length" @click="clearFilters()" class="btn btn-outline-danger mr-auto ml-1">Clear Filters</button>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="filterText">
        </form>
      </div>
    </div>
    <transition
      class="align-items-center pb-3"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut">
      <div class="container" v-if="filters && filters.includes('releaseYear')">
        <div class="mb-3 mx-auto min-half-width">
            <h4>Albums Released Between</h4>
            <input type="text" id="formMin" class="form-control mx-2 text-center"
                    style="width:70px; display:inline;" v-model="minYear"> -
            <input type="text" id="formMax" class="form-control mx-2 text-center"
                    style="width:70px; display:inline;" v-model="maxYear">
            <double-range-slider id="dateSlider" :minThreshold="Number(1950)" :maxThreshold="Number(2022)" :min="Number(minYear)" :max="Number(maxYear)" @update:min="value => minYear = value" @update:max="value => maxYear = value"></double-range-slider>
        </div>
      </div>
    </transition>
    <transition
      class="align-items-center pb-3"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut">
      <div class="container" v-if="filters && filters.includes('weekAdded')">
        <div class="mb-3 mx-auto min-half-width">
            <h4>Week Added</h4>
            <input type="text" id="formMin" class="form-control mx-2 text-center"
                    style="width:70px; display:inline;" v-model="startWeek"> -
            <input type="text" id="formMax" class="form-control mx-2 text-center"
                    style="width:70px; display:inline;" v-model="endWeek">
            <double-range-slider id="weekSlider" :minThreshold="Number(1)" :maxThreshold="currentWeek()" :min="Number(startWeek)" :max="Number(endWeek)" @update:min="value => startWeek = value" @update:max="value => endWeek = value"></double-range-slider>
        </div>
      </div>
    </transition>
    <transition
      class="align-items-center pb-3"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut">
      <div class="container" v-if="filters && filters.includes('dateAdded')">
        <div class="mb-3 mx-auto min-quarter-width">
            <h4>Date Added: Select Date Range</h4>
            <datepicker
              v-model="dateRange"
              format="dd/MM/yyyy"
              :enableTimePicker="false"
              :minDate="new Date(2022, 0, 1)"
              :maxDate="new Date()"
              range twoCalendars autoApply></datepicker>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script>
import DoubleRangeSlider from '@/components/utils/DoubleRangeSlider.vue'
import store from '@/store/albums-state.js'

export default {
  props: ['showFilters'],
  data: function () {
    return {
      filters: []
    }
  },
  components: {
    DoubleRangeSlider
  },
  methods: {
    clearFilters: function () {
      this.filters = []
      this.minYear = 1950
      this.maxYear = 2022
      this.dateRange = null
    },
    currentWeek: function () {
      const date = new Date()
      date.setHours(0, 0, 0, 0)
      date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7)
      var week1 = new Date(date.getFullYear(), 0, 4)
      return Number(1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7))
    }
  },
  computed: {
    filterDropdownClass: function () {
      return store.getters.stateFilters && store.getters.stateFilters.length ? 'navbar-nav' : 'navbar-nav mr-auto'
    },
    filterText: {
      get () {
        return store.getters.stateFilterText
      },
      set (value) {
        store.commit('setFilterText', value)
      }
    },
    startWeek: {
      get () {
        return store.getters.stateStartWeek
      },
      set (value) {
        store.commit('setStartWeek', value)
      }
    },
    endWeek: {
      get () {
        return store.getters.stateEndWeek
      },
      set (value) {
        store.commit('setEndWeek', value)
      }
    },
    minYear: {
      get () {
        return store.getters.stateMinYear
      },
      set (value) {
        store.commit('setMinYear', value)
      }
    },
    maxYear: {
      get () {
        return store.getters.stateMaxYear
      },
      set (value) {
        store.commit('setMaxYear', value)
      }
    },
    dateRange: {
      get () {
        return store.getters.stateDateRange
      },
      set (value) {
        store.commit('setDateRange', value)
      }
    }
  },
  watch: {
    filters (newVal, oldVal) {
      if (newVal !== oldVal) {
        store.commit('setFilters', this.filters)
      }
    },
    filterText (newVal, oldVal) {
      if (newVal !== oldVal) {
        store.commit('setFilterText', this.filterText)
      }
    }
  }
}
</script>

<style scoped>
  .animate__animated {
    animation-duration: 0.3s;
  }
  .animate__fadeOut {
    animation-duration: 0.1s;
  }
</style>
