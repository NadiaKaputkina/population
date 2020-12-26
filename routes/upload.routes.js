var express = require('express');
var router = express.Router();

const upload = require('./middleware/upload');
const { uploadFiles } = require('../controllers/upload.controller');

const db = require('../models');
const Image = db.Image;

const auth = require('./middleware/auth');
const permissions = require('./middleware/permissions');

router.post('/upload', upload.single('Photo'), uploadFiles);

router.post('/get-photo-by-user', auth, permissions, function(req, res, next) {
    const { UserId } = req.body;
  
    Image.getPhotoByUserId(UserId)
      .then(photo =>  {
          const img = {
            Path: `/images/${photo.Name}`,
            Title: photo.Title
        }
        return res.status(200).send(img) 
      })
      .catch(error => res.send(error) )
});

module.exports = router;
