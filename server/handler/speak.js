var colors = require('colors')
  , USERID = require('../secret.js').USERID
;

// This logic does all the chat parsing and corresponding bot behavior
exports.spoken = function(data, bot){
  console.log(data);

  if(data){
    console.log(data.userid, USERID);
    if(data.userid !== USERID) {
      if(data.text.match(/^\/hello$/)){

        // Say hi to the bot
        // [/hello]
        bot.speak('Hey! How are you @' + data.name + ' ?');
      }else if(data.text.match(/^\/boot$/)){

        // Boot the current dj
        // [/boot]
        bot.roomInfo(function(d){
          bot.remDj(d.room.metadata.current_dj, function(e){
            console.log('DJ Removed'.red);
            bot.speak('DJ Removed');
          });
        });
      }else if(data.text.match(/^\/shuffle$/) || data.text.match(/^\/skip$/)){

        // Skip to the next song
        // [/shuffle, /skip]
        console.log('shuffle || skip'.grey);
        bot.skip();
      }else if(data.text.match(/^\/info$/) || data.text.match(/^\/playlist$/)){

        // List playlist
        // [/info, /playlist]
        console.log('info || playlist'.grey);
        bot.playlistAll(function(playlist){
          for(var song in playlist.list){
            console.log(playlist.list[song].metadata);
          }
        });
      }else if(data.text.match(/^\/dubstep$/) || data.text.match(/^\/wubs$/)){

        // Play some wubs
        // [/dubstep, /wubs]
        console.log('dubstep || wubs'.grey);
        bot.speak('@' + data.name + ', HERE COME THE WUBS');
        bot.playlistAll(function(playlist){
          var notfound = true;
          for(var i = (playlist.list.length-1); i >= 0 && notfound; i--){
            if( playlist.list[i].metadata.genre
              && (playlist.list[i].metadata.genre.indexOf('dubstep') !== -1
              || playlist.list[i].metadata.genre.indexOf('Dubstep') !== -1)){

              // Elevate this wub song to the top of playlist and skip the current song so it plays
              console.log(playlist.list[i].metadata.song, ' by:', playlist.list[i].metadata.artist);
              notfound = false;
              bot.playlistReorder(i, 0, function(){
                console.log('Song is to be skipped!'.yellow);
                bot.skip();
              });
            }
          }
        });
      }else if(data.text.match(/^\/genre/) || data.text.match(/^\/music/)){

        // Play a genre the user wants
        // [/genre MY_GENRE, /music MY_GENRE]
        var genre = String(data.text.substr(7, data.text.length-7));
        console.log('genre selector'.grey, genre);
        bot.speak('@' + data.name + ', I will play something in the "' + genre +  '" genre.');
        bot.playlistAll(function(playlist){
          var notfound = true;
          for(var i = (playlist.list.length-1); i >= 0 && notfound; i--){
            if( playlist.list[i].metadata.genre
              && playlist.list[i].metadata.genre.indexOf(genre) !== -1){

              // Elevate this song to the top of playlist and skip the current song so it plays
              console.log(playlist.list[i].metadata.song, ' by:', playlist.list[i].metadata.artist);
              notfound = false;
              bot.playlistReorder(i, 0, function(){
                console.log('Song is to be skipped!'.yellow);
                bot.skip();
              });
            }
          }
        });
      }

    }

  }
};