exports.index = function(req, res){
  // res.render('helo', { title: 'Route Separation Example', message: 'berhasil' });
  res.render('help/main', { title: 'Route Separation Example' });
};
