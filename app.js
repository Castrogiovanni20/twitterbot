const config = require('./config')
const Twitter = require('twitter')
const axios = require('axios')

const client = new Twitter({
    consumer_key:     config.API_KEY,
    consumer_secret:  config.API_SECRET_KEY,
    access_token_key: config.ACCESS_TOKEN,
    access_token_secret: config.ACCES_TOKEN_SECRET
})

const type = ['Dolar Oficial', 'Dolar Promedio', 'Dolar Blue', 'Dolar Bolsa', 'Contado con liqui']
const endpoint = ['dolaroficial', 'dolarpromedio', 'dolarblue', 'dolarbolsa', 'contadoliqui']

for (let i = 0; i < type.length; i++) {
    main(type[i], endpoint[i])
}

async function main(name, endpoint){
    try {
        const data  = await getDolarInfo(endpoint)
        const tweet = name + "\n" + "FECHA: " + data.fecha + "\n" + "COMPRA: " + data.compra + "\n" + "VENTA: " + data.venta + "\n" + "#dolar #dolarinfo #dolarblue #argentina #economia"
        console.log(tweet)
        //await postTweet(tweet)
    }
    catch (e) {
       console.log(e) 
    }
}

async function getDolarInfo(endpoint){
    try {
       const res = await axios.get('https://api-dolar-argentina.herokuapp.com/api/' + endpoint)
       return res.data
    }
    catch (e) {
        console.log(e)
    }
}

async function postTweet(data){
    try {
        const result = await client.post('/statuses/update', { status: data })
        console.log(result)
    }
    catch (e) {
        console.log(e)
    }
}
