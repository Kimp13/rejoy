<template>
  
  <ScrollView orientation="vertical">
    <StackLayout class="main-create" orientation="vertical">
      <Label class="main-create-header" text="Создание поля" />
      <Label class="main-create-label" text="Тип поля:" />
      <ListPicker :items="items" v-model="pickedItem" />
      <component :is="currentItem" @news="news" />
      <Label class="main-create-label" text="Имя поля:" />
      <TextField class="main-create-text" hint="Имя поля" maxLength="64" v-model="fieldName" />
      <Label v-for="(error, index) in errors" class="main-create-error" :text="error" :key="index" textWrap="true" />
      <Label v-if="nameError" class="main-create-error" text="Введите имя поля." />
      <FlexboxLayout justifyContent="flex-end">
        <Button class="main-create-button back" text="Назад" @tap="goBack" />
        <Button class="main-create-button submit" :isEnabled="noErrors" text="Создать" @tap="create" />
      </FlexboxLayout>
    </StackLayout>
  </ScrollView>

</template>

<script>
  import ListPicker from './fields/ListPicker';
  import DateTimePicker from './fields/DateTimePicker';
  import TextField from './fields/TextField';

  export default {
    props: [
      'props'
    ],
    data() {
      if (this.props.previousFields === undefined) {
        this.props.previousFields = Array();
      }
      return {
        pickedItem: 0,
        items: [
          'Выбор варианта',
          'Дата и время',
          'Текст'
        ],
        keycodes: [
          'list',
          'datetime',
          'text'
        ],
        errors: Array(),
        field: null,
        fieldName: ''
      }
    },
    methods: {
      news(args) {
        if (args.errors) {
          this.errors = args.errors;
        } else {
          this.errors = Array();
          this.field = {
            ...args.field
          };
        }
      },
      goBack() {
        this.$emit('goToPage', {
          page: 'Index',
          props: {
            fields: this.props.previousFields
          }
        });
      },
      create() {
        this.$emit('goToPage', {
          page: 'Index',
          props: {
            fields: this.props.previousFields.concat({
              ...this.field,
              name: this.fieldName
            })
          }
        });
      }
    },
    computed: {
      currentItem() {
        return this.keycodes[this.pickedItem];
      },
      nameError() {
        return this.fieldName.length === 0;
      },
      noErrors() {
        return (this.errors.length === 0 && !this.nameError);
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

.main-create {
  padding: 10 30;

  &-header {
    width: 100%;
    text-align: center;
    font-size: 24;
    font-weight: 700;
    color: black;
    text-transform: uppercase;
  }

  &-label,
  &-field-label {
    margin-top: 15;
    text-align: center;
    font-size: 20;
    color: black;
  }

  &-field {
    width: 100%;

    &-flex {
      width: 100%;
    }

    &-text {
      padding: 15 20;
    }

    &-button {
      width: 60;
      height: auto;
      font-size: 28;
      text-align: center;
    }
  }

  &-text {
    padding: 15 20;
  }

  &-error {
    margin: 5 0;
    font-size: 20;
    text-align: center;
    color: #f03;
  }
}

</style>