<template>

  <ScrollView orientation="vertical">
    <StackLayout class="main-create" orientation="vertical">
      <Label class="main-create-header" text="Создание услуги" />
      <FlexboxLayout class="main-create-control" alignItems="center">
        <Label class="main-create-control-label" flexGrow="1" text="Добавить поле" />
        <Label v-if="fields.length < 5" :class="'main-create-control-button' + (createButtonPressed ? ' pressed' : '')" text="+" @touch="createField" />
      </FlexboxLayout>
      <Label class="main-create-status" :text="`Занято полей: ${fields.length} из 5.`" textWrap="true" />
      <FlexboxLayout v-for="(field, index) in fields" class="main-create-showcase" alignItems="center" :key="index">
        <Label class="main-create-showcase-label" flexGrow="1" :text="field.name" />
        <Button class="main-create-showcase-button" text="-" @tap="deleteField(index)" />
      </FlexboxLayout>
      <Label class="main-create-label" text="Выбор категории:" textWrap="true" />
      <Label class="main-create-button" :text="props.category ? props.category.name : 'Выберите категорию...'" textWrap="true" @tap="chooseCategory" />
      <Label class="main-create-label" text="Имя услуги:" textWrap="true" />
      <TextField class="main-create-text" hint="Имя" maxLength="64" v-model="serviceName" />
      <Label v-if="fieldsError" class="main-create-error" :text="fieldsError" textWrap="true" />
      <Label v-if="!props.category" class="main-create-error" text="Выберите категорию." textWrap="true" />
      <Label v-if="nameError" class="main-create-error" :text="nameError" textWrap="true" />
      <Button class="main-create-submit" @tap="createService" :isEnabled="isSubmitEnabled" text="Создать" horizontalAlignment="right" />
    </StackLayout>
  </ScrollView>

</template>

<script>
  import axios from 'axios';

  let appStorage = require('tns-core-modules/application-settings');



  export default {
    props: [
      'props'
    ],
    data() {
      return {
        createButtonPressed: false,
        fields: this.props.fields || [],
        serviceName: '',
        loading: false
      }
    },
    methods: {
      createField(args) {
        if (args.action === 'down') {
          this.createButtonPressed = true;
        } else {
          this.createButtonPressed = false;

          this.$emit('goToPage', {
            page: 'CreateField',
            props: {
              previousFields: this.fields
            }
          });
        }
      },
      deleteField(index) {
        let newFields = Array();

        for (let i = 0; i < index; i += 1) {
          newFields.push(this.fields[i]);
        }

        for (let i = index + 1; i < this.fields.length; i += 1) {
          newFields.push(this.fields[i]);
        }

        this.fields = newFields;
      },
      chooseCategory() {
        this.$emit('goToPage', {
          page: 'ChooseCategory',
          props: this.props
        });
      },
      createService() {
        this.loading = true;

        process.socket.emit('newService', {
          name: this.serviceName,
          categoryId: this.props.category.id,
          formFields: this.fields
        });
        process.socket.on('newService', data => {
          if (data.ok) {
            alert('Услуга успешно создана!');
            this.$emit('goToPage', {
              page: 'servicesLayout',
              props: {}
            });
          } else {
            alert('Что-то пошло не так. Попробуйте ещё раз.');
          }
          process.socket.off('newService');
        });
      }
    },
    computed: {
      nameError() {
        if (this.serviceName.length === 0) {
          return 'Назовите услугу.';
        }

        return false;
      },
      fieldsError() {
        if (this.fields.length === 0) {
          return 'Создайте хотя бы одно поле.';
        }

        return false;
      },
      isSubmitEnabled() {
        return (!this.nameError && this.props.category && !this.fieldsError && !this.loading);
      }
    }
  }

</script>

<style lang="scss" scoped>

.main-create {
  padding: 10 30;
  & > * {
    color: black;
  }

  &-header {
    font-size: 24;
    width: 100%;
    text-align: center;
    font-weight: 700;
    text-transform: uppercase;
  }

  &-control {
    width: 100%;
    margin: 20 0;
    &-label {
      font-weight: 700;
      font-size: 24;
    }
    &-button {
      width: 60;
      height: auto;
      font-size: 40;
      text-align: center;
      color: #aaa;
      background: transparent;
      &.pressed {
        background: #aaa;
        color: white;
      }
    }
  }

  &-status {
    text-align: center;
    font-size: 20;
  }

  &-showcase {
    margin: 5 0;
    &-label {
      font-size: 20;
      text-align: center;
    }
    &-button {
      font-size: 30;
      width: 60;
      height: auto;
    }
  }

  &-button {
    margin: 10 0;
    text-align: center;
    font-size: 20;
    color: gray;
  }

  &-error {
    font-size: 20;
    text-align: center;
    color: #f03;
  }
}

</style>