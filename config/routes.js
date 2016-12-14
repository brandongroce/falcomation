


// app.get('/healthcheck', function (req, res) {
//   version(res);
// });
//
// app.get('/history', function(req, res){
//     mopidy.history.getHistory({}).then(function(data){
//       console.log("Current History: ", data);
//       res.send(data);
//     });
// });
//
// app.get('/playlists', function(req, res){
//     mopidy.playlists.getPlaylists().then(function (playlists) {
//         console.log(playlists);
//         res.send(playlists);
//     })
//     .catch(console.error.bind(console)) // Handle errors here
//     .done();
// });
//
// app.get('/setmode/:mode', function(req, res){
//   playVideo('https://www.youtube.com/watch?v=tCn-qeMXdwU')
//   console.log("fetching playlists");
//   queueAndPlay('spotify:user:1213350997:playlist:79kAfkACIjyA4QYyE6j5zQ', 1, res);
// });
//
// app.get('/airplay/:media', function(req, res){
//   var media = req.params.media;
//   sendToAirplay(media, 0);
// });
