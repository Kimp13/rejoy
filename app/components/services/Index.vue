<template>

    <StackLayout class="main-container" orientation="vertical">
      <template v-for="(category, index) in serviceCategories">
        <Label class="main-container-label" :text="category.name" :key="'l' + index"/>
        <ScrollView class="main-container-scroll" :key="'s' + index" orientation="horizontal" scrollBarIndicatorVisible="false">
            <FlexboxLayout justifyContent="center">
              <AbsoluteLayout v-for="(item, index) in category.services" :key="'a' + index" class="main-container-scroll-item" :style="{backgroundImage: `url('${hostname + item.image[0].url}')`}" />
            </FlexboxLayout>
            <Label v-if="loadingCategories" class="main-container-scroll-label" text="Загрузка категорий..." />
            <Label v-else-if="loadingError" class="main-container-scroll-label" text="Ошибка загрузки категорий" />
            <Lable v-else-if="noAvailableCategories" class="main-container-scroll-label" text="Нет доступных категорий." />
        </ScrollView>
      </template>
    </StackLayout>

</template>

<script>
  import axios from 'axios';

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
        });

      return {
        serviceCategories,
        loadingCategories,
        loadingError,
        hostname: process.env.API_HOSTNAME
      }
    },
    computed: {
      noAvailableCategories() {
        return (this.serviceCategories.length === 0);
      }
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
  &-scroll {
    &-label {
      color: black;
      font-size: 24;
      text-align: center;
    }
    &-item {
      width: 250;
      height: 120;
      border-radius: 10;
      margin: 0 10;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: top;
    }
  }
}

</style>