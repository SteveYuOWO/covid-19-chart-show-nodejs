const Koa = require('koa')
const Router = require('koa-router')
const { exec } = require('./mysql')

var app = new Koa()
var router = new Router()

app.use(async (ctx, next) => {
	ctx.set("Access-Control-Allow-Origin", "http://localhost:3000")
	ctx.set("Access-Control-Allow-Credentials",true)
    await next();
});

router.get('/countrySumData', async (ctx, next) => {
    let countrySumData = await exec('SELECT * FROM country_sum')
    ctx.body = countrySumData
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3001)