var config = require('../config/config');
var MopidyService = require('../services/mopidy').MopidyService;

exports.MusicPlayer = class MusicPlayer {
    constructor(mode){
        this.mode = mode;
        this.service = new MopidyService(config.mopidy.socketUrl);
    }

    getService() {
      return this.service;
    }

    setMode(mode){
      this.mood = mode;
    }

    loadModePlaylist(){
          this.service.queuePlaylist(this.mode.playlist);

          this.service.on('tracklist:loaded', function(tracks){
              console.log('tracklist event received, starting playback');
              console.log('Got Tracks');
              this.service.startPlayback();
          }.bind(this));
          this.service.on('playback:started', function(){
              console.log('playback started event received, getting trackinfo');
              this.service.getCurrentTrack();
          }.bind(this));
          this.service.on('trackinfo', function(trackinfo){
              console.log('trackinfo event received', trackinfo);
              this.service.emit('playlist:loadcomplete', trackinfo);
          }.bind(this));
    }
};

exports.HueController = class HueController {
    constructor(){

    }
};
