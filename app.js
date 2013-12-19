var fs = require('fs')
, http = require('http'),server
, five = require('johnny-five'), board
, repl = require("repl")
, socketio = require('socket.io')
, io = require('socket.io');
var replbo;
var pins;
//https://github.com/scottkellie/Enviromontal
///
///

///
var server = http.createServer(function (req, res)
	{
		res.writeHead(200, { 'Content-type': 'text/html' });
		res.end(fs.readFileSync(__dirname + '/index.html'));
		
	}).listen(8888, function ()
	{
        //create johnny-five arduino connection
		board = new five.Board({port: "com6",repl: repl, pins: pins});
		pins = board.pin
		//initialize and declare variables related to Arduino
		board.on("ready", function ()
			{
				console.log('Board connected');
				console.log('Ready event. Repl instance auto-initialized');
				console.log('detecting pins');
                // Create a new `photoresistor` hardware instance.
        		//Initialise pins and ports
				// pin mode constants are available on the Pin class
				/* board.pinMode(13, five.Pin.OUTPUT);
				board.pinMode(10, five.Pin.OUTPUT);
				board.pinMode(11, five.Pin.OUTPUT);
				board.pinMode(12, five.Pin.OUTPUT);
				board.pinMode(14, five.Pin.OUTPUT);
				board.pinMode(14, five.Pin.OUTPUT); */
				// lcd1 = new five.LCD({ pins: [12, 11, 5, 4, 3, 2] }),
				// set pin mode to analog input.
				//this.pinMode("A5", five.Pin.INPUT);
				in5 = new five.Sensor({pin:"A5",freq:25,samples:20}),
				this.repl.inject({
	therm5: in5
  });
				in6 = new five.Sensor({pin:"A6",freq:25,samples:20}),
				this.repl.inject({
	therm6: in6
  });
				in7 = new five.Sensor({pin:"A7",freq:25,samples:20}),
				this.repl.inject({
	therm7: in7
  });
				in8 = new five.Sensor({pin:"A8",freq:25,samples:20}),
				this.repl.inject({
	therm8: in8
  });
				in9 = new five.Sensor({pin:"A9",freq:25,samples:20}),
				this.repl.inject({
	therm9: in9
  });
				in10 = new five.Sensor({pin:"A10",freq:25,samples:20}),
				this.repl.inject({
	lightin10: in10
  });
				led5 = new five.Led(5),
				
				this.repl.inject({
	out5: led5
  });
				led6 = new five.Led(6),
				
				this.repl.inject({
	out6: led6
  });
		   led7 = new five.Led(7),
				
				this.repl.inject({
	out7: led7
  });
		  led8 = new five.Led(8),
				
				this.repl.inject({
	out8: led8
  });
				led9 = new five.Led(9),
				
				this.repl.inject({
	out9: led9
  });
				relay1 = new five.Led(10),
				this.repl.inject({
	out10: relay1
  });
  
  relay2 = new five.Led(11),
				this.repl.inject({
	out11: relay2
	});
	
	relay3 = new five.Led(12),
				this.repl.inject({
	out12: relay3
  });
				led13 = new five.Led(13),
				this.repl.inject({
	out13: led13
  });
  relay4 = new five.Led(14),
				this.repl.inject({
	out14: relay4
  });
				
photoresistor = new five.Sensor({pin: "A2",freq: 250, samples:20})
  this.repl.inject({
  pot: photoresistor
  });
	console.log('initialised');
		
	console.log('Listening at: http://localhost:8888');

	socketio.listen(server).on('connection', function (socket)
		{
			socket.on('command', function (msg)
				{
					console.log(msg);
				});
			socket.on('message', function (msg)
				{
					var inmsg = msg.toString();
					setTimeout(function ()
						{
							console.log(inmsg);
						}, 600);
						if(inmsg === "in5:val")
					{
					// "data" get the current reading from the photoresistor
					//in5.on("data", function() {
					 console.log( in5.value );
					 socket.emit('value', in5.value);
					 //socket.broadcast.emit('value', inmsg)
					 };
						if (inmsg === "relay1:on") {
				relay1.on();
				console.log('relay1 on');
				socket.emit(inmsg);
			}
			if (inmsg === "relay2:on") {
				relay2.on();
				console.log('relay2 on');
				socket.emit(inmsg);
			}
			if (inmsg === "relay3:on") {
				relay3.on();
				console.log('relay3 on');
				socket.emit(inmsg);
			}
			   if (inmsg === "relay4:on") {
				relay4.on();
				console.log('relay4 on');
				socket.emit(inmsg);
			}
			///turn relays off
			if (inmsg === "relay1:off") {
				relay1.off();
				console.log('relay1 off');
			socket.emit(inmsg);
			}
			if (inmsg === "relay2:off") {
				relay2.off();
				console.log('relay2 off');
			socket.emit(inmsg);
			}
			if (inmsg === "relay3:off") {
				relay3.off();
				console.log('relay3 off');
			socket.emit(inmsg);
			}
			if (inmsg === "relay4:off") {
				relay4.off();
				console.log('relay4 off');
			socket.emit(inmsg);
															}
			if(inmsg == "led5:off")
					{
						led5.off();
					socket.emit(inmsg);
					}
					if(inmsg == "led5:on")
					{
						socket.emit(inmsg);
						//led5.strobe(50);
						led5.on();
					}
					if(inmsg >=0)
						{
							led5.strobe(inmsg),
							console.log(inmsg);
							console.log('Led strobing at ' + inmsg + 'ms');
							console.log('Message Received: ', inmsg);
							socket.emit(inmsg);
						}
					});
});
});
});

//################Scratchpad#######################
/*
//Output commands for each different pin TYPE https://github.com/rwaldron/johnny-five/wiki/Board

// Assuming an Led is attached to pin 9, this will turn it on at full brightness
// PWM is the mode used to write ANALOG signals to a digital pin
this.pinMode(9, five.Pin.PWM);
this.analogWrite(9, 255);

// Assuming a sensor is attached to pin "A1"
this.pinMode(1, five.Pin.ANALOG);
this.analogRead(1, function(voltage) {
console.log(voltage);

// Assuming an Led is attached to pin 13, this will turn it on
this.pinMode(13, five.Pin.OUTPUT);
this.digitalWrite(13, 1);

// Assuming a button is attached to pin 9
this.pinMode(9, five.Pin.INPUT);
this.digitalRead(9, function(value) {
console.log(value);
});

// Assuming an Led is attached to pin 13
this.pinMode(13, five.Pin.OUTPUT);

// Turn it on...
this.digitalWrite(13, 1);

this.wait(1000, function() {
// Turn it off...
this.digitalWrite(13, 0);
});

var byte;

// Assuming an Led is attached to pin 13
this.pinMode(13, five.Pin.OUTPUT);

// Homemade strobe
this.loop(500, function() {
this.digitalWrite(13, (byte ^= 0x01));
});
*/
