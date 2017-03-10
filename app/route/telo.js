import express from 'express';
var router = express.Router()

// telo
router.get('/', function (req, res) {
  res.send('call telo')
});

// telo/telo
router.get('/telo', function(req,res){
  // console.log(req);
  res.type('text/plain');
  res.send('i am a telo');
});

// telo with prefix must place at the bottom
// telo/1

router.get('/:id', function(req,res){
  res.type('text/plain');
  res.send('i am a telo ' + req.params.id);
});

module.exports = router
