var express = require('express');
var router = express.Router();
var config = require('./config/config');
var musicready = false;


var musicService = new require('./services/mopidy').MopidyService(config.mopidy.socketUrl);
musicService.on('ready', function(){
    console.log("Ready event received");
    musicready = true;
});


class MusicPlayer {
    constructor(musicService, mode){
        this.mode = mode;
        this.service = musicService;
    }

    loadModePlaylist(req, res){
        if(musicready){
            this.service.queuePlaylist(this.mode.playlist);
        }
        musicService.on('tracklist:loaded', function(tracks){
            console.log("tracklist event received, starting playback");
            this.service.startPlayback();
        });
        musicService.on('playback:started', function(){
            console.log("playback started event received, getting trackinfo");
            this.service.getCurrentTrack();
        });
        musicService.on('trackinfo', function(trackinfo){
            console.log("trackinfo event received", trackinfo);
        });
    }
}


