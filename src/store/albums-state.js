import { createStore } from 'vuex'

import axios from 'axios'

const currentWeek = function () {
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7)
  var week1 = new Date(date.getFullYear(), 0, 4)
  return Number(1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7))
}

const store = createStore({
  state: { // data
    albums: [],
    musicServices: [],
    startWeek: 1,
    endWeek: currentWeek(),
    minYear: 1950,
    maxYear: 2022,
    dateRange: null,
    filterText: '',
    filters: []
  },
  getters: { // computed properties
    filteredAlbums (state, getters) {
      let albums = state.albums
      let startDate = null
      let endDate = null
      let startWeekSeconds = null
      let endWeekSeconds = null
      if (state.dateRange) {
        startDate = state.dateRange[0].getTime() / 1000
        endDate = state.dateRange[1].getTime() / 1000
      }
      if (state.filters.includes('dateAdded') && state.dateRange) {
        albums = albums
          .filter(x => x.publishedAt >= startDate && x.publishedAt <= endDate)
      }
      if (state.filters.includes('weekAdded')) {
        const initialAlbumDate = 1641081600
        startWeekSeconds = (state.startWeek - 1) * 604800
        endWeekSeconds = (state.endWeek - 1) * 604800
        albums = albums
          .filter(x => x.publishedAt >= (initialAlbumDate + startWeekSeconds) && x.publishedAt <= (initialAlbumDate + endWeekSeconds))
      }
      if (state.filterText !== '') {
        albums = albums.filter(
          x => x.albumName.toLowerCase().includes(state.filterText.toLowerCase()) ||
          x.albumArtist.toLowerCase().includes(state.filterText.toLowerCase())
        )
      }
      return albums
        .filter(x => x.releaseYear >= state.minYear && x.releaseYear <= state.maxYear)
        .filter(x => x.publishedAt <= new Date().getTime() / 1000)
        .sort((x, y) => (x.publishedAt < y.publishedAt) ? 1 : -1)
    },
    allAlbums (state, getters) {
      return state.albums
    },
    allMusicServices (state, getters) {
      return state.musicServices
    },
    stateFilters (state, getters) {
      return state.filters
    },
    stateFilterText (state, getters) {
      return state.filterText
    },
    stateStartWeek (state, getters) {
      return state.startWeek
    },
    stateEndWeek (state, getters) {
      return state.endWeek
    },
    stateMinYear (state, getters) {
      return state.minYear
    },
    stateMaxYear (state, getters) {
      return state.maxYear
    },
    stateDateRange (state, getters) {
      return state.dateRange
    }
  },
  actions: { // methods
    fetchAlbums ({ commit }) {
      axios.get('http://localhost:83/albums')
        .then(response => {
          commit('setAlbums', response.data)
        })
    },
    updateAlbums ({ commit }) {
      axios.get('http://localhost:83/albums')
        .then(response => {
          commit('updateAlbumVotes', response.data)
        })
    },
    fetchMusicServices ({ commit }) {
      axios.get('http://localhost:83/music_services')
        .then(response => {
          commit('setMusicServices', response.data)
        })
    }
  },
  mutations: { // set and update state
    updateAlbumVotes (state, albums) {
      for (const album in albums) {
        state.albums.find(a => a.id === albums[album].id).albumvote = albums[album].albumvote
      }
    },
    setAlbums (state, albums) {
      state.albums = albums
    },
    setMusicServices (state, musicServices) {
      state.musicServices = musicServices
    },
    setStartWeek (state, startWeek) {
      state.startWeek = startWeek
    },
    setEndWeek (state, endWeek) {
      state.endWeek = endWeek
    },
    setMinYear (state, minYear) {
      state.minYear = minYear
    },
    setMaxYear (state, maxYear) {
      state.maxYear = maxYear
    },
    setFilters (state, filters) {
      state.filters = filters
    },
    setFilterText (state, filterText) {
      state.filterText = filterText
    },
    setDateRange (state, dateRange) {
      state.dateRange = dateRange
    },
    voteAlbum (state, data) {
      state.albums.find(a => a.id === data.albumId).currentVote = data.vote
    }
  }
})

export default store
