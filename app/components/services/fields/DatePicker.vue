<template>

<DatePicker class="main-form-contents-field" :date="props.options.date" :minDate="props.options.minDate" :maxDate="props.options.maxDate" v-model="selectedDate" />

</template>

<script>

export default {
  props: [
    'props'
  ],
  data() {
    console.log('Date');
    console.log(this.props);
    if (this.props.options === undefined) {
      this.props.options = {};
    }
    return {
      selectedDate: this.props.options.date
    }
  }
}

</script>

<style lang="scss">



</style>