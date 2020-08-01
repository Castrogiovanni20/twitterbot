const config = require('./config')
const Twitter = require('twitter')
const axios = require('axios')
const cron = require("node-cron")
const moment = require('moment')

const client = new Twitter({
    consumer_key:     config.API_KEY,
    consumer_secret:  config.API_SECRET_KEY,
    access_token_key: config.ACCESS_TOKEN,
    access_token_secret: config.ACCES_TOKEN_SECRET
})

const type = ['Dolar Oficial', 'Dolar Promedio', 'Dolar Blue', 'Dolar Bolsa', 'Contado con liqui']
const endpoint = ['dolaroficial', 'dolarpromedio', 'dolarblue', 'dolarbolsa', 'contadoliqui']

cron.schedule("0 */4 * * *", function(){
    console.log("Running job")
    main()
})

async function main(){
    try {
        for (let i = 0; i < type.length; i++) {
            publishDolar(type[i], endpoint[i])
            if (i == type.length - 1){
                publishRiesgoPais()
            }
        }
        console.log('Tweets publicados exitosamente')
    }
    catch (e) {
        console.log(e)
    }
}

async function publishDolar(name, endpoint){
    try {
        const data  = await getDolarInfo(endpoint)
        const date = moment(data.fecha.substr(0, 16)).format("DD/MM/YYYY")
        const tweet = name + "\n" + "\n" + "FECHA: " + date + "\n" + "COMPRA: " + data.compra + "\n" + "VENTA: " + data.venta + "\n" + "\n" + "#dolar #dolarinfo #dolarblue #riesgopais #argentina #economia"
        await postTweet(tweet)
    }
    catch (e) {
       console.log(e) 
    }
}

async function publishRiesgoPais(){
    try {
        const data = await getRiesgoPais()
        const date = moment(data.fecha.substr(0, 16)).format("DD/MM/YYYY")
        const tweet = "RIESGO PAIS" + "\n" + "\n" + "FECHA: " + date + "\n" + "PUNTOS: " + data.valor + "\n" + "#dolar #dolarinfo #dolarblue #riesgopais #argentina #economia"
        await postTweet(tweet)
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

async function getRiesgoPais(){
    try {
        const res = await axios.get('https://api-dolar-argentina.herokuapp.com/api/riesgopais')
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
