var colors = require('colors');

exports.register = function(data, bot) {
  var new_user = String(data.user[0].userid);
  bot.pm('Welcome to Mattman\'s Rave Bunker!', new_user);
  console.log('Someone registered'.green);
}