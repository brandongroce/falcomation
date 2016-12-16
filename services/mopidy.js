var Mopidy = require('mopidy');
var events = require('events');

class MopidyService extends events {

  constructor(webSocketUrl){
    super();
    this.mopidy = {};
    this.playlist = {};
    this.tracks = [];
    this.tracklist = {};
    this.mopidy = new Mopidy({
        webSocketUrl: webSocketUrl,
        callingConvention: 'by-position-or-by-name'
    });
    console.log('checking connection...');
    this.mopidy.on('state:online', this.checkStatus.bind(this));
  }

  checkStatus(){
      this.emit('ready');
      console.log('Connected to Mopidy');
      this.mopidy.getVersion({}).then(function(data){
        console.log('Version: ', data);
      })
      .catch(console.error.bind(console)) // Handle errors here
      .done();
  }

  trackDesc(track) {
      return track.name + ' by ' + track.artists[0].name +
          ' from ' + track.album.name;
  }

  queuePlaylist(playlisturi, options) {
    console.log(playlisturi);
    this.mopidy.playlists.getPlaylists().then(function (playlists) {
          console.log('got playlists');
          this.extractPlaylistTracks(playlists, playlisturi);
          this.emit('playlists', playlists);
          this.emit('tracks', this.tracks);
          if(typeof options !== 'undefined' && options.hasOwnProperty('shuffle') && options.shuffle === true){
            this.shuffle(this.tracks);
          }
          return this.mopidy.tracklist.add({'uris':this.tracks}).then(function (tlTracks) {
              console.log(tlTracks);
              console.log('playlist loaded');
              this.tracklist = tlTracks;
              this.emit('tracklist:loaded', tlTracks);
          }.bind(this))
          .catch(console.error.bind(console)).done();
      }.bind(this))
      .catch(console.error.bind(console)) // Handle errors here
      .done();                          // ...or they'll be thrown here
  }

  extractPlaylistTracks(playlists, playlisturi){
    var index = 0;
    for(index; index < playlists.length;index++){
      if(playlists[index].uri === playlisturi){
        break;
      }
    }
    this.playlist = playlists[index];
    console.log('Loading playlist:', this.playlist.name);
    for (var i = 0; i < this.playlist.tracks.length; i++){
      this.tracks.push(this.playlist.tracks[i].uri);
      if (i === 10){
        break;
      }
    }
  }

  startPlayback(trackNum){
    console.log('starting playback...');
    trackNum = trackNum || 0;
    var track = this.tracklist[trackNum];
    console.log('waiting for playback promise...');
    console.log(track);
    return this.mopidy.playback.play({'tl_track':track}).then(function () {
        console.log('track started');
        this.emit('playback:started');
    }.bind(this)).done();
  }

  getCurrentTrack(){
    return this.mopidy.playback.getCurrentTrack().done(function (track) {
        // console.log('Now playing:', this.trackDesc(track));
        this.emit('trackinfo', track);
    }.bind(this));
  }

  shuffle(a) {
        var j, x, i;
        for (i = a.length; i; i--) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
  }

  getMopidy(){
    return this.mopidy;
  }

  cleanup(){
    console.log('closing connection');
    this.mopidy.close();
    this.mopidy.off();
    this.mopidy = null;
  }
}

exports.MopidyService = MopidyService;
