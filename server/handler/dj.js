var mods   = []
  , secret = require('../secret.js')
  , authd  = false;
;

mods = secret.mods;

exports.dj = function(data, bot){
  for(var i = 0; i < mods.length; i++){
    if(data.userid === mods[i]){
      authd = true;
    }
  }

  if(!authd){
    //bot.remDj(data.userid);
    console.log('!authd1');
  }

  if(!mods[data.userid]){
    //bot.remDj(data.userid);
    console.log('!authd2');
  }
};