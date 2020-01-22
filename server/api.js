
const Router = require('koa-router');
const cache = require('./cache');
const joi = require('joi');
const validate = require('koa-joi-validate');
//const callesController = require(__dirname+'./../server/controllers/CallesController');
const tramosController = require(__dirname+'./../server/controllers/TramosController');
//const callesController = require(__dirname+'./../server/controllers/CamarasController');
//const callesController = require(__dirname+'./../server/controllers/FlujosController');
const router = new Router();

const idsvValidator = validate({
  params: { idsv: joi.number().required() }
})
//const fs = require('fs') 
router.get('/tramos/:idsv', idsvValidator, async ctx => {
  const idsv = ctx.params.idsv
  const results = await tramosController.getTramos(idsv)
  if (results.length === 0) { ctx.throw(404) }
  // Add row metadata as geojson properties
  const locations = results.map((row) => {
    let geojson = JSON.parse(row.st_asgeojson)
    geojson.properties = { identifica: row.identifica, idsv: row.idsv, shape_leng: row.shape_leng , diametro: row.diametro, material: row.material}
    return geojson
  })
  ctx.body = locations
})

router.get('/test/:idsv', idsvValidator, async ctx => {
  const idsv = ctx.params.idsv
  const results = await tramosController.getTest(idsv)
 // if (results.length === 0) { ctx.throw(404) }
  // Add row metadata as geojson properties
  //console.log(results)
  ctx.body = results
})
module.exports = router



/* 
;(async function() {
  const results=  await callesController.getCalles();
  const locations={};
  locations.type = 'FeatureCollection';
  locations.features = results.map((row) => {
    let geojson = {};
    geojson.type ='Feature'
    geojson.geometry = JSON.parse(row.st_asgeojson)
    geojson.properties = { dirección: row.str_ldesc, largo: row.shape_len }
    return geojson
  })
  console.log (JSON.stringify(locations))
  fs.writeFile('Output.txt', JSON.stringify(locations), (err) => { 
    // In case of a error throw err. 
    if (err) throw err; 
}) 
})()
 */
