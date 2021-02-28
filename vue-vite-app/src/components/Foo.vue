<template>
    <div class="foo">
        <p>这里是Foo</p>
        <div id="vue2Wrapper"></div>
        <vue2-component>
            <div>{{text}}</div>
        </vue2-component>
    </div>
</template>

<script>
import { vue2ToVue3 } from '../utils/index';
import Vue2Component from './vue2.component.vue';
import { ref } from 'vue';
export default {
    name: 'Foo',
    setup() {
        return {
            text: ref('测试哇')
        }
    },
    components: {
       'vue2-component': vue2ToVue3(Vue2Component, 'vue2Wrapper')
    }
}
</script>