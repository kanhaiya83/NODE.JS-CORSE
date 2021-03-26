const request=require("request")


const geocode=(address,callback)=>{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1Ijoia2FuaGFpeWE4MyIsImEiOiJja2x3MTFqZm4xM2NzMm9vNWp0M25zMnIwIn0.Nkg_6Q7FFA_02L78V5TjzA&limit=1"

    request({url:url,json:true},(error,{body}={})=>{
        
         if(error){
             callback("Unable to fetch the data!!",undefined)
         }

         else if(body.features.length===0){
             callback("Unable to fetch data for given location",undefined)
         }
         else{
            const data=body
            
            callback(undefined,{
                longitude:data.features[0].geometry.coordinates[1],
                latitude:data.features[0].geometry.coordinates[0],
                location:data.features[0].place_name
            })
         }
        
    })

}

module.exports=geocode