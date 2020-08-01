const config = require('./config')
const Twitter = require('twitter')

const client = new Twitter({
    consumer_key: config.API_KEY,
    consumer_secret: config.API_SECRET_KEY,
    access_token_key: config.ACCESS_TOKEN,
    access_token_secret: config.ACCES_TOKEN_SECRET
})

client.post('/statuses/update', {
    status: 'Testing Twitter API from Node.js app'
}).then((tweet) =>{
    console.log(tweet)
}).catch((error) => {
    console.log(error)
})