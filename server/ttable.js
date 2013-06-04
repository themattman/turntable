var AUTH       = require('./secret.js').AUTH
  , ROOMID     = require('./secret.js').ROOMID
  , USERID     = require('./secret.js').USERID
  , beginjs    = require('./handler/begin.js')
  , djjs       = require('./handler/dj.js')
  , registerjs = require('./handler/register.js')
  , speakjs    = require('./handler/speak.js')
  , songjs     = require('./handler/song.js')
  , colors     = require('colors')
  , Bot        = require('ttapi')
  , bot        = new Bot(AUTH, USERID, ROOMID)
;

// Event Handlers
bot.on('ready',       function (data) { bot.roomRegister(ROOMID);       });
bot.on('roomChanged', function (data) { beginjs.begin(data, bot);       });
bot.on('speak',       function (data) { speakjs.spoken(data, bot);      });
bot.on('registered',  function (data) { registerjs.register(data, bot); });
bot.on('endsong',     function (data) { songjs.endsong(data, bot);      });
bot.on('newsong',     function (data) { songjs.newsong(data, bot);      });
bot.on('add_dj',      function (data) { djjs.dj(data, bot);             });