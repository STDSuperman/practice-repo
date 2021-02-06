<template>
<div>{{message}}</div>
</template>

<script>
import '../env';
import {
    ref
} from 'vue'

export default {
    name: 'App',
    setup(props) {
        const message = ref();
        fetch(window.env.apiUrl).then(res => res.json()).then(({
            msg
        }) => {
            message.value = msg;
        });

        return {
            message
        }
    }
}
</script>
