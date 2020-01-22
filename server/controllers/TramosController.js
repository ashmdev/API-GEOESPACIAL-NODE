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
    
    // obtengo los tramos y las camaras que están intersectados espacialmente(join espacial)
    const query =  `  select ras.identifica as tramoid, cas.identifica as camaraid
                      from red2019 ras
                      inner join camaras cas
                      on ST_Intersects(ras.geom,cas.geom)
                      where idsv = $1`;
    // ejecuto consulta y la asigo a variable
    const result = await pool.query(query,[idsv]);

    // array para almacenar id´s de cámaras y de tramo    
    let tramos = [];
    let camaras = [];
    
    // lleno los array con los resultados de la consulta
    result.rows.forEach(element => {
      tramos.push(element.tramoid);
      camaras.push(element.camaraid)
    });

    // elimino elementos repetidos
    tramos=Array.from(new Set(tramos));
    camaras=Array.from(new Set(camaras));

    let consultaTramos = 
      `SELECT jsonb_build_object(
        'type',     'FeatureCollection',
        'features', jsonb_agg(feature)
    ) as tramosFeatureCollection
    FROM (
      SELECT jsonb_build_object(
        'type',       'Feature',
        'id',         id,
        'geometry',   ST_AsGeoJSON(geom)::jsonb,
        'properties', to_jsonb(row) - 'id' - 'geom'
      ) AS feature
      FROM 
      (select * from red2019 where identifica = ANY($1::int[]) ) row) features
    `;

    let consultaCamaras = 
    `SELECT jsonb_build_object( 
      'type',     'FeatureCollection',
      'features', jsonb_agg(feature)
  ) as camarasFeatureCollection
  FROM (
    SELECT jsonb_build_object(
      'type',       'Feature',
      'id',         id,
      'geometry',   ST_AsGeoJSON(geom)::jsonb,
      'properties', to_jsonb(row) - 'id' - 'geom'
    ) AS feature
    FROM 
    (select * from camaras where identifica = ANY($1::int[]) ) row) features
  `;

  let consultaFlujos= 
  `SELECT jsonb_build_object( 
    'type',     'FeatureCollection',
    'features', jsonb_agg(feature)
) as flujosFeatureCollection
FROM (
  SELECT jsonb_build_object(
    'type',       'Feature',
    'id',         id,
    'geometry',   ST_AsGeoJSON(geom)::jsonb,
    'properties', to_jsonb(row) - 'id' - 'geom'
  ) AS feature
  FROM 
  (select * from flujos where idflujo = ANY($1::int[]) ) row) features
`;

    const resultadoTramos = await pool.query(consultaTramos,[tramos]);
    const resultadoCamaras = await pool.query(consultaCamaras,[camaras]);
    const resultadoFlujos = await pool.query(consultaFlujos,[tramos]);
    var obj = Object.assign({}, resultadoCamaras.rows[0], resultadoTramos.rows[0], resultadoFlujos.rows[0])

    //console.log(tramos)
    return obj;
  }  
};
