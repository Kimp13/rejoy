<template>
  
  <StackLayout orientation="vertical">
    <TextField class="main-form-contents-field" editable="true" v-model="fieldValue" :hint="props.options.hint" :maxLength="props.options.maxLength || 256" />
    <Label v-if="error" class="main-form-contents-error" :text="error" />
  </StackLayout>

</template>

<script>

export default {
  props: [
    'props'
  ],
  data() {
    return {
      fieldValue: ''
    }
  },
  computed: {
    error() {
      let options = this.props.options,
          error = false;
      if (options.required && this.fieldValue.length === 0) {
        error = 'Заполните это поле.';
      } else if (options.minLength && this.fieldValue.length < options.minLength) {
        error = `Минимальная длина поля - ${options.minLength}.`
      } else if (options.regex) {
        let symbol = new RegExp(options.regex).exec(this.fieldValue);
        if (symbol) {
          error = `Недопустимый символ "${symbol[0]}".`;
        }
      }
      if (error) {
        this.$emit('error', this.props.index);
        console.log('Error with TextField!')
      } else {
        this.$emit('noErrors', this.props.index);
        console.log('No errors with TextField!')
      }
      return error;
    }
  }
}

</script>

<style lang="scss">



</style>