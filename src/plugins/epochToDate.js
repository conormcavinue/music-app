import moment from 'moment'

export default {
  install: (app, options) => {
    app.config.globalProperties.epochToDate = (date) => {
      const epochDate = new Date(date * 1000)
      return moment(epochDate).format('MMMM Do')
    }
  }
}
