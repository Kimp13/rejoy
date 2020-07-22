<template>

  <StackLayout class="footer" orientation="horizontal" row="2" col="0">
    <Label v-for="(label, index) in labels" :class="(index === currentFrameIndex ? 'fas current' : (index === chosenIndex ? 'fas chosen' : 'fas'))" :key="index" v-on:touch="touch($event, index)">{{ label.icon }}</Label>
  </StackLayout>

</template>

<script>

export default {
  props: [
    'currentFrameIndex'
  ],
  data() {
    return {
      chosenIndex: null,
      labels: [
        {
          icon: '\uf009'
        },
        {
          icon: '\uf15c'
        },
        {
          icon: '\uf015'
        },
        {
          icon: '\uf1ea'
        },
        {
          icon: '\uf05a'
        }
      ]
    }
  },
  methods: {
    touch(event, index) {
      if (event.action === 'down') {
        if (index === this.currentFrameIndex) {
          console.log('Why would you press that button?');
        } else {
          this.chosenIndex = index;
        }
      } else {
        if (index === this.currentFrameIndex) {
          console.log('You haven\'t even pressed that.');
        } else {
          this.chosenIndex = null;
          this.$emit('changeFrame', index);
        }
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
      background: blue;
      color: #f1f1f1;
      opacity: .8;
    }
    &.current {
      color: blue;
      opacity: .8;
    }
  }
}

</style>