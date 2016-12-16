var express = require('express'),
    modes = require('./config/modes'),
    app = express(),
    moodController = require('./controllers/mood.controller');



app.get('/mode/:mode', function(req, res){
  var mode = modes.mode[req.params.mode];
  var player = new moodController.MusicPlayer(mode);
  var service = player.getService();

  service.on('ready', function(){
    console.log('state online, starting playlist');
    player.loadModePlaylist();
  });

  service.on('playlist:loadcomplete', function(trackinfo){
    service.cleanup();
    res.json(trackinfo);
    res.end();
  });
});

app.listen(3010, function () {
  console.log('Example app listening on port 3010!');
});
