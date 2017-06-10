<template>
  <div class="screen">
    <div v-for="line in lines">
      <pre :class="{newline: line.newline}" 
      v-if="line.html" v-html="line.text"></pre>
      <pre :class="{newline: line.newline}" 
      v-if="!line.html">{{ line.text }}</pre>
    </div>
  </div>
</template>

<script>
  import Cmd from './screen-components/Cmd'
  
  export default {
    name: 'screen',
    components: {
      Cmd
    },
    data () {
      return {
        lines: []
      }
    },
    methods: {
      pushNewLine () {
        this.lines.push({
          newline: true
        })
      },
      push (line, escapeHtml = false) {
        this.lines.push({
          text: line,
          html: !escapeHtml
        })
        setTimeout(() => {
          this.scrollBottom()
        }, 1)
      },
      replaceLastLine (line) {
        this.lines[this.lines.length - 1].text = line
      },
      removeLastLine () {
        this.lines.pop()
      },
      scrollBottom () {
        let start = this.$el.scrollTop
        let change = this.$el.scrollHeight - (this.$el.clientHeight + this.$el.scrollTop)
        let currentTime = 0
        let increment = 20
        let duration = 100

        var animateScroll = () => {
          currentTime += increment
          var val = Math.easeInOutQuad(currentTime, start, change, duration)
          this.$el.scrollTop = val
          if (currentTime < duration) {
            setTimeout(animateScroll, increment)
          }
        }
        animateScroll()
      }
    },
    created () {
      window.TerminalScreen = this
    }
  }
</script>

<style scoped>
  .screen {
    max-height: calc(100vh - 41px);
    overflow: auto;
    position: fixed;
    left: 0;
    bottom: 41px;
    right: 0;
    z-index: 3;
  }
  pre {
    display: block;
    font-weight: bold;
    font-size: 12px;
    padding: 0 20px;
    margin: 5px;
  }
  .newline {
    width: 100%;
    height: 5px;
  }
</style>
