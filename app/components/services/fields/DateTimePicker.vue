<template>

  <StackLayout orientation="vertical">
    <DatePicker class="main-form-contents-field" :date="props.options.date" :minDate="props.options.minDate" :maxDate="props.options.maxDate" v-model="selectedDate" @dateChange="changeHandler" />
    <TimePicker ref="time" class="main-form-contents-field" @loaded="timePickerLoadedHandler" v-model="selectedTime" @timeChange="changeHandler" />
  </StackLayout>

</template>

<script>

export default {
  props: [
    'props'
  ],
  data() {
    let date = new Date();

    if (this.props.options === undefined) {
      this.props.options = {};
    }

    return {
      selectedDate: date,
      selectedTime: date
    }
  },
  methods: {
    changeHandler() {
      let days = this.selectedDate.getDate(),
          months = this.selectedDate.getMonth() + 1,
          years = this.selectedDate.getFullYear(),
          hours = this.selectedTime.getHours(),
          minutes = this.selectedTime.getMinutes(),
          value = `${days > 9 ? days : '0' + days}.${months > 9 ? months : '0' + months}.${this.selectedDate.getFullYear()} ${hours > 9 ? hours : '0' + hours}:${minutes > 9 ? minutes : '0' + minutes}`;

      this.$emit('noErrors', {
        name: this.props.name,
        value
      });
    },
    timePickerLoadedHandler(args) {
      args.object.android.setIs24HourView(java.lang.Boolean.TRUE);
    }
  },
  computed: {
    minHour() {
      return this.props.options.minTime.substring(0, 2);
    },
    minMinute() {
      return this.props.options.minTime.substring(3);
    },
    maxHour() {
      return this.props.options.maxTime.substring(0, 2);
    },
    maxMinute() {
      return this.props.options.maxTime.substring(3);
    }
  }
}

</script>

<style lang="scss">



</style>