var mods   = []
  , secret = require('../secret.js')
  , mongo  = require('../database.js')
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

exports.recordDj = function(data, bot){
  mongo.db.collection('dj_log', function(err, col){
    if(err){throw err;}
    // Record data suitable for MapReduce
    var log_data = {
      'ts': Date.now()
      , 'name': data.user[0].name
      , 'uid': data.user[0].userid
      // entered / exited
      , 'e': data.command
    };

    col.insert(log_data, function(err, d){
      if(err){throw err;}
    });
  });

  if(data.user[0] === secret.USERID){
    // Add the bot back as a DJ
    bot.addDj(function(e){
      if(e.success === true) {console.log('The bot is a dj'.green);}
      else {console.log('The bot failed to become dj [%s]'.red, e.err);}
    });
  }
};