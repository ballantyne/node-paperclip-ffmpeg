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
      before_save: [{task: require('node-paperclip-ffmpeg')}]
      class_name: 'video',
      has_attached_file: 'video', 
      styles: [
        { original: true },
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

const Track        = require('video');
const middleware   = require('node-paperclip').middleware

router.post('/post_video',

    middleware.parse(), 

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

This module uses s3 by default, but can use a file system if you want.  The example above is configured to use the file system.  If you plan to use s3 you will need the following environment variables set the AWS_BUCKET, AWS_REGION, AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY.

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

License
-------

It is free software, and may be redistributed under the terms specified in the MIT-LICENSE file.

Copyright 
-------
© 2017 Scott Ballantyne. See LICENSE for details.



