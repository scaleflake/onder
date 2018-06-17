var public = require('public-ip');

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
	var reqip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	if (reqip == '::ffff:127.0.0.1') {
		console.log('localhost : ' + reqip + '\n');
		res.send('127.0.0.1');
	} else if (reqip.match(/::ffff:192.168.0./)) {
		console.log('LAN : ' + reqip + ' : ' + '192.168.0.49' + '\n');
		res.send('192.168.0.49');
	} else {
		public.v4().then(function(extip) {
			console.log('WAN : ' + reqip + ' : ' + extip + '\n');
			res.send(extip);
		}, function(error) {
			console.log('WAN : ' + reqip + ' : ' + 'ERROR' + '\n');
			res.send('ERROR');
		});
	}
});

app.listen(9001);
console.log('Server started');
