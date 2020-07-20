<template>

    <StackLayout class="main-container" orientation="vertical">
      <template v-for="(category, index) in mainServiceCategories">
        <Label class="main-container-label" :text="category.name" :key="'l' + index"/>
        <ScrollView class="main-container-scroll" :key="'s' + index" orientation="horizontal" scrollBarIndicatorVisible="false">
            <FlexboxLayout justifyContent="center">
              <AbsoluteLayout v-for="(item, index) in category.services" :key="'a' + index" class="main-container-scroll-item" :style="{backgroundImage: `url('${item.image}')`}" />
            </FlexboxLayout>
        </ScrollView>
      </template>
    </StackLayout>

</template>

<script>

  let serviceCategories = [
    {
      name: 'Выгул собак',
      type: 'main',
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
      type: 'main',
      services: [
        {
          image: '~/assets/images/cats0.png',
        },
        {
          image: '~/assets/images/cats1.png',
        }
      ]
    },
    {
      type: 'header',
      services: [

      ]
    }
  ];

  export default {
    data() {
      return {
        serviceCategories
      }
    },
    computed: {
      mainServiceCategories() {
        let cats = Array();
        for (let i = 0; i < this.serviceCategories.length; i += 1) {
          if (this.serviceCategories[i].type === 'main') {
            cats.push(this.serviceCategories[i]);
          }
        }
        return cats;
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

</style>