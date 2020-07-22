<template>

  <Label v-if="loadingForm" class="main-info-label" text="Загрузка формы..." />
  <Label v-else-if="loadingError" class="main-info-label" text="Ошибка загрузки формы." />
  <ScrollView v-else orientation="vertical" class="main-form" :style="{backgroundImage: `url('${hostname}${service.image[0].url}')`}">
    <StackLayout orientation="vertical" class="main-form-contents">
      <Label class="main-form-contents-header" :text="service.name" />
      <component v-for="(field, index) in service.formFields" :is="field.type" :props="{...field, index}" @error="handleError" @noErrors="handleNoErrors" :key="index" />
      <Button class="main-form-contents-submit" :isEnabled="isSubmitEnabled" @tap="submit" text="Отправить заявку" />
    </StackLayout>
  </ScrollView> 

</template>

<script>
  import ListPicker from './fields/ListPicker';
  import DateTimePicker from './fields/DateTimePicker';
  import TextField from './fields/TextField';

  import axios from 'axios';

  export default {
    props: [
      'props'
    ],
    data() {
      let service = [],
          loadingForm = true,
          loadingError = false,
          areFieldsValid = Array();

      axios.get(`${process.env.API_HOSTNAME}/services/${this.props.id}`)
        .then(data => {
          this.service = data.data;
          for (let field of this.service.formFields) {
            areFieldsValid.push(true);
            if (!field.options) {
              field.options = {};
            }
            if (field.type === 'datetime') {
              if (field.options.minDate) {
                if (field.options.minDate === 'now') {
                  field.options.minDate = new Date();
                } else {
                  field.options.minDate = new Date(field.options.minDate);
                }
              } else {
                field.options.minDate = new Date(0);
              }

              if (field.options.maxDate) {
                if (field.options.maxDate === 'now') {
                  field.options.maxDate = new Date();
                } else {
                  field.options.maxDate = new Date(field.options.maxDate);
                }
              } else {
                field.options.maxDate = new Date();
              }
            }
          }
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
        areFieldsValid,
        hostname: process.env.API_HOSTNAME
      };
    },
    methods: {
      handleError(index) {
        if (this.areFieldsValid[index]) {
          this.$set(this.areFieldsValid, index, false);
        }
      },
      handleNoErrors(index) {
        if (!this.areFieldsValid[index]) {
          this.$set(this.areFieldsValid, index, true);
        }
      },
      submit() {
        this.$emit('returnHome');
      }
    },
    computed: {
      isSubmitEnabled() {
        for (let i = 0; i < this.areFieldsValid.length; i += 1) {
          if (!this.areFieldsValid[i]) {
            return false;
          } 
        }
        return true;
      }
    },
    components: {
      list: ListPicker,
      datetime: DateTimePicker,
      text: TextField
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
  min-height: 100%;
  &-contents {
    width: 80%;
    margin: 50 10%;
    padding: 15;
    border-radius: 15;
    background-color: rgba(white, .8);
    color: black;
    &-header {
      text-transform: uppercase;
      text-align: center;
      font-size: 24;
      font-weight: 700;
    }
    &-error {
      text-align: center;
      font-size: 20;
      font-weight: 700;
      color: #ff0040;
    }
    &-submit {
      border-radius: 0;
    }
  }
}

</style>