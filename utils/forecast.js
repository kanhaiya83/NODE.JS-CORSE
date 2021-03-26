const request=require("request")

const forecast=(longitude,latitude,callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=4d89f1beebb326648cf892c905638214&query=${longitude},${latitude}`
    

    request({url:url,json:true},(error,{body})=>{
      if(error){
         callback("Unable to fetch data from weatherstack",undefined)
     }
        else if(body.success===false){
            
        callback("Couldnt find your location",undefined)
        
       }
        else{
            const forecastmsg="It is currently "+body.current.temperature+" degress out,but it feelslike "+body.current.feelslike+" degrees."
            callback(undefined,forecastmsg)
}
})
}

module.exports=forecast