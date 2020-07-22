<template>

  <GridLayout rows="*, 60">
    <ContentView row="0">
      <component :is="currentFrame" />
    </ContentView>

    <Nav row="1" :currentFrameIndex="currentFrameIndex" v-on:changeFrame="changeFrame" />
  </GridLayout>

</template>

<script>
import TrollLayout from './not-ready/Layout';
import ServicesLayout from './services/Layout';
import HomeLayout from './home/Layout';
import NewsLayout from './news/Layout';
import InfoLayout from './info/Layout';
import Nav from './Nav';
import Vue from 'vue';

process.env.API_HOSTNAME = 'http://192.168.1.147:1337';

export default {
  data() {
    return {
      currentFrameIndex: 2,
      layouts: [
        TrollLayout,
        ServicesLayout,
        HomeLayout,
        NewsLayout,
        InfoLayout
      ]
    };
  },
  components: {
    TrollLayout,
    ServicesLayout,
    HomeLayout,
    NewsLayout,
    InfoLayout,
    Nav
  },
  methods: {
    changeFrame(data) {
      this.currentFrameIndex = data;
    }
  },
  computed: {
    currentFrame() {
      return this.layouts[this.currentFrameIndex];
    }
  }
}
</script>

<style global>

.fas {
  font-family: fa-solid-900, Font Awesome 5 Free Solid;
}

.far {
  font-family: fa-regular-400, Font Awesome 5 Free Regular;
}

.fab {
  font-family: fa-brands-400, Font Awesome 5 Brands Regular;
}

</style>

