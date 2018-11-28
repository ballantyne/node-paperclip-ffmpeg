node-paperclip-ffmpeg
=========

This is a plugin that works with node-paperclip.  It allows you to pass whatever options you want to ffmpeg and then stream to the file system or the cloud. 

To install 

```bash
sudo add-apt-repository ppa:djcj/hybrid
sudo apt-get update
sudo apt-get install ffmpeg
# if there is a better way to install this please let me know.

# Maybe this would work for windows? https://www.wikihow.com/Install-FFmpeg-on-Windows
# I haven't tested it.

npm install node-paperclip-ffmpeg --save
```

Here is an example of a model that uses the mongoose plugin.

```javascript
const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;
const Paperclip    = require('node-paperclip');

const Video = new Schema({});

Video.plugin(Paperclip.plugins.mongoose, {
  video: {
    video: { 
      styles: [
        { original: true },
        { 
          task: require('node-paperclip-ffmpeg'), 
          commands: [
            { videoBitrate: 1000 }
          ]
        } 
        // hopefully you can use any of the options listed here:
        // https://github.com/fluent-ffmpeg/node-fluent-ffmpeg
        // I haven't been able to test this yet, 
      ],
      storage: 'file'
    }
  }
})

module.exports     = mongoose.model('Video', Video);
```

Here is an example of an express route that uses that Video model.


```javascript
const express      = require('express');
const router       = express.Router();

const Video        = require('video');
const middleware   = require('node-paperclip').middleware

router.post('/post_video',

    middleware.parse({stream: true}), 

  function (req, res) {  
    Video.create(req.body.video, function(err, doc) {
      res.redirect('/');
    });
})

```

```html
    <form  class="form-horizontal" enctype="multipart/form-data" action="/post_video" method="post">

    <div>
      <label>File</label>
      <input type="file" name="video[video]" id="file">
    </div>

    <div  class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <input class='btn btn-default' type="submit" value="Save"/>
      </div>
    </div>
    </form>

```


Contributing
------------

If you'd like to contribute a feature or bugfix: Thanks! To make sure your
fix/feature has a high chance of being included, please read the following
guidelines:

1. Post a [pull request](https://github.com/ballantyne/node-paperclip-ffmpeg/compare/).
2. Make sure there are tests! We will not accept any patch that is not tested.
   It's a rare time when explicit tests aren't needed. If you have questions
   about writing tests for paperclip, please open a
   [GitHub issue](https://github.com/ballantyne/node-paperclip-ffmpeg/issues/new).


And once there are some contributors, then I would like to thank all of [the contributors](https://github.com/ballantyne/node-paperclip-ffmpeg/graphs/contributors)!

Donations
------------

If you'd like to contribute with bitcoin or another cryptocurrency you can send coins to the addresses below:

* ETH: 0xc3Cc87CFD19521e55c27832EdDb2cAFE2577F28E
* BTC: 1CqyYz717jUwENBraXAVr8hZtnK8k23vPK
* BCH: 129mMPtwjKce54FGE6rsRE4Ty2wFCKeQmr
* LTC: LPvwrQjYzTfE8DJFmpdcpjNw9zeuhxhdE6

License
-------

It is free software, and may be redistributed under the terms specified in the MIT-LICENSE file.

Copyright 
-------
© 2017 Scott Ballantyne. See LICENSE for details.



