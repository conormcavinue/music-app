<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light flex-wrap">
    <div class="container">
      <a class="navbar-brand" href="#">Music 2022</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
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
                <input type="checkbox" id="dateAddedFilter" value="dateAdded" v-model="filters">
                <label for="dateAddedFilter">Date Added</label>
              </li>
            </ul>
          </li>
        </ul>
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
            <double-range-slider :minYear="Number(minYear)" :maxYear="Number(maxYear)" @update:minYear="value => minYear = value" @update:maxYear="value => maxYear = value"></double-range-slider>
        </div>
      </div>
    </transition>
    <transition
      class="align-items-center pb-3"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut">
      <div class="container" v-if="filters.includes('dateAdded')">
        <div class="mb-3 mx-auto min-quarter-width">
            <h4>Select Date Range</h4>
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
import DoubleRangeSlider from '@/components/DoubleRangeSlider.vue'

export default {
  data: function () {
    return {
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
  watch: {
    filters (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$parent.$emit('setFilters', this.filters)
      }
    },
    filterText (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$parent.$emit('setFilterText', this.filterText)
      }
    },
    dateRange (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$parent.$emit('setDateRange', this.dateRange)
      }
    },
    minYear (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$parent.$emit('setMinYear', this.minYear)
      }
    },
    maxYear (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$parent.$emit('setMaxYear', this.maxYear)
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
