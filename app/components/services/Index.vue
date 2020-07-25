<template>

  <StackLayout class="main-container" orientation="vertical">
    <Label v-if="user.isRoot" class="main-container-root-label" text="Добавить услугу" textWrap="true" @tap="createService" />
    <template v-for="(category, index) in serviceCategories">
      <Label class="main-container-label" :text="category.name" :key="'l' + index"/>
      <ServicesShowcase :categoryId="category.id" :key="'s' + index" @goToForm="goToForm" />
    </template>
    <Label v-if="loadingCategories" class="main-container-infolabel" text="Загрузка категорий..." />
    <Label v-else-if="loadingError" class="main-container-infolabel" text="Ошибка загрузки категорий." />
    <Label v-else-if="noAvailableCategories" class="main-container-info-label" text="Нет доступных категорий." />
  </StackLayout>

</template>

<script>
  import axios from 'axios';

  import ServicesShowcase from './ServicesShowcase';

  export default {
    data() {
      let serviceCategories = Array(),
          loadingCategories = true,
          loadingError = false;

      axios.get(process.env.API_HOSTNAME + '/service-categories')
        .then(data => {
          this.serviceCategories = data.data;
          this.loadingCategories = false;
        })
        .catch(e => {
          this.loadingCategories = false;
          this.loadingError = true;
          alert('Я сисадминов люблю, уважаю... что там дальше было?');
        });

      return {
        serviceCategories,
        loadingCategories,
        loadingError,
        hostname: process.env.API_HOSTNAME,
        user: process.socket.user
      }
    },
    methods: {
      goToForm($event) {
        this.$emit('goToPage', {page: 'Form', props: {id: $event}});
      },
      createService() {
        this.$emit('goToPage', {page: 'CreateService', props: {}})
      }
    },
    computed: {
      noAvailableCategories() {
        return (this.serviceCategories.length === 0);
      }
    },
    components: {
      ServicesShowcase
    }
  }

</script>

<style lang="scss">

.main-container {
  &-root-label {
    text-align: center;
    padding: 10 20;
    background: purple;
    color: white;
    font-size: 20;
  }

  &-info-label {
    font-size: 25;
    text-align: center;
    color: black;
  }

  &-label {
    font-style: italic;
    font-size: 30;
    margin: 10 25;
  }
}

</style>