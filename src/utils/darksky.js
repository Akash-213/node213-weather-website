const request=require('request')

const location_address =(latitude ,longitude ,callback) => {
    const url = 'https://api.darksky.net/forecast/fe41ab94a4f8dafe26c46a2ffedd10fc/'+latitude + ',' + longitude +'?units=si'

    request({url:url ,json : true},(error,response) => {
        if(error){
            callback('Please check internet connection' ,undefined)
        }else if(response.body.error){
            callback('Unable to find location' ,undefined)
        }else{
             callback(undefined,response.body.daily.data[0].summary +
            'The temperature outside is ' + response.body.currently.temperature + ' degree Celsius.')
        }
    
    })
}
module.exports = location_address
