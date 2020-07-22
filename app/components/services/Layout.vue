<template>
  <Frame>
    <Page actionBarHidden="true">
      <GridLayout class="wrapper" columns="*" :rows="gridRows">
        <ScrollView class="main" orientation="vertical" row="0" rowSpan="2" col="0">
          <component :is="page" :props="pageProperties" @returnHome="returnHome" />
        </ScrollView>
        <AbsoluteLayout class="header" row="0" col="0">
          <Image class="header-background" top="0" left="0" src="~/assets/images/header0.png" />
          <FlexboxLayout justifyContent="space-between" class="header-nav" top="0" left="0">
            <Label v-if="headerOpened" width="30" height="30" class="fas header-nav-toggle" @tap="toggleHeader">&#xf00d;</Label>
            <Label v-else width="30" height="30" class="fas header-nav-toggle" @tap="toggleHeader">&#xf0c9;</Label>
            <Image class="header-nav-home" width="30" height="30" @tap="returnHome" src="~/assets/icons/home-solid.png" />
          </FlexboxLayout>
          <AbsoluteLayout class="header-search" left="0" top="65">
            <TextField class="header-search-field" left="0" top="0" />
            <Label class="fas" left="20" top="12.5" width="20" height="20" scaleX="-1">&#xf002;</Label>
          </AbsoluteLayout>
          <ScrollView top="137" orientation="horizontal" scrollBarIndicatorVisible="false" class="header-buttons">
            <Label v-if="loadingServices" class="header-buttons-label" text="Загрузка услуг..." />
            <Label v-else-if="loadingError" class="header-buttons-label" text="Ошибка загрузки услуг." />
            <Label v-else-if="noAvailableServices" class="header-buttons-label" text="Нет доступных услуг." />
            <FlexboxLayout justifyContent="center">
              <Button class="fas" v-for="service in popularServices" :key="service.id" @tap="openServiceForm({id:service.id})">{{ service.icon }}</Button>
            </FlexboxLayout>
          </ScrollView>
        </AbsoluteLayout>
      </GridLayout>
    </Page>
  </Frame>
</template>

<script>

  function returnHome() {
    this.$navigateTo(() => this.page="Index");
    if (this.headerOpened) this.toggleHeader();
  };

  function openServiceForm(props) {
    this.$navigateTo(() => {
      this.pageProperties = props;
      this.page = "Form";
    });
    if (this.headerOpened) this.toggleHeader();
  }

  function toggleHeader(e) {
    if (this.headerOpened) {
      this.headerOpened = false;
      this.gridFirstRow = '60';
    } else {
      this.headerOpened = true;
      this.gridFirstRow = '225';
    }
  };

  import Index from './Index';
  import Form from './Form';

  import axios from 'axios';

  export default {
    data() {
        let popularServices = Array(),
            loadingServices = true,
            loadingError = false;

        axios.get(process.env.API_HOSTNAME + '/services', {
          params: {
            _limit: 10,
            rating_gt: 0,
            _sort: 'rating:desc'
          }
        })
          .then(data => {
            this.popularServices = data.data;
            this.loadingServices = false;
          })
          .catch(e => {
            this.loadingServices = false;
            this.loadingError = true;
            alert('Ну, ошибочка. Смотри.');
          });

      return {
        page: 'Index',
        pageProperties: null,

        headerOpened: false,
        gridFirstRow: '60',

        popularServices,
        loadingServices,
        loadingError
      }
    },
    methods: {
      toggleHeader,
      returnHome,
      openServiceForm
    },
    computed: {
      gridRows: function() {
        return this.gridFirstRow + ', *';
      },
      noAvailableServices: function() {
        return (this.popularServices.length === 0);
      }
    },
    components: {
      Index,
      Form
    }
  }

</script>  

<style lang="scss">

.header {
  width: 100%;
  * {
    z-index: 1;
  }
  &-background {
    width: 100%;
    z-index: 0;
  }
  &-nav {
    width: 100%;
    height: 60;
    padding: 15 10;
    label {
      color: rgba(white, .6);
      text-align: center;
      font-size: 30;
    }
    image {
      opacity: .6;
    }
  }
  &-search {
    width: 100%;
    &-field {
      width: 95%;
      margin: 0 2.5%;
      border-color: rgba(white, .6);
      background-color: rgba(white, .6);
      border-radius: 10;
      padding: 10 10 10 40;
    }
    label {
      opacity: .6;
      font-size: 20;
    }
  }
  &-buttons {
    width: 100%;
    &-label {
      text-align: center;
      color: black;
      background-color: rgba(white, .6);
      border-radius: 10;
      width: 95%;
      margin: 10 2.5% 0;
      padding: 0 0 5;
      font-size: 24;
      font-weight: 700;
    }
    button {
      width: 55;
      height: 55;
      background-color: rgba(white, .4);
      color: white;
      font-size: 24;
      border-radius: 50%;
      margin: 0 15;
    }
  } 
}

.main {
  margin: 60 0 0 0;
}

</style>
