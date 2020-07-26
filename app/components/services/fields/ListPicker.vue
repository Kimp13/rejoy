<template>

  <ListPicker class="main-form-contents-field" :items="props.items" v-model="selectedItem" @selectedIndexChange="sendNews" @loaded="sendNews" />

</template>

<script>

export default {
  props: [
    'props'
  ],
  data() {
    return {
      selectedItem: 0
    }
  },
  methods: {
    sendNews() {
      this.$emit('noErrors', {
        name: this.props.name,
        value: this.props.items[this.selectedItem]
      });
    }
  }
}

</script>

<style lang="scss">



</style>