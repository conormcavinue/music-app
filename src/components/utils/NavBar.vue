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
        <button v-if="filters.length" @click="clearFilters()" class="btn btn-outline-danger mr-auto ml-1">Clear Filters</button>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="filterText">
        </form>
      </div>
    </div>
    <transition
      class="align-items-center pb-3"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut">
      <div class="container" v-if="filters.includes('releaseYear')">
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
      <div class="container" v-if="filters.includes('weekAdded')">
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
      <div class="container" v-if="filters.includes('dateAdded')">
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

export default {
  props: ['showFilters'],
  data: function () {
    return {
      startWeek: 1,
      endWeek: this.currentWeek(),
      minYear: 1950,
      maxYear: 2022,
      dateRange: null,
      filterText: '',
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
      return this.filters.length ? 'navbar-nav' : 'navbar-nav mr-auto'
    }
  },
  watch: {
    filters (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('setFilters', this.filters)
      }
    },
    filterText (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('setFilterText', this.filterText)
      }
    },
    dateRange (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('setDateRange', this.dateRange)
      }
    },
    startWeek (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('setStartWeek', this.startWeek)
      }
    },
    endWeek (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('setEndWeek', this.endWeek)
      }
    },
    minYear (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('setMinYear', this.minYear)
      }
    },
    maxYear (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('setMaxYear', this.maxYear)
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
