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
      , 'e': data.command
    };

    col.insert(log_data, function(err, d){
      if(err){throw err;}
    });
  });

  // Welcome the user with a dialog box
  var new_user = String(data.user[0].userid);
  if(data.user[0].userid === '504b84ffeb35c128830005b5') {
    bot.pm('fuk u eric', new_user);
  } else {
    bot.pm('Welcome to the Q Intern Rave Bunker. Enjoy the music!', new_user);
  }
  console.log('New user has registered:'.green, data.user[0].name);
};

exports.recordMod = function(data, bot){
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
};