<template>
  <div id="app">
    <h1>Hello Other Vue2</h1>
    <HelloWorld msg="我是本地Vue组件"></HelloWorld>
    <HelloWorld2 msg="我是远程Vue组件"></HelloWorld2>
  </div>
</template>

<script>
import HelloWorld2 from '@v2hw/HelloWorld'
import HelloWorld from './components/HelloWorld'
export default {
  name: 'App',
  components: {
    HelloWorld2,
    HelloWorld
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
