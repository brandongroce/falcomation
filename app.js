var Mopidy = require('mopidy'),
    express = require('express'),
    Omx = require('node-omxplayer'),
    fs = require('fs'),
    youtubedl = require('youtube-dl');

var app = express();
var mopidy = new Mopidy({
    webSocketUrl: "ws://10.0.1.4:6680/mopidy/ws/",
    callingConvention: "by-position-or-by-name"
});

app.get('/version', function (req, res) {
  mopidy.on("state:online", function () {
    console.log("Connected to Mopidy");
    mopidy.getVersion({}).then(function(data){
      console.log("Version: ", data);
      res.send(data);
    });
  });
})

app.get('/history', function(req, res){
  mopidy.on("state:online", function(){
    mopidy.history.getHistory({}).then(function(data){
      console.log("Current History: ", data);
      res.send(data);
    });
  });
});

app.get('/setmode/:mode', function(req, res){

  var video = youtubedl('http://www.youtube.com/watch?v=90AiXO1pAiA',
    // Optional arguments passed to youtube-dl.
    ['--format=18'],
    // Additional options can be given for calling `child_process.execFile()`.
    { cwd: __dirname }
  );

  // Will be called when the download starts.
  video.on('info', function(info) {
    console.log(info.url);
    var player = Omx(info.url);

  });
})

function spacemode(){

}



app.listen(3088, function () {
  console.log('Falcomation listening on port 3088!')
})
