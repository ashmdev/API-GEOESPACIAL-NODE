const Koa = require("koa");
const cors = require("@koa/cors");
const log = require("./logger");
const api = require("./api");

//Setup Server Koa
const app = new Koa();
const port = process.env.PORT || 5000;

//Aplicando configuración del CORS
const origin = process.env.CORS_ORIGIN | "*";
app.use(cors({ origin }));

//Generamos un log de todas la peticiones
app.use(async (ctx, next) => {
  const start = Date.now();
  await next(); // This will pause the control flow until the endpoint handler has resolved
  const responseTime = Date.now() - start;
  log.info(`${ctx.method} ${ctx.status} ${ctx.url} - ${responseTime} ms`);
});

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    log.error(`Request Error ${ctx.url} - ${err.message}`);
  }
});

app.use(async (ctx, next) => {
  await next();
  // Allow browser to cache JSON responses
  ctx.set("Cache-Control", "public, max-age=3600");
});

//Montamos las rutas
app.use(api.routes(), api.allowedMethods());

//Iniciamos la app
app.listen(port, () => {
  log.info(`El server está escuchando en el puerto ${port}`);
});
