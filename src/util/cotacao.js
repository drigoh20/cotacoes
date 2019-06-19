const request = require('request')

const api_token = 'JQNFE4egr2hlppiiP8SS2SOCT6AwzlSl2IB3THFmb9vEswMqzauV3osuSSgq'
    
const cotacao = (symbol, callback) => {

    const url = `https://api.worldtradingdata.com/api/v1/stock?symbol=${symbol}&api_token=${api_token}`
    
    request ({url:url, json:true},(err, response) => {
        if(err){
            callback({
                message:`Something went wrong: ${err}`,
                code: 500
            }, undefined)
        }
        else
        if(response.body === undefined || response.body.data === undefined){
            callback({
                message:`No data found`,
                code: 404
            }, undefined)
        }
        else{
            const parsedJSON = response.body.data[0]
            const {symbol, price_open, price, day_high, day_low } = parsedJSON  
                   
            callback(undefined,{symbol, price_open, price, day_high, day_low })
        }
    })
}

module.exports = cotacao