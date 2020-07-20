<template>

  <StackLayout class="footer" orientation="horizontal" row="2" col="0">
    <Label v-for="(label, index) in labels" :class="(index === currentIndex ? 'fas current' : (index === chosenIndex ? 'fas chosen' : 'fas'))">{{ label.icon }}</Label>
  </StackLayout>

</template>

<script>

export default {
  data() {
    return {
      currentIndex: 1,
      chosenIndex: null,
      labels: [
        {
          icon: ''
        },
        {
          icon: ''
        },
        {
          icon: ''
        },
        {
          icon: ''
        },
        {
          icon: ''
        }
      ]
    }
  },
  methods: {
    touch(e) {
      console.log(this.buttonClasses);
    }
  },
  computed: {
    buttonClasses(index) {
      if (index === this.currentIndex) {
        return 'fas current';
      } else if (index === this.chosenIndex) {
        return 'fas chosen';
      } else {
        return 'fas';
      }
    }
  }
}

</script>

<style lang="scss">

.footer {
  width: 100%;
  label {
    width: 20%;
    padding-top: 10;
    background: #f1f1f1;
    border: none;
    box-shadow: none;
    border-radius: 0;
    font-size: 32;
    text-align: center;
    &.chosen {
      color: blue;
      opacity: .7;
    }
    &.current {
      color: blue;
      opacity: .8;
    }
  }
}

</style>