<template>


  <GridLayout rows="*, 60">
    <ContentView v-if="loaded" row="0">
      <component :is="currentFrame" />
    </ContentView>

    <Nav row="1" v-if="loaded" :currentFrameIndex="currentFrameIndex" v-on:changeFrame="changeFrame" />

    <Label v-else text="Загрузка пользователя..." />
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

const appSettings = require("tns-core-modules/application-settings");

export default {
  data() {
    new Promise((resolve, reject) => {
      if (appSettings.hasKey("jwt")) {
        process.socket.emit("auth", {
          jwt: appSettings.getString("jwt")
        });
        process.socket.on("auth", data => {
          process.socket.off("auth");
          resolve(data);
        });
      } else {
        resolve({
          isAuthenticated: false
        });
      }
    })
      .then((user) => {
        process.socket.user = user;
        this.loaded = true;
      });

    return {
      currentFrameIndex: 2,
      loaded: false,
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

