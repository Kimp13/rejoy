<template>

  <ListPicker class="main-form-contents-field" :items="props.items" v-model="selectedItem" />

</template>

<script>

export default {
  props: [
    'props'
  ],
  data() {
<<<<<<< HEAD
=======
    console.log('List');
    console.log(this.props);
>>>>>>> af1851621ef55235b1f3fca976b4d87a8b579a6d
    return {
      selectedItem: this.props.items[0]
    }
  }
}

</script>

<style lang="scss">



</style>