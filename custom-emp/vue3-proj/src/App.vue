<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <div id="vue2HW"></div>
  <Vue2HelloWorld></Vue2HelloWorld>
  <div id="vue2Remote"></div>
  <HelloWorldRemote></HelloWorldRemote>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import { vue2ToVue3, loadRemoteComponent } from './utils'
import HelloWorld2 from '@v2hw/HelloWorld'
loadRemoteComponent({
  url: 'http://localhost:5001/hello-world.js',
  scope: 'vue2Project',
  module: './HelloWorld.vue'
}).then(res => {
  console.log(res, vue2ToVue3(res, 'vue2Remote'))
})

export default {
  name: 'App',
  components: {
    HelloWorld,
    Vue2HelloWorld: vue2ToVue3(HelloWorld2, 'vue2HW')
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
