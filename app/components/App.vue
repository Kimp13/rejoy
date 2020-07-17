<template>
  <Page actionBarHidden="true">
    <GridLayout class="wrapper" columns="*" rows="auto, *, 50">
      <StackLayout class="main-control-panel" row="0" orientation="vertical">
        <Image width="20" height="20" horizontalAlignment="right" src="~/assets/icons/home.png" v-on:tap="returnHome" />
        <AbsoluteLayout>
          <TextField left="0" top="0" height="40" />
          <Image left="10" top="35" width="20" height="20" src="~/assets/icons/search.png"/>
        </AbsoluteLayout>
        <ScrollView orientation="horizontal" scrollBarIndicatorVisible="false" class="main-control-panel-buttons">
          <FlexboxLayout justifyContent="space-between">
            <Button width="55" height="55" text="" @tap="event" />
            <Button width="55" height="55" text="" @tap="event" />
            <Button width="55" height="55" text="" @tap="event" />
            <Button width="55" height="55" text="" @tap="event" />
            <Button width="55" height="55" text="" @tap="event" />
            <Button width="55" height="55" text="" @tap="event" />
            <Button width="55" height="55" text="" @tap="event" />
            <Button width="55" height="55" text="" @tap="event" />
          </FlexboxLayout>
        </ScrollView>
      </StackLayout>
      <ScrollView orientation="vertical" row="1" @scroll="scroll">
        <StackLayout orientation="vertical">
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
          <Label>lorem</Label>
        </StackLayout>
      </ScrollView>
      <GridLayout class="footer" row="2" col="0" columns="*, *, *, *, *" rows="*">
        <Label col="0">
          <Button text="test"/>
        </Label>
        <Label col="1"> 
          <Button text="test"/>
        </Label>
        <Label col="2">
          <Button text="test"/>
        </Label>
        <Label col="3">
          <Button text="test"/>
        </Label>
        <Label col="4">
          <Button text="test"/>
        </Label>
      </GridLayout>
    </GridLayout>
  </Page>
</template>

<script>
  export default {
    data() {
      return {
        previousScrolls: [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ],
        sumOfPreviousScrolls: 0,
        previousScroll: 0
      }
    },
    methods: {
      returnHome: e => {
        console.log('Returning home on', e.eventName);
      },
      event: e => {
        console.log(e.eventName);
      },
      scroll: function(event) {
        let difference = (this.previousScroll - event.scrollY),
            newPreviousScrolls = [];

        for (let i = 1; i < 10; i += 1) {
          newPreviousScrolls[i-1] = this.previousScrolls[i];
        }

        newPreviousScrolls[9] = difference;

        this.sumOfPreviousScrolls += (difference - this.previousScrolls[0]);
        this.previousScrolls = newPreviousScrolls;

        this.previousScroll = event.scrollY;
      }
    }
  }
</script>  

<style lang="scss">
* {
  z-index: 0;
}
.wrapper {
  .header {
    button {
      background: transparent;
      border-radius: 50%;
      z-index: 1;
    }
  }
  .main {
    &-control-panel {
      background-image: url('~/assets/images/control-panel.png');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      padding: 20 20 40;
      textfield {
        width: 100%;
        margin: 26 0 32;
        border-color: white;
        background-color: white;
        opacity: .4;
        border-radius: 10;
        padding: 10 10 10 40;
      }
      &-buttons {
        width: 100%;
        button {
          background-color: white;
          opacity: .4;
          border-radius: 50%;
          margin: 0 15;
        }
      }
    }
  }
}
</style>
