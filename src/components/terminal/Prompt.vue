<template>
  <div :class="{disabled: disabled}">
    <span class="prompt">{{ prompt }}</span>
    <input id="prompt" type="text" 
    v-model="command" @keyup.enter="execute(command)" 
    @keyup.up="historyBack()" @keyup.down="historyForward()"
    :disabled="disabled">
  </div>
</template>

<script>
  import Runner from '../../bin/system/runner'
  let history = []
  let historyIndex = 0
  let currentCommand = ''
  let $input
  export default {
    name: 'prompt',
    components: {
    },
    data () {
      return {
        prompt: '$',
        disabled: false,
        command: ''
      }
    },
    methods: {
      execute (command) {
        this.command = ''
        if (command === '') {
          return TerminalScreen.push(this.prompt)
        }
        Runner.run(command)
        history.push(command)
      },
      historyBack () {
        if (!currentCommand) {
          currentCommand = this.command
        }
        if (history.length && history.length > historyIndex) {
          this.pushCaretToEnd()
          this.command = history[history.length - 1 - historyIndex]
          historyIndex++
        }
      },
      historyForward () {
        if (historyIndex > 0) {
          this.command = history[history.length + 1 - historyIndex]
          if (!this.command) {
            this.command = currentCommand
            currentCommand = undefined
          }
          this.pushCaretToEnd()
          historyIndex--
        }
      },
      getCaretPosition () {
        if ('selectionStart' in $input) {
          return $input.selectionStart
        } else if (document.selection) {
          $input.focus()
          var sel = document.selection.createRange()
          var selLen = document.selection.createRange().text.length
          sel.moveStart('character', -$input.value.length)
          return sel.text.length - selLen
        }
      },
      setCaretPostion (caretPos) {
        if ($input.createTextRange) {
          var range = $input.createTextRange()
          range.move('character', caretPos)
          range.select()
        } else {
          $input.focus()
          if ($input.selectionStart !== undefined) {
            $input.setSelectionRange(caretPos, caretPos)
          }
        }
      },
      pushCaretToEnd () {
        this.setCaretPostion(this.command.length)
      }
    },
    created () {
      window.Prompt = this
    },
    mounted () {
      $input = document.getElementById('prompt')
      $input.focus()
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
