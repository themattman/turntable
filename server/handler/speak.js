var USERID = require('../secret.js').USERID
;

exports.spoken = function(data, bot){
  if(data){

    if(data.userid !== USERID) {
      if (data.text.match(/^\/hello$/)) {
        bot.speak('Hey! How are you @'+data.name+' ?');
      } else if(data.text.match(/^\/boot$/)) {
        bot.roomInfo(function(d){
          bot.remDj(d.room.metadata.current_dj, function(e){
            console.log('DJ Removed'.red);
            bot.speak('DJ Removed');
          });
        });
      }
      //bot.speak('Can I help you '+data.name+'?');
      //bot.pm('GOFUKURSELF '+data.name, data.userid);
    }

  }
}