const request = require("request")

const geocode = (address,callback) =>{
    
    const geourl ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYm9zczIxMyIsImEiOiJja2Njempja3IwOWxvMnJwOTNqOXpoY3F2In0.EBokW-gCWCvTJQu8V6q95w'
    
    request ({url:geourl ,json :true},(error ,response) =>{
        if(error){
            callback('No network connected.Please check internet connection!!',undefined)
        }else if (response.body.features.length===0){
            callback('Unable to find location .Try again',undefined)
        }else{
            callback(undefined ,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode