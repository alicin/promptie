<template>
  <div :class="{disabled: disabled}">
    <span class="prompt">$</span>
    <input id="prompt" type="text" v-model="command" @keyup.enter="execute(command)" :disabled="disabled">
  </div>
</template>

<script>
  import Runner from '../../bin/system/runner'
  export default {
    name: 'prompt',
    components: {
    },
    data () {
      return {
        disabled: false,
        command: ''
      }
    },
    methods: {
      execute (command) {
        this.command = ''
        Runner.run(command)
      }
    },
    created () {
      window.Prompt = this
    },
    mounted () {
      document.getElementById('prompt').focus()
    }
  }
</script>
  
<style scoped>
  div {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 41px;
    line-height: 41px;
    padding: 0 20px;
  }
  .disabled {
    opacity: 0.5
  }
  .prompt {
    font-weight: bold;
    font-size: 18px;
  }
  input {
    width: calc(100% - 50px);
    outline: none;
    border: none;
    background: transparent;
    color: #fff;
    font-weight: bolder;
    height: 40px;
    font-size: 16px;
  }
  input[disabled] {
    cursor: progress;
  }
</style>
