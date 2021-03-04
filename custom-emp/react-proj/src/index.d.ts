declare module "*.svg" {
    const content: any;
    export default content;
}

declare module '@v2hw/HelloWorld' {
    const component: any;
    export default component;
}

declare module 'vuera' {
    export const ReactInVue: any;
    export const VueInReact: any;
    export const VueWrapper: any;
}