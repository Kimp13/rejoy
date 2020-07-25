<template>

  <ScrollView orientation="vertical" @scroll="handleScroll">
    <StackLayout orientation="vertical" class="main-choosecategory">
      <Label v-for="(category, index) in categories" class="main-choosecategory-button" :key="index" :text="category.name" @tap="chooseCategory(category)" textWrap="true" />
      <Label v-if="loadingCategories" class="main-choosecategory-label" text="Загрузка..." textWrap="true" />
      <Label v-else-if="loadingError" class="main-choosecategory-label" text="Ошибка загрузки." textWrap="true" />
      <Label v-else-if="noAvailableCategories" class="main-choosecategory-label" text="Нет доступных категорий." textWrap="true" />
    </StackLayout>
  </ScrollView>

</template>

<script>
  import axios from 'axios';

  export default {
    props: [
      'props'
    ],
    data() {

      axios.get(process.env.API_HOSTNAME + '/service-categories/count')
        .then(data => {
          this.count = parseInt(data.data);
          if (this.count > 0) {
            this.addCategories();
          } else {
            this.loadingCategories = false;
          }
        })
        .catch(e => {
          this.loadingCategories = false;
          this.loadingError = true;
        });

      return {
        categories: Array(),
        skip: 0,
        count: 0,
        loadingCategories: true,
        loadingError: false
      }
    },
    methods: {
      addCategories() {
        this.loadingCategories = true;

        axios.get(process.env.API_HOSTNAME + '/service-categories', {
          props: {
            _start: this.skip,
            _limit: 10
          }
        })
          .then(data => {
            this.loadingCategories = false;
            this.skip += 10;

            data = data.data;

            for (let i = 0; i < data.length; i += 1) {
              data[i] = {
                id: data[i].id,
                name: data[i].name
              }
            }

            this.categories = this.categories.concat(data);
          })
          .catch(e => {
            this.loadingCategories = false;
            this.loadingError = true;
          });
      },
      chooseCategory(category) {
        this.$emit('goToPage', {
          page: 'Index',
          props: {
            ...this.props,
            category
          }
        })
      },
      handleScroll() {

      }
    },
    computed: {
      noAvailableCategories() {
        return (this.count === 0);
      }
    }
  }

</script>

<style lang="scss">

.main-choosecategory {
  width: 100%;
  &-button,
  &-label {
    width: 100%;
    font-size: 24;
    text-align: center;
    padding: 10 0;
  }

  &-button {
    background: #999;
    color: white;
  }

  &-label {
    color: #999;
  }
}

</style>