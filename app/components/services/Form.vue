<template>
  <Label v-if="loadingForm" class="main-info-label" text="Загрузка формы..." />
  <Label v-else-if="loadingError" class="main-info-label" text="Ошибка загрузки формы." />
  <Label v-else class="main-form" :style="{backgroundImage: 'url(' + hostname + service.image[0].url + ')'}">
    <StackLayout orientation="vertical" class="main-form-contents">
      <component v-for="(field, index) in service.formFields" :is="field.type" :props="field" :key="index" />
      <Label text="SUBMIT TO ME!" />
    </StackLayout>
  </Label> 

</template>

<script>
  import ListPicker from './fields/ListPicker';
  import DatePicker from './fields/DatePicker';
  import TimePicker from './fields/TimePicker';
  import TextView from './fields/TextView';

  import axios from 'axios';

  export default {
    props: [
      'props'
    ],
    data() {
      let service = [],
          loadingForm = true,
          loadingError = false;

      axios.get(`${process.env.API_HOSTNAME}/services/${this.props.id}`)
        .then(data => {
          this.service = data.data;
          this.loadingForm = false;
        })
        .catch(e => {
          this.loadingForm = false;
          this.loadingError = true;
        });

      return {
        service,
        loadingForm,
        loadingError,
        hostname: process.env.API_HOSTNAME
      };
    },
    components: {
      list: ListPicker,
      date: DatePicker,
      time: TimePicker,
      text: TextView
    }
  }


</script>

<style lang="scss">

.main-info-label {
  font-size: 24;
  text-align: center;
}

.main-form {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;
  width: 100%;
  &-contents {
    width: 80%;
    margin: 10%;
    background-color: rgba(white, .6);
    color: black;
  }
}

</style>