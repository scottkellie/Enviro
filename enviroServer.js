var Primus = require('primus.io');
var http = require('http');
var server = require('http').createServer();
var secserv = require('http').createServer();//https_options);
var socketio = require('socket.io');
var fs = require('fs');
var util = require('util');
var primus = new Primus(server, { transformer: 'socket.io', parser: 'JSON' });
var path = require('path');
var mime = require('mime');
/*
http://qugstart.com/blog/node-js/node-js-restify-server-with-both-http-and-https/
var https_options = {
  key: fs.readFileSync('/etc/ssl/self-signed/server.key'),
  certificate: fs.readFileSync('/etc/ssl/self-signed/server.crt')
};*/


primus.on('connection', function (spark) {

  // listen to hi events
  spark.on('hi', function (msg) {

	console.log(msg); //-> hello world

	// send back the hello to client
	spark.send('hello', 'hello from the server');

  });

});
server.listen(8888);
secserv.listen(8833);
//Begin webserver to serve files.

http.createServer(_handler).listen(81);
console.log('Server running at http://127.0.0.1:81/');

function _handler(req, res) {
	var root = "..",
		url = "",
		contentType = "text/plain",
		filePath = "";

		//All following code goes here
		if (req.method !== 'GET') { //If the request method doesn't equal 'GET'
		res.writeHead(405); //Write the HTTP status to the response head
		res.end('Unsupported request method', 'utf8'); //End and send the response
		return;
	//Build filepath and serve requested file.
	if ('.' + req.url !== './') {
	filePath = root + req.url;
	path.exists(filePath, serveRequestedFile);		
} else {
	res.writeHead(400);
	res.end('A file must be requested', 'utf8');
	return;
}
}
//end path
function serveRequestedFile(file) {
	if (file === false) { 
		res.writeHead(404); 
		res.end(); 
		return;
	}

	//Following code will go here
		}
	var fileStream = fs.createReadStream(filePath);
	var mime = require('mime-magic');

mime(filePath, function (err, type) {
    if (err) {
        console.error(err.message);
        // ERROR: cannot open `/path/to/foo.pdf' (No such file or directory)
    } else {
        console.log('Detected mime type: %s', type);
        contentType = type;
        // application/pdf
    }
});
    var fileStream = filePath;
	res.setHeader('Content-Type', contentType);
	res.writeHead(200);
    stream.pipe(fileStream, res, function(error) {
        //Only called when the res is closed or an error occurs
        res.end();
        return;
    });
	stream.pipe(res);
	};
//

// create socket instance
  socket = new primus.Socket('http://localhost:8888'),
  socket.on('connection', function (socket) {
  console.log('connection has the following headers', socket.headers);
  console.log('connection was made from', socket.address);
  console.log('connection id', socket.id);
  }),
socket.on('open', function () {

  // Send request to join the news room
  socket.send('hi', 'hello world room');

  // listen to hello events
  socket.on('hello', function (msg) {

	console.log(msg); //-> hello from the server

  });
  //The data event is sendted when a message is received from the client. It's automatically decoded by the specified decoder.
socket.on('data', function message(data) {
  // the message we've received.
  });
socket.on('data', function message(data) {
	console.log('received data from the client', data);
	//console.log('received msg from the client', message);
	socket.write({ foo: 'bar' });
	socket.write('banana');
  });
});