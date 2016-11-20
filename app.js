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

var version = function(res){
  console.log("checking connection...");
  mopidy.on("state:online", function () {
    console.log("Connected to Mopidy");
    mopidy.getVersion({}).then(function(data){
      console.log("Version: ", data);
      res.send(data);
    })
    .catch(console.error.bind(console)) // Handle errors here
    .done();;
  });
}

app.get('/healthcheck', function (req, res) {
  version(res);
});

app.get('/history', function(req, res){
  mopidy.on("state:online", function(){
    mopidy.history.getHistory({}).then(function(data){
      console.log("Current History: ", data);
      res.send(data);
    });
  });
});

app.get('/playlists', function(req, res){
  mopidy.on('state:online', function(){
    mopidy.playlists.getPlaylists().then(function (playlists) {
        res.send(JSON.parse(playlists));
        console.log(playlists);
    })
    .catch(console.error.bind(console)) // Handle errors here
    .done();
  });
});

app.get('/setmode/:mode', function(req, res){
  playVideo('https://www.youtube.com/watch?v=tCn-qeMXdwU')
  queueAndPlay('79kAfkACIjyA4QYyE6j5zQ', 1);
});

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

var trackDesc = function (track) {
    return track.name + " by " + track.artists[0].name +
        " from " + track.album.name;
};

var queueAndPlay = function (playlistNum, trackNum) {
    playlistNum = playlistNum || 0;
    trackNum = trackNum || 0;
    mopidy.playlists.getPlaylists().then(function (playlists) {
        var playlist = playlists[playlistNum];
        console.log("Loading playlist:", playlist.name);
        return mopidy.tracklist.add(playlist.tracks).then(function (tlTracks) {
            return mopidy.playback.play(tlTracks[trackNum]).then(function () {
                return mopidy.playback.getCurrentTrack().then(function (track) {
                    console.log("Now playing:", trackDesc(track));
                });
            });
        });
    })
    .catch(console.error.bind(console)) // Handle errors here
    .done();                            // ...or they'll be thrown here
};



app.listen(3088, function () {
  console.log('Falcomation listening on port 3088!')
})
