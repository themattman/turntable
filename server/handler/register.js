var colors = require('colors');

exports.register = function(data, bot) {
  var new_user = String(data.user[0].userid);
  bot.pm('Welcome to Mattman\'s Rave Bunker! Enjoy the music, but please note that you must be approved by a mod to be DJ.', new_user);
  console.log('Someone registered'.green);
}