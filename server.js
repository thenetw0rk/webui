var express = require('express');
var http = require('http');
var path = require('path');

var app = express();
app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'client')));

var http = require('http');

//TODO generic /led/* path and just 'apply' / eval the cmd

app.get('/servo/:id/:cmd', function(req, res){
        console.log('received cmd ', req.params.x);
        if(hardware.servo){
                eval('hardware.servo['+req.params.id+'].'+req.params.cmd+'()');
        }
  res.send('servo *');
});

app.get('/led/:id/:cmd', function(req, res){
        console.log('received cmd ', req.params.cmd);
        if(hardware.led){
                eval('hardware.led['+req.params.id+'].'+req.params.cmd+'()');
                eval('hardware.led[5].on()');
                eval('hardware.led[5].off()');
        }
  res.send('led *');
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
var five = require("johnny-five");
var hardware = {};

// or "./lib/johnny-five" when running from the source
var board = new five.Board();

console.info('start app');

board.on("ready", function() {
  console.info('board ready');

  hardware.led = [];
  hardware.led[5] = new five.Led(5);
  hardware.led[6] = new five.Led(6);

  hardware.led[5].off();
  hardware.led[6].off();


  // Initialize the servo
  hardware.servo = [];
  hardware.servo[9] = new five.Servo(9);
  hardware.servo[10] = new five.Servo(10);

  //so it can be accessed in the REPL cmd
  this.repl.inject({
    led: hardware.led[5],
    servo: hardware.servo[9]
  });

});
