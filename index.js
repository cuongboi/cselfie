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
// Đoạn code xử lý khi có người nhắn tin cho bot

app.post('/webhook', function(req, res) {

  var entries = req.body.entry;

  for (var entry of entries) {

    var messaging = entry.messaging;

    for (var message of messaging) {

      var senderId = message.sender.id;

      if (message.message) {

        // Nếu người dùng gửi tin nhắn đến

        if (message.message.text) {

          var text = message.message.text;

          if(text == 'hi' || text == "hello")

          {

            sendMessage(senderId, "C-selfie: " + 'Xin Chào, có thể giúp gì cho bạn ngay bây giờ');

          }

          else{sendMessage(senderId, "C-selfie: " + "Xin lỗi, câu hỏi của bạn chưa có trong hệ thống, chúng tôi sẽ cập nhật sớm nhất.");}

        }

      }

    }

  }

 

  res.status(200).send("OK");

});

 

// Gửi thông tin tới REST API để Bot tự trả lời

function sendMessage(senderId, message) {

  request({

    url: 'https://graph.facebook.com/v2.6/me/messages',

    qs: {

      access_token: "EAAUHhKvuq0cBADleSnqf2sRxoQMW5T0gnWWYtfgozIoypvKyZCjeJwWdU9TyPRynlmEWDVAHlzmAyJg89grv6bGUk1p8hN8A6Fl27NZBuVxTMVvuYIrL9KJBaXPaXterieCdjD18CAy2xtYnVGL9bb3a9IYqSqX8NefaI9ZBwZDZD",

    },

    method: 'POST',

    json: {

      recipient: {

        id: senderId

      },

      message: {

        text: message

      },

    }

  });

}

