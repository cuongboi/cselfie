var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
    res.send('Hello world, I am a chat bot')
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'cuong') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})
EAAUHhKvuq0cBABvRIZBGEh9cqxZCdkNuJ3Dvs6Y3tlYte1lUjieumMSZADVZBzfiklQktBQvt5bnFRlp8L2PyjPSYxUZCEIZCgq7D77DvZAcQrDAm5tyz4aWuaI8Ju2gNhzKZBjxLoXTeSLCM712V5HS6EZCEZArb0ZCFvf68xcxKFitQZDZD
