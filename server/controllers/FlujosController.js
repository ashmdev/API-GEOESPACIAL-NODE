const { pool } = require("../database");
module.exports = {
    getCalles: async () => {
      const result = await pool.query(
        'SELECT ST_AsGeoJSON(geom), str_ldesc, shape_len  from "Calles"'
      );
      return result.rows;
    }
  };