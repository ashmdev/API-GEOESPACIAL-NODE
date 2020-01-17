const { pool } = require("../database");

module.exports = {
  getCalles: async () => {
    const result = await pool.query(
      'SELECT ST_AsGeoJSON(geom), str_ldesc, shape_len  from red'
    );
    return result.rows;
  }
};
