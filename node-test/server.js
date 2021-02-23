const Koa = require('koa');
const koaStatic = require('koa-static');

const app = new Koa();
app.use(koaStatic('.'))
app.listen(4000, () => {
    console.log('static server is listening at localhost:4000')
});