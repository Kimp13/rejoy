<template>

  <GridLayout rows="*, 60">
    <ContentView row="0">
      <Frame>
        <Layout :page="page" />
      </Frame>
    </ContentView>

    <Nav row="1" />
  </GridLayout>

</template>

<script>
import Layout from './services/Layout';
import Nav from './Nav';

export default {
  data() {
    return {
      page: 'Index'
    };
  },
  components: {
    Layout,
    Nav
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

