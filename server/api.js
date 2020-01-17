const callesController = require(__dirname+'./../server/controllers/CallesController')
;(async function() {
    const results=  await callesController.getCalles();
    const locations = results.map((row) => {
      let geojson = JSON.parse(row.st_asgeojson)
      geojson.properties = { name: 'qweqweqwe', type: 'asdasd', id: 'adasdasd' }
      return geojson
    })
    console.log (locations)
  })()

