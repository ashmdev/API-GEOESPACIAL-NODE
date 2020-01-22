var text1 = '{ "nombre":"abdelkarin" }';
var text2 = '{ "casa":"caaasasss" }';
var json1 = JSON.parse(text1);
var json2 = JSON.parse(text2);

var obj = Object.assign({}, json1, json2)
console.log(JSON.stringify(obj))

//https://blog.patricktriest.com/game-of-thrones-leaflet-webpack/