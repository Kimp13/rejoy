<template>
  <Page actionBarHidden="true">
    <GridLayout class="wrapper" columns="*" :rows="gridRows">
      <ScrollView class="main" orientation="vertical" row="0" rowSpan="2" col="0">
        <component :is="page" />
      </ScrollView>
      <AbsoluteLayout class="header" row="0" col="0">
        <Image class="header-background" top="0" left="0" src="~/assets/images/header0.png" />
        <DockLayout class="header-nav" top="0" left="0">
          <Label v-if="headerOpened" class="fas header-nav-toggle" width="30" height="30" dock="left" @tap="toggleHeader">&#xf00d;</Label>
          <Label v-else class="fas header-nav-toggle" width="30" height="30" dock="left" @tap="toggleHeader">&#xf0c9;</Label>
          <Label class="fas header-nav-home" text="tst" width="30" height="30" dock="right" @tap="returnHome">&#xf016;</Label>
        </DockLayout>
        <AbsoluteLayout class="header-search" left="0" top="65">
          <TextField class="header-search-field" left="0" top="0" />
          <Label class="fas" left="20" top="12.5" width="20" height="20" scaleX="-1">&#xf002;</Label>
        </AbsoluteLayout>
        <ScrollView top="137" orientation="horizontal" scrollBarIndicatorVisible="false" class="header-buttons">
          <FlexboxLayout justifyContent="space-between">
            <Button text="" @tap="goToComingSoon" />
            <Button text="" @tap="goToComingSoon" />
            <Button text="" @tap="goToComingSoon" />
            <Button text="" @tap="goToComingSoon" />
            <Button text="" @tap="goToComingSoon" />
            <Button text="" @tap="goToComingSoon" />
            <Button text="" @tap="goToComingSoon" />
            <Button text="" @tap="goToComingSoon" />
          </FlexboxLayout>
        </ScrollView>
      </AbsoluteLayout>
    </GridLayout>
  </Page>
</template>

<script>

  function returnHome() {
    this.$navigateTo(() => this.page="Index");
    if (this.headerOpened) this.toggleHeader();
  };

  function goToComingSoon() {
    this.$navigateTo(() => this.page = "ComingSoon");
    this.toggleHeader();
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
  import ComingSoon from './ComingSoon';

  export default {
    props: [
      'page'
    ],
    data() {
      return {
        headerOpened: false,
        gridFirstRow: '60'
      }
    },
    methods: {
      toggleHeader,
      returnHome,
      goToComingSoon
    },
    computed: {
      gridRows: function() {
        return this.gridFirstRow + ', *';
      }
    },
    components: {
      Index,
      ComingSoon
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
    padding: 0 10;
    label {
      color: white;
      text-align: center;
      font-size: 30;
      opacity: .6;
    }
  }
  &-search {
    width: 100%;
    &-field {
      width: 95%;
      margin: 0 2.5%;
      border-color: white;
      background-color: white;
      opacity: .6;
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
    button {
      width: 55;
      height: 55;
      background-color: white;
      opacity: .4;
      border-radius: 50%;
      margin: 0 15;
    }
  } 
}

.main {
  margin: 60 0 0 0;
}

</style>
