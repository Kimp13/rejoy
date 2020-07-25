<template>

  <ScrollView class="main-container-scroll" orientation="horizontal" scrollBarIndicatorVisible="false">
    <Label v-if="noServicesAvailable" class="main-container-scroll-label" text="К сожалению, в данной категории нет доступных сервисов." />
    <FlexboxLayout v-else justifyContent="center" alignItems="center">
      <DockLayout v-for="(item, index) in services" :key="'a' + index" class="main-container-scroll-item" :style="{backgroundImage: `url('${hostname + item.image[0].url}')`}" @tap="goToForm(item.id)" stretchLastChild="false">
        <Label class="main-container-scroll-item-name" dock="top" horizontalAlignment="left" textWrap="true" :text="item.name" />
        <Label class="fas main-container-scroll-item-goto" dock="bottom" horizontalAlignment="right">заказать &#xf138;</Label>
      </DockLayout>
      <Label v-if="loadingServices" class="main-container-scroll-label"  text="Загрузка..." />
      <Label v-else-if="loadingError" class="main-container-scroll-label" text="Ошибка загрузки."></Label>
    </FlexboxLayout>
  </ScrollView>

</template>

<script>

  import axios from 'axios';

  export default {
    props: [
      'categoryId'
    ],
    data() {
      axios.get(process.env.API_HOSTNAME + '/services/count', {
        params: {
          categoryId: this.categoryId
        }
      })
        .then(count => {
          this.count = parseInt(count.data);
          if (this.count > 0) {
            this.loadNewServices();
          } else {
            this.loadingServices = false;
          }
        })
        .catch(e => {
          this.loadingServices = false;
          this.loadingError = true;
        });

      return {
        services: Array(),
        loadingServices: true,
        loadingError: false,
        count: 0,
        skip: 0,
        hostname: process.env.API_HOSTNAME
      }
    },
    methods: {
      loadNewServices() {
        this.loadingServices = true;

        axios.get(process.env.API_HOSTNAME + '/services', {
          params: {
            _limit: 10,
            _start: this.skip,
            categoryId: this.categoryId
          }
        })
          .then(data => {
            this.services = this.services.concat(data.data);
            this.skip += 10;
            this.loadingServices = false;
          })
          .catch(e => {
            this.loadingServices = false;
            this.loadingError = true;
          });
      },
      goToForm(id) {
        this.$emit('goToForm', id)
      }
    },
    computed: {
      noServicesAvailable() {
        return ((this.count === 0) && !this.loadingServices)
      }
    }
  }

</script>

<style lang="scss">

.main-container-scroll {
  &-label {
    color: #888;
    font-size: 24;
    text-align: center;
  }
  &-item {
    width: 250;
    height: 120;
    border-radius: 10;
    margin: 0 10;
    padding: 10;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: top;
    &-name,
    &-goto {
      padding: 6 10;
      color: white;
      background-color: rgba(black, .5);
      text-transform: uppercase;
    }
    &-name {
      font-size: 20;
      font-weight: 700;
    }
  }
}

</style>