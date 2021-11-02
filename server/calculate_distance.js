const rad = function(x) {
   return x * Math.PI / 180
}

function haversine(longitude_one, latitude_one, longitude_two, latitude_two){

    // Radius of earth in meter
   const r = 6371
   let dLat = rad(latitude_two)-rad(latitude_one)
   let dLon = rad(longitude_two)-rad(longitude_one)
   latitude_one = rad(latitude_one)
   latitude_two = rad(latitude_two)

   let a = Math.sin(dLat/2)**2 + Math.cos(latitude_one)*Math.cos(latitude_two)*Math.sin(dLon/2)**2
   let c = 2*Math.asin(Math.sqrt(a))
   return r * c
}

module.exports = haversine