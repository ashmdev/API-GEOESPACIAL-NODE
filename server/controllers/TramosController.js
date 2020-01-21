const { pool } = require("../database");

module.exports = {
  getSubCuenca: async (idsv) => {
    const query =  `SELECT ST_AsGeoJSON(geom), identifica, idsv, shape_leng, diametro, material
                    From red 
                    where idsv = $1`;
    const result = await pool.query(query,[idsv]);

    
    return result.rows;
  },
  getTest: async (idsv) => {
    const query =  `  select ras.identifica as tramoid, cas.identifica as camaraid
                      from red2019 ras
                      inner join camaras cas
                      on ST_Intersects(ras.geom,cas.geom)
                      where idsv = $1`;
    const result = await pool.query(query,[idsv]);
    let tramos = [];
    let camaras = [];
    result.rows.forEach(element => {
      tramos.push(element.tramoid);
      camaras.push(element.camaraid)
    });
    console.log(tramos)
    return result.rows;
  }  
};
