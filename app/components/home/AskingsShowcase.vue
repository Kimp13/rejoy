<template>

  <ScrollView class="main-askings" orientation="vertical" @scroll="handleScroll">
    <Label class="main-askings-header 1" text="Заявки" />
    <StackLayout class="main-askings-content">
      <template v-for="asking in askings">
        <Label class="main-askings-header 2" :text="`Заявка #${asking.id} для услуги: ${asking.serviceName}`" textWrap="true" />
        <template v-for="field in asking.fields">
          <Label class="main-askings-header 3" :text="field.name + ':'" textWrap="true" />
          <Label class="main-askings-label" :text="field.value" textWrap="true" />
        </template>
      </template>
    </StackLayout>
  </ScrollView>

</template>

<script>

  export default {
    data() {
      process.socket.emit('getAskingsCount');

      process.socket.on('getAskingsCount', data => {
        this.count = data;

        process.socket.off('getAskingsCount');

        process.socket.on('getAskings', data => {
          this.skip += 100;
          this.askings = this.askings.concat(data);
        });

        this.addAskings();
      });

      return {
        askings: Array(),
        loading: true,
        loadingError: false,
        skip: 0,
        count: 0
      }
    },
    methods: {
      addAskings() {
        process.socket.emit('getAskings', {
          skip: this.skip
        });
      },
      handleScroll() {
        console.log('Ha-ha! You scrolled!');
      }
    }
  }

</script>

<style lang="scss">

.main-askings {
  width: 100%;

  &-header {
    color: black;
    text-align: center;
    &.1 {
      font-size: 28;
    }
    &.2 {
      font-size: 24;
      margin: 15 0 6 0;
    }
    &.3 {
      font-size: 20;
      margin: 4 0;
    }
  }

  &-label {
    text-align: center;
    color: gray;
    font-size: 20;
  }

}

</style>