const ffmpeg      = require("fluent-ffmpeg");

module.exports    = function(paperclip) {
  var obj = {};
  
  obj.paperclip   = paperclip;

  obj.perform     = function(options, next) {
    var self      = this.paperclip;
    var command   = ffmpeg(this.paperclip.file().file.stream);

    for (i = 0; i < options.commands; i++) {
      var current = options.commands[i]
      var key     = _.first(_.keys(current));
      command     = command[key](current[key]);
    }

    var stream    = command.pipe();
    next(error, stream);
  }

  return obj;

};
