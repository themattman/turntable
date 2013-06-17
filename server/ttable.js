var AUTH       = require('./secret.js').AUTH
  , ROOMID     = require('./secret.js').ROOMID
  , USERID     = require('./secret.js').USERID
  , VERSION    = require('./secret.js').VERSION
  , beginjs    = require('./handler/begin.js')
  , djjs       = require('./handler/dj.js')
  , registerjs = require('./handler/register.js')
  , speakjs    = require('./handler/speak.js')
  , songjs     = require('./handler/song.js')
  , colors     = require('colors')
  , quotes     = require('./quotes.js').startrek
  , mongo      = require('./database.js')
  , Bot        = require('ttapi')
  , bot        = new Bot(AUTH, USERID, ROOMID[VERSION - 1])
;

// Connect to the MongoHQ instance
mongo.connect(function(msg, col) {
  if(msg == null) {
    console.log("Mongo Connected!".yellow);
    collection = col;
  } else 
    console.log(msg);
});

// Event Handlers
if(VERSION === 1) {
  // 1: Booting Splooga

  bot.on('ready',         function (data) { bot.roomRegister(ROOMID[VERSION - 1]); });
  bot.on('roomChanged',   function (data) { beginjs.begin(data, bot);              });
  bot.on('speak',         function (data) { speakjs.spoken(data, bot);             });
  bot.on('registered',    function (data) { registerjs.register(data, bot);        });
  bot.on('newsong',       function (data) { songjs.newsong(data, bot);             });
  bot.on('endsong',       function (data) { songjs.addsong(data, bot);             });
  bot.on('new_moderator', function (data) { console.log(data);                     });
  bot.on('rem_moderator', function (data) { console.log(data);                     });
  bot.on('add_dj',        function (data) { djjs.dj(data, bot);                    });
  bot.on('rem_dj',        function (data) {
    // Add the bot as a DJ
    bot.addDj(function(e){
      if(e.success === true) {console.log('The bot is a dj'.green);}
      else {console.log('The bot failed to become dj [%s]'.red, e.err);}
    });
  });

} else if(VERSION === 2) {
  // 2: Tourette's Bot

  // This bot has tourettes
  setInterval(function(){
    var r = Math.round((quotes.length-1)*Math.random());
    bot.speak(quotes[r]);
  }, 1000*(1+100*Math.random()));

  bot.on('ready',         function (data) { bot.roomRegister(ROOMID[VERSION - 1]); });
  bot.on('roomChanged',   function (data) { beginjs.begin(data, bot);              });
  bot.on('registered',    function (data) { registerjs.register(data, bot);        });
  bot.on('new_moderator', function (data) { console.log(data);                     });
  bot.on('rem_moderator', function (data) { console.log(data);                     });
  bot.on('rem_dj',        function (data) {
    // Add the bot as a DJ
    bot.addDj(function(e){
      if(e.success === true) {console.log('The bot is a dj'.green);}
      else {console.log('The bot failed to become dj [%s]'.red, e.err);}
    });
  });

} else if(VERSION === 3) {
  // 3: QInterns Bot

  // This bot has tourettes
  setInterval(function(){
    var r = Math.round((quotes.length-1)*Math.random());
    bot.speak(quotes[r]);
  }, 4000*(1+100*Math.random()));

  bot.on('ready',         function (data) { bot.roomRegister(ROOMID[VERSION - 1]); });
  bot.on('roomChanged',   function (data) { beginjs.begin(data, bot);              });
  bot.on('speak',         function (data) { speakjs.spoken(data, bot);             });
  bot.on('registered',    function (data) { registerjs.register(data, bot);        });
  bot.on('deregistered',  function (data) { registerjs.register(data, bot);        });
  bot.on('endsong',       function (data) { songjs.recordsong(data, bot);          });
  bot.on('new_moderator', function (data) { registerjs.recordMod(data, bot);       });
  bot.on('rem_moderator', function (data) { registerjs.recordMod(data, bot);       });
  bot.on('add_dj',        function (data) { djjs.recordDj(data, bot);              });
  bot.on('rem_dj',        function (data) { djjs.recordDj(data, bot);              });

}

// TTAPI
/*
bot.on('tcpConnect',    function (data) {console.log(data);});
bot.on('tcpMessage',    function (data) {console.log(data);});
bot.on('tcpEnd',        function (data) {console.log(data);});
bot.on('httpRequest',   function (data) {console.log(data);});
bot.on('registered',    function (data) {console.log(data);});
bot.on('deregistered',  function (data) {console.log(data);});
bot.on('speak',         function (data) {console.log(data);});
bot.on('endsong',       function (data) {console.log(data);});
bot.on('nosong',        function (data) {console.log(data);});
bot.on('update_votes',  function (data) {console.log(data);});
bot.on('booted_user',   function (data) {console.log(data);});
bot.on('update_user',   function (data) {console.log(data);});
bot.on('add_dj',        function (data) {console.log(data);});
bot.on('rem_dj',        function (data) {console.log(data);});
bot.on('escort',        function (data) {console.log(data);});
bot.on('new_moderator', function (data) {console.log(data);});
bot.on('rem_moderator', function (data) {console.log(data);});
bot.on('snagged',       function (data) {console.log(data);});
bot.on('pmmed',         function (data) {console.log(data);});
*/