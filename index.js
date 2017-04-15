<<<<<<< HEAD
﻿var express = require('express')
var bodyParser = require('body-parser')
var fs = require('fs');
=======
var express = require('express')
var bodyParser = require('body-parser')
>>>>>>> bc5181d2d746bb66603fe93193acd9c4ba941c04
var request = require('request')
var app = express()

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
<<<<<<< HEAD
    res.send('hello')
=======
    res.send('Hello world, I am a chat bot')
>>>>>>> bc5181d2d746bb66603fe93193acd9c4ba941c04
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

<<<<<<< HEAD
app.get('/quest', function (req, res) {
    if(req.query['hoi'].length > 0) {
        var t = req.query['hoi']
        g = require('./data.json')
        if(g[t] != 'undefined') {
            res.send(g['d']) 
        } else {
            res.send('i will be update')
        }
    } else {
        res.send('no data')
    }
})

=======
>>>>>>> bc5181d2d746bb66603fe93193acd9c4ba941c04
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
function getrep() {
<<<<<<< HEAD
request('http://c-selfie.com/api.php?hoi=' + t, function (error, response, body) {
  return body
});
}
=======
request('ftp://cselfie:Kimhai1510@c-selfie.com/public_html/api.json', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred 
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
  console.log('body:', body); // Print the HTML for the Google homepage. 
});
}
>>>>>>> bc5181d2d746bb66603fe93193acd9c4ba941c04
