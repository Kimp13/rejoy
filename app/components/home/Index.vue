<template>

  <AskingsShowcase v-if="user.isRoot" />
  <Label v-else-if="user.isAuthenticated" class="main-label" text="Вы успешно вошли в приложение." />
  <StackLayout class="main-form" v-else orientation="vertical">
    <Label class="main-form-label" text="Если у Вас уже есть аккаунт, войдите в приложение:" textWrap="true" />
    <Label class="main-form-error" v-if="invalidCredentials" text="Неправильный логин или пароль." textWrap="true" />
    <AbsoluteLayout class="main-form-field">
      <Label top="32" left="10" class="fas main-form-field-icon">&#xf2bb;</Label>      
      <TextField class="main-form-field-self" top="0" left="0" v-model="identifier" hint="Логин или email" maxLength="128" keyboardType="email" @textChange="dropInvalidCredentials" />
    </AbsoluteLayout>
    <Label class="main-form-error" v-if="invalidIdentifier" :text="invalidIdentifier" textWrap="true" />
    <AbsoluteLayout class="main-form-field">
      <Label top="32" left="10" class="fas main-form-field-icon">&#xf023;</Label>
      <TextField class="main-form-field-self" top="0" left="0" v-model="password" hint="Пароль" maxLength="128" secure="true" @textChange="dropInvalidCredentials" />
    </AbsoluteLayout>
    <Label class="main-form-error" v-if="invalidPassword" :text="invalidPassword" textWrap="true" />
    <Button class="fas main-form-submit" :isEnabled="isSubmitEnabled" horizontalAlignment="right" @tap="signIn" :text="authenticating ? '\uf2f5' : '\uf2f6'" />
  </StackLayout>

</template>

<script>
import axios from "axios";

import AskingsShowcase from "./AskingsShowcase";

const appSettings = require("tns-core-modules/application-settings");
  
export default {
  data() {
    return {
      invalidCredentials: false,
      authenticating: false,
      identifier: '',
      password: '',
      user: process.socket.user
    }
  },
  methods: {
    dropInvalidCredentials() {
      if (this.invalidCredentials === true) {
        this.invalidCredentials = false;
      }
    },

    signIn() {
      this.authenticating = true;

      let query = {
        password: this.password
      };

      if (this.identifierAtSign) {
        query.email = this.identifier;
      } else {
        query.username = this.identifier;
      }

      process.socket.emit('auth', query);
      process.socket.on('auth', data => {
        if (data) {
          this.authenticating = false;
          process.socket.user = data.user;
          this.user = data.user;
          appSettings.setString("jwt", data.jwt);
        } else {
          this.invalidCredentials = true;
          this.authenticating = false;
        }
      });
    }
  },
  computed: {
    identifierAtSign() {
      let val = this.identifier;

      return val.indexOf('@');
    },

    invalidIdentifier() {
      let val = this.identifier;

      if (val.length === 0) {
        return 'Заполните это поле.';
      }
      
      let atIndex = this.identifierAtSign;

      if (atIndex >= 0) {
        if (atIndex === 0) {
          return 'Некорректный email.';
        }

        let postAt = val.substring(atIndex + 1);

        if (postAt.length === 0) {
          return 'Некорректный email.';
        }

        let dotIndex = postAt.indexOf('.');

        if (dotIndex < 1 || postAt.length - dotIndex < 3) {
          return 'Некорректный email.';
        }
      } else {
        if (/[^A-Za-z0-9_]/.test(val)) {
          return 'Некорректный логин.';
        }
      }

      return false;
    },

    invalidPassword() {
      let val = this.password;

      if (val.length === 0) {
        return 'Заполните это поле.';
      }

      if (val.length < 8) {
        return 'Слишком короткий пароль.';
      }

      return false;
    },

    isSubmitEnabled() {
      return (!this.invalidIdentifier && !this.invalidPassword && !this.invalidCredentials && !this.authenicating);
    }
  },
  components: {
    AskingsShowcase
  }
}

</script>

<style lang="scss">

.main-label {
  color: black;
  font-size: 20;
  padding: 5 20;
  text-align: center;
}

.main-form {
  padding: 5 20;
  &-field-self,
  &-submit {
    margin-top: 15;
  }

  &-submit {
    width: 100;
    height: 60;
    font-size: 35;
  }

  &-field {
    padding: 0;
    &-icon {
      width: 20;
      height: 20;
      color: black;
    }
    &-self {
      padding: 15 10 15 40;
      font-family: sans-serif;
      font-size: 18;
      width: 100%;
    }
  }

  &-label,
  &-error {
    font-size: 20;
    text-align: center;
  }

  &-label {
    color: black;
    padding: 5 20;
  }

  &-error {
    color: #f03;
    padding: 0 20;
  }
}

</style>