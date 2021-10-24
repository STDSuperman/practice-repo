<template>
    <div class="foo">
        <p>这里是Foo</p>
        <div id="vue2Wrapper"></div>
    </div>
</template>

<script>
import { ref } from 'vue';
export default {
    name: 'Foo',
    setup() {
        return {
            text: ref('测试哇')
        }
    }
}
</script>