exports.begin = function(data, bot){
  console.log('The bot has changed room.');
  bot.addModerator('51242d36aaa5cd674574872d');
  bot.addDj();

  bot.roomInfo(function(d){
    console.log('moderator id\s = ', d.room.metadata.moderator_id);
    console.log(d.room.metadata.current_dj);
  });

  /*setTimeout(function(){
    bot.roomInfo(function(d){
      bot.remDj(d.room.metadata.current_dj, function(reason){
        console.log('dj removal');
        console.log(reason);
      });
    });
  }, 0);*/
};