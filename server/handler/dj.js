var mods   = []
  , secret = require('../secret.js')
  , authd  = false;
;

mods = secret.mods;

// Triggered when a user takes a dj spot
exports.dj = function(data, bot){

  // Boot the dj if he is not in the whitelist
  if(mods.indexOf(data.user[0].userid) === -1){
    console.log('The DJ "%s" is not approved, he has been booted.', data.user[0].userid);
    bot.remDj(data.user[0].userid);
  }else{
    console.log('The DJ "%s" is approved, he is now on stage.', data.user[0].userid);
  }
};