<template>

  <StackLayout class="main-create-field" orientation="vertical">
    <Label class="main-create-label" text="Подсказка поля:" textWrap="true" />
    <TextField flexGrow="1" class="main-create-text" hint="Подсказка" maxLength="64" v-model="hint" />
    <Label class="main-create-label" text="Запрещённые символы (в формате regex):" textWrap="true" />
    <TextField flexGrow="1" class="main-create-text" hint="Запрещённые символы" maxLength="64" v-model="regex" />
    <Label v-if="regexError" class="main-create-error" text="Некорректный формат поля." />
    <Label class="main-create-label" text="Минимальная длина:" textWrap="true" />
    <TextField flexGrow="1" class="main-create-text" hint="Минимальная длина" maxLength="64" v-model="minLength" />
    <Label v-if="minLengthError" class="main-create-error" :text="minLengthError" textWrap="true" />
    <Label class="main-create-label" text="Максимальная длина:" textWrap="true" />
    <TextField flexGrow="1" class="main-create-text" hint="Максимальная длина" maxLength="64" v-model="maxLength" />
    <Label v-if="maxLengthError" class="main-create-error" :text="maxLengthError" textWrap="true" />
  </StackLayout>

</template>

<script>

export default {
  data() {
    setTimeout(this.sendNews, 0);

    return {
      minLength: '',
      maxLength: '',
      hint: '',
      regex: '',
      required: true
    }
  },
  methods: {
    sendNews() {
      if (this.noErrors) {
        let options = {
          required: this.required
        };

        if (this.hint.length > 0) {
          options.hint = this.hint;
        }

        if (this.regex.length > 0) {
          options.regex = this.regex;
        }

        if (this.minLength.length > 0) {
          options.minLength = parseInt(this.minLength);
        }

        if (this.maxLength.length > 0) {
          options.maxLength = parseInt(this.maxLength);
        }

        this.$emit('news', {
          field: {
            type: 'text',
            options
          }
        });
      } else {
        this.$emit('news', {
          errors: [
            'Присутствуют ошибки в опциях поля.'
          ]
        });
      }
    }
  },
  computed: {
    minLengthError() {
      setTimeout(this.sendNews, 0);

      for (let i = 0; i < this.minLength.length; i += 1) {
        let char = this.minLength.charAt(i),
            code = char.charCodeAt(0);

        if (code < 48 || code > 57) {
          return `Недопустимый символ "${char}".`;
        }
      }
      return false;
    },
    maxLengthError() {
      setTimeout(this.sendNews, 0);

      for (let i = 0; i < this.maxLength; i += 1) {
        let char = this.maxLength.charAt(i),
            code = char.charCodeAt(0);

        if (code < 48 || code > 57) {
          return `Недопустимый символ "${char}".`;
        }
      }
      return false;
    },
    regexError() {
      setTimeout(this.sendNews, 0);

      try {
        let regex = new RegExp(this.regex);
      } catch(e) {
        return true;
      }
      return false;
    },
    noErrors() {
      return (!this.minLengthError && !this.maxLengthError && !this.regexError);
    }
  }
}

</script>