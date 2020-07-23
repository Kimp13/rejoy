<template>

    <StackLayout class="main-container" orientation="vertical">
      <template v-for="(category, index) in serviceCategories">
        <Label class="main-container-label" :text="category.name" :key="'l' + index"/>
        <Label v-if="noAvailableCategories" class="main-container-scroll-label" text="Нет доступных категорий." />
        <ServicesShowcase v-else :categoryId="category.id" :key="'s' + index" @goToForm="goToForm" />
        <Label v-if="loadingCategories" class="main-container-scroll-label" text="Загрузка категорий..." />
        <Label v-else-if="loadingError" class="main-container-scroll-label" text="Ошибка загрузки категорий" />
      </template>
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
          alert('Ну, опять ошибочка. Смотри-смотри.');
        });

      return {
        serviceCategories,
        loadingCategories,
        loadingError,
        hostname: process.env.API_HOSTNAME
      }
    },
    methods: {
      goToForm($event) {
        this.$emit('goToForm', {id: $event});
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
  &-label {
    font-style: italic;
    font-size: 30;
    margin: 10 25;
  }
}

</style>