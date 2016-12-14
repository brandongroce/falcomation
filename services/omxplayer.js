var youtubedl = require('youtube-dl');
var Omx = require('node-omxplayer');

var playVideo = function(videourl){
  var video = youtubedl(videourl
    // Additional options can be given for calling `child_process.execFile()`.
    // { cwd: __dirname }
  );

  // Will be called when the download starts.
  video.on('info', function(info) {
    console.log(info.url);
    var player = Omx(info.url);
  });
}
