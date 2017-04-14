
Skip to content
This repository

    Pull requests
    Issues
    Gist

    @cuongboi

1
0

    0

cuongboi/cselfie
Code
Issues 0
Pull requests 0
Projects 0
Wiki
Pulse
Graphs
Settings
cselfie/index.js
aa93199 3 minutes ago
@cuongboi cuongboi update
76 lines (67 sloc) 2.06 KB
// A simple chat bot server
 
var logger = require('morgan');
var http = require('http');
var bodyParser = require('body-parser');
var express = require('express');
var request = require('request');
var router = express();
 
var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
var server = http.createServer(app);
 
app.listen(process.env.PORT || 3000);
 
app.get('/', (req, res) => {
  res.send("Server chạy ngon lành.");
});
 
app.get('/webhook', function(req, res) {
  if (req.query['hub.verify_token'] === 'cuong') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
});
 
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
            sendMessage(senderId, "C-selfie: " + 'Xin Chào');
          } elseif(text == 'ck' || text == "chong")
          {
            sendMessage(senderId, "Chồng: " + 'Xin chào vk iu');
          }
          else{sendMessage(senderId, "C-selfie: " + "Chúng tôi sẽ trả lời sớm nhất.");}
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
      access_token: "EAAS2PjFzojABADJVx48WvXxmxbRkmfk6fibi6ZCeVxGSZAI92QR46ZBf7UUykxrZBufz2T5vFD7JuZCEc4ES0ZA5IafYjub4FNIDMZALQBeW9qE8u9uLmMWAmRD8R2W4ZAZC18ajMH1Q92YpaiaFW1Gf76oqUklsgsRTEQLr5i8X99QZDZD",
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
