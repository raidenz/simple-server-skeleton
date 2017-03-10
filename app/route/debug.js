import express from 'express';
import multer from 'multer';

var router = express.Router()

var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'public/uploads/' )
  },
  filename: function(req, file,cb){
    cb(null, Date.now() + file.originalname.toLowerCase());
  }
})
var uploader = multer({
  storage:storage,
  limits: {fieldNameSize: 100, fileSize: 1000000}
})

/**
 * debug
 */
router.get('/', function (req, res) {
  res.send('call debug')
});

/**
 * debug form input
 * method="POST" encType="multipart/form-data"
 * sample with react and fetch
 *
 *
 * direction
 * https://ewiggin.gitbooks.io/expressjs-middleware/content/multer.html
 *
 * whatwg-fetch
 *
 * fetch('http://192.168.33.10:8082/debug/form/', {
 *    mode: 'no-cors',
 *    method: 'POST',
 *    body: new FormData(e.target)
 * })
 *
 */

router.post('/form', uploader.any(), function(req, res, next){

  console.log(req.body )
  console.log(req.files )
  res.json({"status":"completed"});

});

module.exports = router
