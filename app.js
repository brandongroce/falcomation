// var express = require('express'),
//     config = require('./config/config'),
//     modes = require('./config/modes'),
//     fs = require('fs'),
//     app = express(),
//     MoodController = require('./controllers/mood.controller')
//     ;

var gpio = require('pi-gpio');

gpio.open(7, "output", function(err) {		// Open pin 16 for output
    gpio.write(7, 1, function() {			// Set pin 16 high (1)
        // gpio.close(16);						// Close pin 16
    });
});


function init(){
  startServer();
  //app.use('/mood/:mood', MoodController);
}

function startServer(){
  app.listen(3088, function () {
    console.log('Falcomation listening on port 3088!')
  })
}

// init();
