var fs = require('fs')
, http = require('http')
, five = require('johnny-five'), board
, socketio = require('socket.io');
//https://github.com/scottkellie/Enviromontal

var server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.end(fs.readFileSync(__dirname + '/index.html'));

}).listen(8888, function () {
    //create johnny-five arduino connection
    board = new five.Board({port: "com6"});
//initialize and declare variables related to Arduino
    board.on("ready", function () {
	
        console.log('Board connected'),
       // lcd1 = new five.LCD({ pins: [12, 11, 5, 4, 3, 2] }),
        in5 = new five.Sensor({pin:"A8",freq:25}),
		var iled = 5
		var ledpin[];
		for (i=2; i>2+<10; i++){
			ledpin[] = i;
			console.log(ledpin);
		}
		
		led8 = new five.Led(8),
		led13 = new five.Led(13),
        console.log('led created'),
      //  lcd1.on("ready", function () {
            // creates a heart!
      //      lcd1.clear(),
      //      lcd1.createChar(0x07,
      //          [0x00, 0x0a, 0x1f, 0x1f, 0x0e, 0x04, 0x00, 0x00]);

            console.log('initialised');
        });
        console.log('Listening at: http://localhost:8888');

        socketio.listen(server).on('connection', function (socket) {

            socket.on('command', function (msg) {
                console.log(msg);
            });
            socket.on('message', function (msg) {
                var inmsg = msg.toString();
                //var queryData = msg.parse(msg);
        date = new Date(),
		dateNow = Date.now(),
        timeValH = date.getHours(),
        timeValM = date.getMinutes(),
        timeValS = date.getSeconds(),
        dateTime = (timeValH + '.' + timeValM + '.' + timeValS),
        setTimeout(function () {
        console.log(dateTime+"  "+inmsg);
        }, 600);
		if(inmsg == "off"){
					led8.off();
				}
				if(inmsg == "on"){
					led8.strobe(50);
					led8.on();
				}
				else{
		if(inmsg >=0){			
	            led8.strobe(inmsg),
                console.log(inmsg);
				console.log('Led strobing at ' + inmsg + 'ms');
                console.log('Message Received: ', inmsg);
                socket.broadcast.emit('message', inmsg);
				}
				
					
				}
            });
        });
    });
