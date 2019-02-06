var bodyParser = require('body-parser');
var db = require('./db.js');

var urlencodedParser = bodyParser.urlencoded({extended: true});

// username - username to check if valid
// returns boolean isValid to callback
function validateUsername(candidateUsername, callback) {
  db.findUser({username: candidateUsername}, function(docs){
    let isValid = (docs.length===0);
    
    if(isValid){
      let format = /[!]/;
      isValid = !format.test(candidateUsername)
    }
    
    callback(isValid);
  });
}

module.exports = function (app) {
  // checks if username is valid
  // returns true if user with <username> does not exist in database
  app.get('/users/available/:username', function(req, res){
    validateUsername(req.params.username, function(isValid){
      res.send({valid: isValid});
    });
  });
  
  app.post('/users/sign-up', urlencodedParser, function(req, res){
    //validate username
    let validKeys = ['username', 'passwordSalt', 'passwordHash'];
    let hasRequiredKeys = true;
    let userData = validKeys.reduce(function(data, keyString) {
      data[keyString] = req.body[keyString];
      if(!data[keyString]) hasRequiredKeys = false;
      return data
    }, {});
    
    if(!hasRequiredKeys) {
      res.status(400).send('missing keys');
    } else {
      console.log('hi');
      validateUsername(userData.username, function(isValid){
        if(isValid){
          db.createUser(userData, function(createdUser) {
            res.send('created new user: ' + createdUser.username);
          });
        } else {
          res.status(400).send('invalid username');
        }
      });
    }
    
  });
 	
  // login
  app.post('/users/login', urlencodedParser, function(req, res){
    console.log(req.sessionId);
  });

}