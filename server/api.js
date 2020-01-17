const callesController = require(__dirname+'./../server/controllers/CallesController')
const fs = require('fs') 
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

