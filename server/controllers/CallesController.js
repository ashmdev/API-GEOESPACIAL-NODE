const {pool} = require('../database')

/*pool
  .query('SELECT $1::text as name', ['brianc'])
  .then(res => console.log(res.rows[0].name)) // brianc
  .catch(err => console.error('Error executing query', err.stack))
*/
module.exports = {
    /** Query the current time */
    getCalles: async () => {
      const result = await pool.query('SELECT ST_AsGeoJSON(geom), str_ldesc  from "Calles"');
      return result.rows;
    }
  
  }
  