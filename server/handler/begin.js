var colors = require('colors')
;

exports.begin = function(data, bot){

  // Elevate privileges
  bot.addModerator('51242d36aaa5cd674574872d', function(e){
    if (e.success === true) {
      console.log('The bot is a moderator'.green);
    } else {
      console.log('The bot failed to become moderator [%s]'.red, e.err);
      console.log(e);
    }
  });

  // Add the bot as a DJ
  bot.addDj(function(e){
    if(e.success === true) {console.log('The bot is a dj'.green);}
    else {console.log('The bot failed to become dj [%s]'.red, e.err);}
  });
};