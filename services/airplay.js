var youtubedl = require('youtube-dl');
var browser = require('airplay').createBrowser();
var events = require('events');
var util = require('util');
var devices = [];

var airplayer = function(){
  var self = this;
  browser.on('deviceOnline', function(device) {
    console.log('device online: ' + device.id);
    devices[device.id] = device;
    self.emit('device:added', devices);
  });
  browser.on('deviceOffline', function(device) {
    console.log('device offline: ' + device.id);
    devices.splice(device.id, 1);
    self.emit('device:removed', devices);
  });
  browser.start();
}

airplayer.prototype.sendToAirplay = function(media, device){
  media = media || "http://clips.vorwaerts-gmbh.de/VfE_html5.mp4";
  device = device || 0;
  console.log('Playing test video');
  var playresponse = devices[device].play(media, 0, function(){
    console.log("Playback sent.  Status: ", device.status());
    self.emit("playback", device.status());
  });
  console.log("play response", playresponse);
}

util.inherits(airplayer, events.EventEmitter);
module.exports = airplayer;
