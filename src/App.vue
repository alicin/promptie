<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import shame from './fileofshame'
export default {
  name: 'app',
  created () {
    window.App = this
    document.addEventListener('keypress', function () {
      document.getElementById('prompt').focus()
    })
    Math.easeInOutQuad = function (t, b, c, d) {
      t /= d / 2
      if (t < 1) return c / 2 * t * t + b
      t--
      return -c / 2 * (t * (t - 2) - 1) + b
    }
    shame()
  }
}
</script>

<style>
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
body {
  background: #000;
  color: #fff;
  margin: 0;
}
body, input, textarea, pre, code {
  font-family: Monaco, Menlo, "Courier New", monospace;
}
div {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.paint {
}
.paint.red {
  color: #ff6f6b;
}
.paint.green {
  color: #62f591;
}
.paint.yellow {
  color: #f3f7a2;
}
.paint.blue {
  color: #c9abf8;
}
.paint.magenta {
  color: #ff94d0;
}
.paint.cyan {
  color: #9dedfc;
}
.paint.gray {
  color: #bfbfbf;
}
.paint.bold {
  text-shadow: 0px 0px 1px;
}
.paint.underline {
  text-decoration: underline;
}
.paint.strikethrough {
  text-decoration: line-through;
}
.paint.italic {
  font-style: italic;
}
.paint.dim {
  opacity: 0.7;
}
.paint.command {
  cursor: pointer;
  border-bottom: 1px dotted #fff;
}
.paint a {
  cursor: pointer;
  color: #c9abf8;
  text-decoration: underline;
}
</style>
