var Mopidy = require('mopidy'),
    express = require('express'),
    Omx = require('node-omxplayer'),
    fs = require('fs'),
    youtubedl = require('youtube-dl');

var app = express();
var mopidy = new Mopidy({
    webSocketUrl: "ws://raspberrypi.local:6680/mopidy/ws/",
    callingConvention: "by-position-or-by-name"
});

var version = function(res){
  console.log("checking connection...");
  console.log("Connected to Mopidy");
  mopidy.getVersion({}).then(function(data){
    console.log("Version: ", data);
    if (res) {res.send(data);}
  })
  .catch(console.error.bind(console)) // Handle errors here
  .done();;
}

mopidy.on('state:online', function(){
  version();
})

app.get('/healthcheck', function (req, res) {
  version(res);
});

app.get('/history', function(req, res){
    mopidy.history.getHistory({}).then(function(data){
      console.log("Current History: ", data);
      res.send(data);
    });
});

app.get('/playlists', function(req, res){
    mopidy.playlists.getPlaylists().then(function (playlists) {
        console.log(playlists);
        res.send(playlists);
    })
    .catch(console.error.bind(console)) // Handle errors here
    .done();
});

app.get('/setmode/:mode', function(req, res){
  playVideo('https://www.youtube.com/watch?v=tCn-qeMXdwU')
  console.log("fetching playlists");
  queueAndPlay('spotify:user:1213350997:playlist:79kAfkACIjyA4QYyE6j5zQ', 1);
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
        console.log("got playlists");
        var index = 0;
        for(index; index < playlists.length;index++){
          if(playlists[index].uri === playlistNum){
            break;
          }
        }
        var playlist = playlists[index];
        var tracks = [];
        console.log("Loading playlist:", playlist.name);
        for (i = 0; i < playlist.tracks.length; i++){
          tracks.push(playlist.tracks[i].uri);
          if (i === 10){
            break;
          }
        }
        console.log(tracks);
        return mopidy.tracklist.add({"uris":tracks}).then(function (tlTracks) {
            console.log(tlTracks);
            console.log("playlist loaded, starting track 1");
            return mopidy.playback.play({"tl_track":tlTracks[trackNum]}).then(function () {
                console.log("track started");
                return mopidy.playback.getCurrentTrack().then(function (track) {
                    console.log("Now playing:", trackDesc(track));
                });
            });
        }).catch(console.error.bind(console));
    })
    .catch(console.error.bind(console)) // Handle errors here
    .done();                            // ...or they'll be thrown here
};



app.listen(3088, function () {
  console.log('Falcomation listening on port 3088!')
})
