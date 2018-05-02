var express = require('express');
var app = express();

app.use('/', express.static(__dirname + '/'));

app.get('/', function(req, res) {
	res.send('Hello, ONDER!');
});

app.get('/village', function(req, res) {
	res.sendFile(__dirname + '/village/index.html');
});

app.get('/gui', function(req, res) {
	res.sendFile(__dirname + '/gui/gui.html');
});

app.get('/ip', function(req, res) {
	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	console.log(ip);
	if (ip == '::ffff:127.0.0.1') {
		console.log('localhost');
		res.send('127.0.0.1');
	} else if (ip == '::ffff:192.168.0.9') {
		console.log('LAN');
		res.send('192.168.0.49');
	} else {
		console.log('WAN');
		res.send('92.255.206.247');
	}
	
});

app.listen(9001);
console.log('Server started');