<template>
  <div>
    <screen></screen>
    <prompt></prompt>
  </div>
</template>

<script>
  import Prompt from './terminal/Prompt'
  import Screen from './terminal/Screen'
  export default {
    name: 'promptie',
    components: {
      Prompt,
      Screen
    },
    data () {
      return {
      }
    }
  }
</script>

<style scoped>
  prompt {
    opacity: 0.5
  }
</style>
