import Vue2 from './vue2';

export function vue2ToVue3(WrapperComponent, wrapperId) {
    let vm;
    return {
        mounted() {
            const slots = bindSlotContext(this.$slots, this.__self);
            vm = new Vue2({
                render: createElement => {
                    return createElement(
                        WrapperComponent,
                        {
                            on: this.$attrs,
                            attrs: this.$attrs,
                            props: this.$props,
                            scopedSlots: this.$scopedSlots
                        },
                        slots
                    )
                }
            });
            vm.$mount(`#${wrapperId}`)
        },
        props: WrapperComponent.props,
        render() {
            vm && vm.$forceUpdate();
        }
    }
}

function bindSlotContext(target = {}, context) {
    return Object.keys(target).map(key => {
        const vnode = target[key];
        vnode.context = context;
        return vnode;
    });
}


export async function loadRemoteComponent(config) {
    return loadScript(config).then(() => loadComponentByWebpack(config))
}

function loadScript(config) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = config.url
        script.type = 'text/javascript'
        script.async = true
        script.onload = () => {
            console.log(`Dynamic Script Loaded: ${config.url}`)
            document.head.removeChild(script);
            resolve();
        }
        script.onerror = () => {
            console.error(`Dynamic Script Error: ${config.url}`)
            document.head.removeChild(script)
            reject()
        }
        document.head.appendChild(script)
    })
}

function loadComponentByWebpack({ scope, module }) {
    return new Promise(resolve => {
        // Initializes the share scope. This fills it with known provided modules from this build and all remotes
        __webpack_init_sharing__('default').then(() => {
            const container = window[scope] // or get the container somewhere else
            // Initialize the container, it may provide shared modules
            container.init(__webpack_share_scopes__.default).then(() => {
                window[scope].get(module).then(factory => resolve(factory()));
            })
        })
    })
}