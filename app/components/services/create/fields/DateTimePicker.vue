<template>

  <StackLayout class="main-create-field" orientation="vertical">
    <Label class="main-create-label" text="Минимальная дата:" />
    <ListPicker :items="datePickerItems" v-model="minDatePickerIndex" @selectedIndexChange="sendFieldData"/>
    <template v-if="minDatePickerIndex > 0">
      <Label class="main-create-label" text="Ручной выбор минимальной даты:" textWrap="true" />
      <DatePicker v-model="minDate" :maxDate="maxDate" @dateChange="sendFieldData" />
    </template>
    <Label class="main-create-label" text="Максимальная дата:" />
    <ListPicker :items="datePickerItems" v-model="maxDatePickerIndex" @selectedIndexChange="sendFieldData"/>
    <template v-if="maxDatePickerIndex > 0">
      <Label class="main-create-label" text="Ручной выбор максимальной даты:" textWrap="true" />
      <DatePicker v-model="maxDate" :minDate="minDate" @dateChange="sendFieldData" />
    </template>
    <Label class="main-create-label" text="Минимальное время:" />
    <TimePicker @loaded="timePickerLoadedHandler" @timeChange="sendFieldData" v-model="minTime" />
    <Label class="main-create-label" text="Максимальное время:" />
    <TimePicker @loaded="timePickerLoadedHandler" @timeChange="sendFieldData" v-model="maxTime" />
  </StackLayout>

</template>

<script>

export default {
  data() {
    let date = new Date();

    setTimeout(this.sendFieldData, 0);

    return {
      datePickerItems: [
        'Текущее время клиента',
        'Выбрать вручную'
      ],
      minDatePickerIndex: 0,
      maxDatePickerIndex: 0,
      minDate: date,
      maxDate: date,
      minTime: date,
      maxTime: date
    }
  },
  methods: {
    timePickerLoadedHandler(args) {
      args.object.android.setIs24HourView(java.lang.Boolean.TRUE)
    },
    sendFieldData() {
      let
          minDate = 
            this.minDatePickerIndex === 0 ?
            'now' :
            `${this.minDate.getFullYear()}.${this.minDate.getMonth() + 1}.${this.minDate.getDate()}`,
          maxDate = 
            this.maxDatePickerIndex === 0 ?
            'now' :
            `${this.maxDate.getFullYear()}.${this.maxDate.getMonth() + 1}.${this.maxDate.getDate()}`,
          minTime = `${this.minHour}:${this.minMinute}`,
          maxTime = `${this.maxHour}:${this.maxMinute}`;

      this.$emit('news', {
        field: {
          type: 'datetime',
          options: {
            minDate,
            maxDate,
            minTime,
            maxTime
          }
        }
      });
    }
  },
  computed: {
    minHour() {
      return this.minTime.getHours();
    },
    minMinute() {
      return this.minTime.getMinutes();
    },
    maxHour() {
      return this.maxTime.getHours();
    },
    maxMinute() {
      return this.maxTime.getMinutes();
    }
  }
}

</script>