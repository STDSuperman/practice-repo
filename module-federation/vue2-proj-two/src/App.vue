<template>
  <div id="app">
    <h1>Hello Other Vue2</h1>
    <HelloWorld2></HelloWorld2>
  </div>
</template>

<script>
import HelloWorld2 from '@v2hw/HelloWorld'
export default {
  name: 'App',
  components: {
    HelloWorld2
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
