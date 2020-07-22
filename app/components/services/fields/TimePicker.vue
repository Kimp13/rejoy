<template>

<TimePicker class="main-form-contents-field" :minuteInterval="props.options.minuteInterval" v-model="selectedTime" />

</template>

<script>

export default {
  props: [
    'props'
  ],
  data() {
    console.log('Time');
    console.log(this.props);
    if (this.props.options === undefined) {
      this.props.options = {};
    }
    return {
      selectedTime: this.props.options.time
    }
  }
}

</script>

<style lang="scss">



</style>