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
<style src="./bin/system/paint.css"></style>
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
</style>
