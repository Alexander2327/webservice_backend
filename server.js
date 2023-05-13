const http = require('http');
const Koa = require('koa');
const { koaBody } = require('koa-body');
const cors = require('@koa/cors');
const slow = require('koa-slow');
const Router = require('koa-router');
const data = require('./Data');

const router = new Router();

router.get('/news', async (ctx) => {
  ctx.response.body = {
    status: 'ok',
    data: data.postGenerator(),
  }
});

const app = new Koa();
app.use(slow({
  delay: 5000
}));

app.use(koaBody({
  text: true,
  urlencoded: true,
  multipart: true,
  json: true,
}));

app.use(cors({
  origin: '*',
  credentials: true,
  'Access-Control-Allow-Origin': true,
  allowMethods: ['GET'],
}));

app.use(router.routes());

const port = process.env.PORT || 9060;
const server = http.createServer(app.callback());

server.listen(port);
console.log(`The server started on port ${port}`);
