var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var fs = require('fs')
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

app.get('/data', function (req, res) {
    g = require ('./data.js')
    res.send(g)
})

app.get('/build', function (req, res) {
    if(req.query['api'].length > 0) {
        if(req.query['api'] === 'passapi') {
            request('http://c-selfie.com/api.json').pipe(fs.createWriteStream('data.json'))
            res.sendStatus(200)
        } else {
          res.sendStatus(301)  
        }
    } else {
        res.sendStatus(301)  
    }
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

app.post('/webhook/', function (req, res) {
    messaging_events = req.body.entry[0].messaging
    for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i]
        sender = event.sender.id
        if (event.message && event.message.text) {
            text = event.message.text
         if (text == 'hi' || text == 'hello') {
         sendMessage(sender, "Hi, Can I Help You")
         } else {
         sendMessage(sender, "I will reply soon")
         }
            
        }
    }
    res.sendStatus(200)
})


 
function sendMessage(sender, text) {
    messageData = {
        text:text
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:"EAAS2PjFzojABADJVx48WvXxmxbRkmfk6fibi6ZCeVxGSZAI92QR46ZBf7UUykxrZBufz2T5vFD7JuZCEc4ES0ZA5IafYjub4FNIDMZALQBeW9qE8u9uLmMWAmRD8R2W4ZAZC18ajMH1Q92YpaiaFW1Gf76oqUklsgsRTEQLr5i8X99QZDZD"},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}
