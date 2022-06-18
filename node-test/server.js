const Koa = require('koa');
const koaStatic = require('koa-static');
const KoaRouter = require('koa-router')
const router = new KoaRouter();

const app = new Koa();
app.use(koaStatic('.'))


router.get('/test', ctx => {
    console.log('****ctx', ctx.headers);
})

app
    .use(router.routes())
    .use(router.allowedMethods());;
app.listen(4000, () => {
    console.log('static server is listening at localhost:4000')
});