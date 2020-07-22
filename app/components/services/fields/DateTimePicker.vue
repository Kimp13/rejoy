<template>

  <StackLayout orientation="vertical">
    <DatePicker class="main-form-contents-field" :date="props.options.date" :minDate="props.options.minDate" :maxDate="props.options.maxDate" v-model="selectedDate" v-on:dateChange="changeHandler" />
    <TimePicker ref="time" class="main-form-contents-field" @loaded="timePickerLoadedHandler" :minuteInterval="props.options.minuteInterval" v-model="selectedTime" />
  </StackLayout>

</template>

<script>

export default {
  props: [
    'props'
  ],
  data() {
    if (this.props.options === undefined) {
      this.props.options = {};
    }
    return {
      selectedDate: this.props.options.date,
      selectedTime: this.props.options.time
    }
  },
  methods: {
    changeHandler(args) {
      if
      (
        args.value.getDate() === this.props.options.minDate.getDate() &&
        args.value.getMonth() === this.props.options.minDate.getMonth() &&
        args.value.getFullYear() === this.props.options.minDate.getFullYear()
      ) {
        ч
      }
    },
    timePickerLoadedHandler(args) {
      args.object.android.setIs24HourView(java.lang.Boolean.TRUE)
    }
  }
}

</script>

<style lang="scss">



</style>