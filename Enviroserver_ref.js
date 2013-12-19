'use strict';
//set up variables
var Primus = require('primus')
  , http = require('http');

var server = http.createServer(/* request handler */)
  , primus = new Primus(server, { transformer: 'socket.io',parser: 'json'});
  
  //Create a socket.io connection (transformer: 'socket.io)
  var Socket = primus.Socket
  , socket = new Socket('http://localhost');
  var spark = primus.spark;
//custom encoding and decoding libraries
var primus = new Primus(server, { parser: 'JSON' });
 
//returns the client-side library.
primus.library();
primus.save(__dirname +'/lib/primus.js', function save(err) {

});
var spark = primus.spark;
//Connection event
//spark will include all methods that are available on the stream interface including spark#pipe.
primus.on('connection', function (spark) {
 
    // spark is the new connection.
});
//Disconnection event
primus.on('disconnection', function (spark) {
  // the spark that disconnected
});
//The spark.end() closes the connection.

//The spark.address property contains the ip and port of the connection. 
//If you're running your server behind a reverse proxy it will automatically use the x-forwarded-for header.
// This way you will always have the address of the connecting client and not the IP address of your proxy.

//The spark.query contains the query string you used to connect to server.
//It's parsed to an object. Please note that this is not available for all supported transformers, 
//You can use the spark.write method to send data over the socket. The data is automatically encoded for you 
//using the parser that you've set while creating the Primus instance. This method always returns true so back pressure isn't handled.

//spark.write({ foo: 'bar' });

//This method is mostly used internally. It returns a function that sends assigned event every time it's called. It 
//only sends the first received argument or the result of the optional parser call. The parser function receives 
//all arguments and can parse it down to a single value or just extracts the useful information from the data. 
//Please note that the data that is received here isn't decoded yet.
//spark.sends('event', function parser(structure) {
 // return structure.data;
//});
//The server has a .spark property that can be extended. This allows you to easily add new functionality to the socket. 
//For example adding join room function would be as easy as:
//primus.use('rooms', {
//  server: function (primus) {
//    var spark = primus.spark;

//    spark.prototype.join = function () {
//      // implement room functionality.
//    };
//  }
//  });  
  
//The data event is sendted when a message is received from the client. It's automatically decoded by the specified decoder.
primus.on('data', function message(data) {
  // the message we've received.
});
//The end event is sendted when the client has disconnected.
//here are 2 different types of messages that can be transformed:

//incoming These messages are being received by the server.
//outgoing These messages are being sent to the client.
//The transformer is available on both the client and the server and share, like you would have expected the same identical API. 
//Adding a new transformer is relatively straightforward
primus.transform('incoming', function (packet) {
  //
  // The packet.data contains the actual message that either received or
  // transformed.
  //

  // This would transform all incoming messages to foo;
  packet.data = 'foo';

  // If you are handling the message and want to prevent the `data` event from
  // happening, simply `return false` at the end of your function. No new
  // transformers will be called, and the event won't be sendted.
});
//or
primus.use('name', {
  server: function (primus) {
    primus.transform('outgoing', function (packet) {
      packet.data = 'foo';
    });

    primus.transform('incoming', function (packet) {
      if (packet.data === 'foo') packet.data = 'bar';
    });
  },

  client: function (primus) {
    primus.transform('outgoing', function (packet) {
      packet.data = 'foo';
    });

    primus.transform('incoming', function (packet) {
      if (packet.data === 'foo') packet.data = 'bar';
    });
  }
});

primus.on('connection', function (spark) {
  console.log('connection has the following headers', spark.headers);
  console.log('connection was made from', spark.address);
  console.log('connection id', spark.id);

  spark.on('data', function (data) {
    console.log('received data from the client', data);

    //
    // Always close the connection if we didn't receive our secret imaginary handshake.
    //
    if ('foo' !== data.secrethandshake) spark.end();
    spark.write({ foo: 'bar' });
    spark.write('banana');
  });

  spark.write('Hello world');
});
//Broadcast to all clients
//primus.write(message);
//selective broadcast
//primus.forEach(function (spark, id, connections) {
 // if (spark.query.foo !== 'bar') return;

//  spark.write('message');
//});
//authorisation
//https://github.com/primus/primus#authorization
//Events
//https://github.com/primus/primus#events