exports.newsong = function(data, bot){
  var song_length = data.room.metadata.current_song.metadata.length;
  var song_delta = (song_length*1000 > 10000)? (song_length*1000)-10000 : 0;//song_length;
  setTimeout(function(){
    bot.roomInfo(function(d){
      /*bot.remDj(d.room.metadata.current_dj, function(reason){
        console.log('dj removal');
        console.log(reason);
      });*/
    });
  }, song_delta);
};

exports.endsong = function(data, bot){
  bot.playlistAdd(data.room.metadata.current_song._id);
  bot.addDj(function(d){});
};