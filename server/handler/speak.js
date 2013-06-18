var colors = require('colors')
  , USERID = require('../secret.js').USERID
  , chatty = require('../ttable.js')
;

// This logic does all the chat parsing and corresponding bot behavior
exports.spoken = function(data, bot){
  if(data){
    // Don't respond to your own speech and cause an inf loop!
    if(data.userid !== USERID) {

      if(data.text.match(/^\/hello$/)){

        // Say hi to the bot
        // [/hello]
        bot.speak('Hey :panda_face:! How are you @' + data.name + ' ?');
      }else if(data.text.match(/^\/boot$/)){

        // Boot the current dj
        // [/boot]
        bot.roomInfo(function(d){
          bot.remDj(d.room.metadata.current_dj, function(e){
            console.log('DJ Removed'.red);
            bot.speak('DJ Removed');
          });
        });
      }else if(data.text.match(/^\/next$/) || data.text.match(/^\/skip$/)){

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
          for(var i = 0; i < playlist.list.length && notfound; i++){
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
        console.log('genre selector'.grey, genre);
        var genre = String(data.text.substr(7, data.text.length-7));
        bot.speak('@' + data.name + ', I will play something in the "' + genre +  '" genre.');
        bot.playlistAll(function(playlist){
          var notfound = true;
          for(var i = 0; i < playlist.list.length && notfound; i++){
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
          if(notfound){
            bot.speak('Sorry, I couldn\'t find any such songs dude');
          }
        });
      }else if(data.text.match(/^\/random$/) || data.text.match(/^\/shuffle$/)){

        // Skip to a random song
        // [/random, /shuffle]
        console.log('random || shuffle'.grey);
        bot.speak('@' + data.name + ', LETS FIND YOU A SONG!');
        bot.playlistAll(function(playlist){
          var notfound = true;

          // Choose a song at random
          var song_position = parseInt((playlist.list.length-11)*Math.random(), 10);
          console.log('song #%s | %s by: %s', song_position, playlist.list[song_position].metadata.song, playlist.list[song_position].metadata.artist);
          bot.playlistReorder(song_position, 0, function(){
            console.log('Song is to be skipped!'.yellow);
            bot.skip();
          });

        });
      }else if(data.text.match(/^\/search/) || data.text.match(/^\/find/)){

        // Skip to a specific song
        // [/search, /find]
        console.log('search || find'.grey);
        var query = String(data.text.substr(7, data.text.length-7));
        if(query[0] == ' '){
          query = query.substr(1, query.length-1);
        }
        bot.speak('@' + data.name + ', I\'m looking for the song "' + query + '"');
        bot.playlistAll(function(playlist){
          var notfound = true;
          for(var i = 0; i < playlist.list.length && notfound; i++){
            if( (playlist.list[i].metadata.song && playlist.list[i].metadata.song.toLowerCase().indexOf(query) !== -1)
             || (playlist.list[i].metadata.artist && playlist.list[i].metadata.artist.toLowerCase().indexOf(query) !== -1) ){
              notfound = false;
              bot.playlistReorder(i, 0, function(){
                //bot.skip();
              });
            }
          }
          if(notfound){
            bot.speak('Sorry, I couldn\'t find any such songs dude');
          }
        });
      }else if(data.text.match(/^\/cure/)){
        chatty.chatty.emit('off');
      }else if(data.text.match(/^\/infect/)){
        chatty.chatty.emit('on');
      }else if(data.text.match(/botdance/)){
        bot.speak(':heart::heart::heart::dancer::panda_face::heart::heart::heart:');
      }
    }
  }
};