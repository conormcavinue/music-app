<template>
  <span>
    {{ formattedDate(timestamp) }}
  </span>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    timestamp: {
      required: true,
      type: Number
    }
  },
  methods: {
    formattedDate: (timestamp) => {
      const epochDate = new Date(timestamp * 1000)
      return moment(epochDate).format('MMMM Do')
    }
  }
}
</script>

<style scoped>

</style>
