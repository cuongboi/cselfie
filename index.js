 

// # SimpleServer
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
  res.send("hello world.");
});

app.get('/webhook', function(req, res) {
  if (req.query['hub.verify_token'] === 'quandeptrai') {
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
            sendMessage(senderId, "Trung Quân's Bot: " + 'Xin Chào');
          }
          else{sendMessage(senderId, "Trung Quân's Bot: " + "Xin lỗi, câu hỏi của bạn chưa có trong hệ thống, chúng tôi sẽ cập nhật sớm nhất.");}
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
      access_token: "mã_truy_cập_trang",
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
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
// # SimpleServer
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
      access_token: "EAAUHhKvuq0cBAO9rEq0q6dZCXivaraJCoGEItMrnW63wp27UndLum7ZASIy4f2iLkI7vJ1XV5G0hHZB7rxSAzo4BbjCtDmokiUM7JjDFZBweI6vQb2HXcNNpaYd6li8GiWnmditZCVjBKZA4O8KDGZAZBRGH3CZB4ZAwmbdLjYZBv4qdwZDZD",
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
 
  res.status(200).send("OK");
});
 
// Gửi thông tin tới REST API để Bot tự trả lời
function sendMessage(senderId, message) {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {
      access_token: "EAAUHhKvuq0cBANRK9vGGiZCKa1z8XtUzfUcEtZCgrXFn2qJyl4NzzYZBUUhZB4An1nlZCbvshOn0GFd8mNCT4h8LZCPmo9jggDuaNVfgD98lbNDmYCTelu5j7QKhjUXQAL03fpmxKxNSeCymHRtFCrwcjur2alzSsg7yKA5EX7KAZDZD",
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
