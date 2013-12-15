var fs=require('fs'),http=require('http'),five=require('johnny-five'),board,repl=require("repl"),socketio=require('socket.io');var relay1;var relay2;var relay3;var relay4;var port='com7';var server=http.createServer(function(req,res)
{res.writeHead(200,{'Content-type':'text/html'});res.end(fs.readFileSync(__dirname+'/index.html'));}).listen(8888,function()
{board=new five.Board({port:'com7'});board.on("ready",function()
{console.log('Board connected');console.log('Ready event. Repl instance auto-initialized');console.log('detecting pins');this.pinMode(13,five.Pin.OUTPUT);this.pinMode(10,five.Pin.OUTPUT);this.pinMode(11,five.Pin.OUTPUT);this.pinMode(12,five.Pin.OUTPUT);this.pinMode(13,five.Pin.OUTPUT);relay1=new five.Led(10),this.repl.inject({relayA:relay1});relay2=new five.Led(11),this.repl.inject({relayB:relay2});relay1=new five.Led(12),this.repl.inject({relayC:relay3});relay4=new five.Led(13),this.repl.inject({relayD:relay4});led5=new five.Led(5),this.repl.inject({out5:led5});led13=new five.Led(13),this.repl.inject({out13:led13});console.log(in5.value+" "+led5.value+" "+led13.value);in5=new five.Sensor({pin:"A5",freq:25,samples:20}),this.repl.inject({therm1:in5});photoresistor=new five.Sensor({pin:"A2",freq:250,samples:20}),this.repl.inject({pot:photoresistor});console.log('initialised');console.log('Listening at: http://localhost:8888');});socketio.listen(server).on('connection',function(socket)
{socket.on('command',function(msg)
{console.log(msg);});socket.on('message',function(msg)
{var inmsg=msg.toString();date=new Date(),dateNow=Date.now(),timeValH=date.getHours(),timeValM=date.getMinutes(),timeValS=date.getSeconds(),dateTime=(timeValH+'.'+timeValM+'.'+timeValS);setTimeout(function()
{console.log(dateTime+"  "+inmsg)});
if(inmsg=="off")
{led5.off();}
if(inmsg=="on")
{led5.on();}
if(inmsg>=0)
{led5.strobe(inmsg),console.log(inmsg);console.log('Led strobing at '+inmsg+'ms');console.log('Message Received: ',inmsg);}
if(inmsg=="in5:val")
{console.log(in5.value);socket.broadcast.emit('value',in5.value);}
if(inmsg=="relay1:on")
{relay1.on();console.log('relay1 on');}
if(inmsg=="relay2:on")
{relay2.on();console.log('relay2 on');}
if(inmsg=="relay3:on")
{relay1.on();console.log('relay3 on');}
if(inmsg=="relay1:off")
{relay1.off();console.log('relay1 off');}
if(inmsg=="relay2:off")
{relay2.off();console.log('relay2 off');}
if(inmsg=="relay3:off")
{relay3.off();console.log('relay3 off');}
if(inmsg=="relay4:off")
{relay4.off();console.log('relay4 off');}});});});