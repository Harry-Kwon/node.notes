var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: true});

//params: app - express app
module.exports = function (app) {
  //render view from data from database
  app.get('/notes', function(req, res){
    res.sendFile('/assets/index.html', {root: __dirname+'/..'});
    //res.render('');
  });
  
  //create new note
  app.post('/notes', function(req, res){
    res.sendFile('/assets/index.html', {root: __dirname+'/..'});
    //res.render('');
  });
  
          
}