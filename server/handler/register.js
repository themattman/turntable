var colors = require('colors')
  , mongo  = require('../database.js')
;

exports.register = function(data, bot) {

  // Log detailed new users data!
  mongo.db.collection('users', function(err, col){
    if(err){throw err;}
    col.insert(data.user[0], function(err, d){
      if(err){throw err;}
    });
  });

  mongo.db.collection('entry_log', function(err, col){
    if(err){throw err;}
    // Record data suitable for MapReduce
    var log_data = {
      'ts': Date.now()
      , 'name': data.user[0].name
      , 'uid': data.user[0].userid
    };

    col.insert(log_data, function(err, d){
      if(err){throw err;}
    });
  });

  // Welcome the user with a dialog box
  var new_user = String(data.user[0].userid);
  bot.pm('Welcome to Mattman\'s Rave Bunker! Enjoy the music, but please note that you must be approved by a mod to be DJ.', new_user);
  console.log('Someone registered'.green, data.user[0].name);
};