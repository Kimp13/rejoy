<template>

  <ListPicker class="main-form-contents-field" :items="props.items" v-model="selectedItem" />

</template>

<script>

export default {
  props: [
    'props'
  ],
  data() {
    console.log('List');
    console.log(this.props);
    return {
      selectedItem: this.props.items[0]
    }
  }
}

</script>

<style lang="scss">



</style>