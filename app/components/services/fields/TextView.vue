<template>

  <TextView class="main-form-contents-field" :hint="props.options.hint" :maxLength="props.options.maxLength" 

</template>

<script>

export default {
  props: [
    'props'
  ],
  data() {
    console.log('Text');
    console.log(this.props);
    return {
      
    }
  }
}

</script>

<style lang="scss">



</style>