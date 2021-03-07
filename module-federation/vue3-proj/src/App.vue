<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <div id="vue2HW"></div>
  <Vue2HelloWorld></Vue2HelloWorld>
  <div id="vue2Remote"></div>
  <dynamicHelloWorld></dynamicHelloWorld>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import { vue2ToVue3, loadRemoteComponent } from './utils'
import HelloWorld2 from '@v2hw/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Vue2HelloWorld: vue2ToVue3(HelloWorld2, 'vue2HW'),
    dynamicHelloWorld: defineAsyncComponent(async () => {
        const component = await loadRemoteComponent({
            url: 'http://localhost:5001/hello-world.js',
            scope: 'vue2Project',
            module: './HelloWorld'
        });
        return vue2ToVue3(component.default, 'vue2Remote');
    })
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
