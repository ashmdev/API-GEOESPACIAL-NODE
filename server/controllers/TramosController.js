const { pool } = require("../database");

module.exports = {
  getTramos: async (idsv) => {
    const query =  `SELECT ST_AsGeoJSON(geom)
                    From red 
                    where idsv = $1`;
    const result = await pool.query(query,[idsv]);
    return result.rows;
  }
};
