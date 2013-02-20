var USERID = require('../secret.js').USERID
;

exports.spoken = function(data, bot){
  if(data){

    if(data.userid !== USERID) {
      if (data.text.match(/^\/hello$/)) {
        bot.speak('Hey! How are you @'+data.name+' ?');
      }
      //bot.speak('Can I help you '+data.name+'?');
      bot.pm('GOFUKURSELF '+data.name, data.userid);
    }

  }
}