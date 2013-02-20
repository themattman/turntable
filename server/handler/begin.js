var colors = require('colors');

exports.begin = function(data, bot){
  console.log('The bot has entered the "%s" room.'.green, data.room.name);

  // Elevate privileges
  bot.addModerator('51242d36aaa5cd674574872d', callback);
  bot.addDj(callback);

  /*bot.roomInfo(function(d){
    //console.log('moderator id\s = ', d.room.metadata.moderator_id);
    if(d.room.metadata.current_dj){
      console.log(d.room.metadata.current_dj);
    }
  });*/

  /*setTimeout(function(){
    bot.roomInfo(function(d){
      bot.remDj(d.room.metadata.current_dj, function(reason){
        console.log('dj removal');
        console.log(reason);
      });
    });
  }, 0);*/
};

var callback = function(e, b) {
  //console.log(e);
  if(e.success === true){
    console.log('The bot is a moderator'.green);
  } else {
    console.log('The bot failed to become moderator [%s]'.red, e.err);
  }
}