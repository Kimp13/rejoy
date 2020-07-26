<template>
  

  <Label v-if="loadingForm" class="main-info-label" text="Загрузка формы..." textWrap="true" />
  <Label v-else-if="loadingError" class="main-info-label" text="Ошибка загрузки формы." textWrap="true" />
  <ScrollView v-else orientation="vertical" class="main-form" :style="{backgroundImage: `url('${hostname}${service.image[0] ? service.image[0].url : '/uploads/under_construction_sign_typographic_design_vector_illustration_yellow_background_56644168_8a9cfec442.jpg'}')`}">
    <WrapLayout class="main-form-wrapper">
      <Label class="main-form-no-form" v-if="noForm" text="К сожалению, у данной услуги пока что нет формы заказа. Она появится в будущем." textWrap="true" />
      <StackLayout v-else orientation="vertical" class="main-form-contents">
        <Label class="main-form-contents-header" :text="service.name" textWrap="true" />
        <component v-for="(field, index) in service.formFields" :is="field.type" :props="field" @error="handleError(index)" @noErrors="handleNoErrors($event, index)" :key="index" />
        <Button class="main-form-contents-submit" :isEnabled="isSubmitEnabled" @tap="submit" text="Отправить заявку" />
      </StackLayout>
    </WrapLayout>
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
      axios.get(`${process.env.API_HOSTNAME}/services/${this.props.id}`)
        .then(data => {
          this.service = data.data;
          if (this.service.formFields !== null) {
            for (let field of this.service.formFields) {
              this.areFieldsValid.push(true);
              this.fieldsData.push(Object());

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
          } else {
            this.loadingForm = false;
            this.noForm = true;
          }
        })
        .catch(e => {
          console.log(e);
          this.loadingForm = false;
          this.loadingError = true;
        });

      return {
        service: Array(),
        loadingForm: true,
        loadingError: false,
        areFieldsValid: Array(),
        noForm: false,
        hostname: process.env.API_HOSTNAME,
        fieldsData: Array(),
        loadingSubmit: false
      };
    },
    methods: {
      handleError(index) {
        if (this.areFieldsValid[index]) {
          this.$set(this.areFieldsValid, index, false);
        }
      },
      handleNoErrors(args, index) {
        if (!this.areFieldsValid[index]) {
          this.$set(this.areFieldsValid, index, true);
        }

        this.fieldsData[index] = args;
      },
      submit() {
        this.loadingSubmit = true;
        
        axios.post(process.env.API_HOSTNAME + '/askings', {
          serviceId: this.service.id,
          userId: process.socket.user.id || 0,
          fields: this.fieldsData
        })
          .then(data => {
            alert('Заявка отправлена!');
            this.$emit('goToPage', {
              page: 'Index',
              props: {}
            });
          })
          .catch(e => {
            alert('Что-то пошло не так. Попробуйте позже.');
          });
      }
    },
    computed: {
      isSubmitEnabled() {
        if (this.loadingSubmit) {
          return false;
        }

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
  &-no-form,
  &-contents {
    width: 80%;
    margin: 50 10%;
    padding: 15;
    border-radius: 15;
    background-color: rgba(white, .8);
    color: black;
  }
  &-no-form,
  &-contents-header {
    text-align: center;
    font-size: 24;
    font-weight: 700;
  }
  &-no-form {
    height: 150;
  }
  &-contents {
    height: auto;
    &-header {
      text-transform: uppercase;
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