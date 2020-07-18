<template>
  <Page actionBarHidden="true">
    <GridLayout class="wrapper" columns="*" :rows="gridRows">
      <ScrollView class="main" orientation="vertical" row="0" rowSpan="2" col="0">
        <StackLayout class="main-container" orientation="vertical">
          <template v-for="(category, index) in serviceCategories">
            <Label class="main-container-label" :text="category.name" :key="'l' + index"/>
            <ScrollView class="main-container-scroll" :key="'s' + index" orientation="horizontal" scrollBarIndicatorVisible="false">
                <FlexboxLayout justifyContent="center">
                  <AbsoluteLayout v-for="(item, index) in category.services" :key="'a' + index" class="main-container-scroll-item" :style="{backgroundImage: `url('${item.image}')`}" />
                </FlexboxLayout>
            </ScrollView>
          </template>
        </StackLayout>
      </ScrollView>
      <AbsoluteLayout class="header" row="0" col="0">
        <Image class="header-background" top="0" left="0" src="~/assets/images/header0.png" />
        <DockLayout class="header-nav" top="0" left="0" stretchLastChild="false">
          <Image v-if="headerOpened" class="header-nav-toggle" width="30" height="30" dock="left" @tap="toggleHeader" src="~/assets/icons/times-solid.png" />
          <Image v-else class="header-nav-toggle" width="30" height="30" dock="left" @tap="toggleHeader" src="~/assets/icons/bars-solid.png" />
          <Image class="header-nav-home" width="30" height="30" dock="right" src="~/assets/icons/home-solid.png" @tap="returnHome" />
        </DockLayout>
        <AbsoluteLayout class="header-search" left="0" top="65">
          <TextField class="header-search-field" left="0" top="0" />
          <Image left="20" top="12.5" width="20" height="20" scaleX="-1" src="~/assets/icons/search-solid.png" />
        </AbsoluteLayout>
        <ScrollView top="137" orientation="horizontal" scrollBarIndicatorVisible="false" class="header-buttons">
          <FlexboxLayout justifyContent="space-between">
            <Button text=""  />
            <Button text=""  />
            <Button text=""  />
            <Button text=""  />
            <Button text=""  />
            <Button text=""  />
            <Button text=""  />
            <Button text=""  />
          </FlexboxLayout>
        </ScrollView>
      </AbsoluteLayout>
      <StackLayout class="footer" orientation="horizontal" row="2" col="0">
        <Label text="1" />
        <Label text="2" />
        <Label text="3" />
        <Label text="4" />
        <Label text="5" />
      </StackLayout>
    </GridLayout>
  </Page>
</template>

<script>
  function returnHome() {
    console.log(`Grid first row spans ${this.gridFirstRow} pixels.`);
  };

  function toggleHeader(e) {
    if (this.headerOpened) {
      this.headerOpened = false;
      this.gridFirstRow = '60';
    } else {
      this.headerOpened = true;
      this.gridFirstRow = '225';
    }
  };

  let serviceCategories = [
    {
      name: 'Выгул собак',
      services: [
        {
          image: '~/assets/images/dogs0.png',
        },
        {
          image: '~/assets/images/dogs1.png',
        }
      ]
    },
    {
      name: 'Выгул котов',
      services: [
        {
          image: '~/assets/images/cats0.png',
        },
        {
          image: '~/assets/images/cats1.png',
        }
      ]
    }
  ];

  export default {
    data() {
      return {
        headerOpened: false,
        gridFirstRow: '60',
        serviceCategories
      }
    },
    methods: {
      toggleHeader,
      returnHome
    },
    computed: {
      gridRows: function() {
        return this.gridFirstRow + ', *, 50';
      }
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
    image {
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
    image {
      opacity: .6;
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
  &-container {
    &-label {
      font-style: italic;
      font-size: 25;
      margin: 10 25;
    }
    &-scroll {
      &-item {
        width: 250;
        height: 120;
        border-radius: 10;
        margin: 0 10;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
      }
    }
  }
}

.footer {
  width: 100%;
  label {
    width: 20%;
    background: #f1f1f1;
    font-size: 30;
    font-weight: 900;
    text-align: center;
  }
}
</style>
