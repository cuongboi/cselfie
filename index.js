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

app.post('/webhook/', function (req, res) { messaging_events = req.body.entry[0].messaging for (i = 0; i < messaging_events.length; i++) { event = req.body.entry[0].messaging[i] sender = event.sender.id if (event.message && event.message.text) { text = event.message.text sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200)) } } res.sendStatus(200) }) var token = "EAAUHhKvuq0cBAPrO5GzlA8BpCmbcZCtGr0rkVovhbEQS5lb2aJ3ZA9p2gQ7Ik0mUVWwzuYX3fFOoJuDZAVfZB9ZAZASLcd8kX4MHQwx2IdZASJStZCbziBSMI2b8FAWyVxZCQDKdzDakts3JjNjClOyiXF3UuvNC3GH1GlClMWo8liwZDZD"
function sendTextMessage(sender, text) { messageData = { text:text } request({ url: 'https://graph.facebook.com/v2.6/me/messages', qs: {access_token:token}, method: 'POST', json: { recipient: {id:sender}, message: messageData, } }, function(error, response, body) { if (error) { console.log('Error sending messages: ', error) } else if (response.body.error) { console.log('Error: ', response.body.error) } }) }
