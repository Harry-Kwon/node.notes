var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.rulencoded({extended: true});

//params: app - express app
module.exports = function (app) {
  app.get('/', function(req, res){
    res.render('home');
  });
          
}