<template>
  
  <component :is="page" :props="pageProps" @goToPage="goToPage" />

</template>

<script>
  import CreateField from './CreateField';
  import ChooseCategory from './ChooseCategory';
  import Index from './Index';

  export default {
    data() {
      return {
        page: 'Index',
        pageProps: {}
      }
    },
    methods: {
      goToPage(args) {
        if (args.page === "servicesLayout") {
          this.$emit('goToPage', {
            page: 'Index',
            props: {}
          });
        } else {
          this.page = args.page;
          this.pageProps = args.props;
        }
      }
    },
    components: {
      ChooseCategory,
      CreateField,
      Index
    }
  }

</script>

<style lang="scss">



</style>