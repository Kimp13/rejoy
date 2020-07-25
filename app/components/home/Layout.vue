<template>

  <Frame>
    <Page>
      <ActionBar title="RE: joy." />
      <component :is="page" />
    </Page>
  </Frame>

</template>

<script>
  
  import Index from "./Index";

  export default {
    data() {
      return {
        user: process.socket.user,
        page: "Index"
      }
    },
    components: {
      Index
    }
  }

</script>