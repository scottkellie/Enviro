var fs = require('fs')
, http = require('http')
, five = require('johnny-five'), board
, Repl = require("repl")
, socketio = require('socket.io');
//https://github.com/scottkellie/Enviromontal

var server = http.createServer(function (req, res)
	{
		res.writeHead(200, { 'Content-type': 'text/html' });
		res.end(fs.readFileSync(__dirname + '/index.html'));

	}).listen(8888, function ()
	{
		//create johnny-five arduino connection
		board = new five.Board({port: "com6"});

		//initialize and declare variables related to Arduino
		board.on("ready", function ()
			{

				console.log('Board connected');
				console.log("Ready event. Repl instance auto-initialized");
				console.log('detecting pins');

				//Initialise pins and ports
				// pin mode constants are available on the Pin class
				this.pinMode(13, five.Pin.OUTPUT);


				// lcd1 = new five.LCD({ pins: [12, 11, 5, 4, 3, 2] }),
				// set pin mode to analog input.
				this.pinMode(5, five.Pin.INPUT);
				
				in5 = new five.Sensor({pin:"A8",freq:25});
				this.repl.inject({
    test: "in5"
  });
				led5 = new five.Led(5),
				this.repl.inject({
    test: "led5"
  });
				led13 = new five.Led(13),
				this.repl.inject({
    test: "led13"
  });
				console.log('led created'),
				//  lcd1.on("ready", function () {
				// creates a heart!
				//      lcd1.clear(),
				//      lcd1.createChar(0x07,
				//          [0x00, 0x0a, 0x1f, 0x1f, 0x0e, 0x04, 0x00, 0x00]);

				console.log('initialised');
			
	
	console.log('Listening at: http://localhost:8888');
})
	socketio.listen(server).on('connection', function (socket)
		{

			socket.on('command', function (msg)
				{
					console.log(msg);
				});
			socket.on('message', function (msg)
				{
					var inmsg = msg.toString();
					//var queryData = msg.parse(msg);
					date = new Date(),
					dateNow = Date.now(),
					timeValH = date.getHours(),
					timeValM = date.getMinutes(),
					timeValS = date.getSeconds(),
					dateTime = (timeValH + '.' + timeValM + '.' + timeValS),
					setTimeout(function ()
						{
							console.log(dateTime+"  "+inmsg);
						}, 600);
					if(inmsg == "off")
					{
						led5.off();
											}
					if(inmsg == "on")
					{
						led5.strobe(50);
						led5.on();
					}
					else
					{
						if(inmsg >=0)
						{
							led5.strobe(inmsg),
							console.log(inmsg);
							console.log('Led strobing at ' + inmsg + 'ms');
							console.log('Message Received: ', inmsg);
							socket.broadcast.emit('message', inmsg);
						}


					}
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
