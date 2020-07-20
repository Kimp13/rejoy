<template>

<FlexboxLayout alignItems="center" justifyContent="center" class="main-coming-soon-container">
  <Label text="coming soon" />
</FlexboxLayout>

</template>

<script>

  export default {
    data() {
      return {

      }
    }
  }

</script>

<style lang="scss">

.main-coming-soon-container {
  background: black;
  height: 100%;
  label {
    background: black;
    color: white;
    font-family: Quicksand Light;
    font-weight: 300;
    font-size: 48;
  }
}

</style>