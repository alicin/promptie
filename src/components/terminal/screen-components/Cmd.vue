<template>
  <code @click="execute">{{ runnable }}</code>
</template>

<script>
  import Runner from '../../../bin/system/runner'
  export default {
    name: 'cmd',
    props: ['runnable'],
    components: {
    },
    data () {
      return {}
    },
    methods: {
      execute () {
        Runner.run(this.runnable)
      }
    },
    created () {
    },
    mounted () {
      document.getElementById('prompt').focus()
    }
  }
</script>
  
<style scoped>
  code {
    cursor: pointer;
    color: inherit;
    border-bottom: 1px dotted #fff;
  }
</style>
