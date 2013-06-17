var colors = require('colors')
  , USERID = require('../secret.js').USERID
  , mongo  = require('../database.js')
;

exports.newsong = function(data, bot){

  // Log new song metadata
  //console.log('new_song'.cyan);
  //console.log(data.room.metadata.current_song.metadata);

  var cur_dj = data.room.metadata.current_dj;
  if(data.room.metadata.current_dj === USERID){

    // Kill the outro
    var song_length = data.room.metadata.current_song.metadata.length;
    var song_delta = (song_length*1000 > 10000)? (song_length*1000)-10000 : 0;//song_length;
    /*setTimeout(function(){
      /*bot.roomInfo(function(d){
        bot.remDj(d.room.metadata.current_dj);
        bot.addDj();
      });
      bot.skip();
      console.log('skippp');
    }, 12000);//song_delta);*/
  }
};

exports.addsong = function(data, bot){
  bot.playlistAdd(data.room.metadata.current_song._id);
  bot.addDj(function(d){});
};

exports.recordsong = function(data, bot){
  mongo.db.collection('song_log', function(err, col){
    if(err){throw err;}
    // Record data suitable for MapReduce
    var log_data = {
      'ts': Date.now()
      , 'dj': data.room.metadata.current_song.djname
      , 'djid': data.room.metadata.current_song.djid
      , 'song': data.room.metadata.current_song.metadata.song
      , 'artist': data.room.metadata.current_song.metadata.artist
      , 'genre': data.room.metadata.current_song.metadata.genre
    };

    col.insert(log_data, function(err, d){
      if(err){throw err;}
    });
  });

  exports.addsong(data, bot);
};