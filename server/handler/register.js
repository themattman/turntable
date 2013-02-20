exports.register = function(data, bot) {
  var new_user = String(data.user[0].userid);
  console.log(new_user);
  bot.pm('Welcome to Mattman\'s Rave Bunker!', new_user);
  console.log('Someone registered');
}