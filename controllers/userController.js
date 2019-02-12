var bodyParser = require('body-parser');
var db = require('./db.js');
var uuidv4 = require('uuid/v4');

const bcrypt = require('bcrypt');
const saltRounds = 10;

var urlencodedParser = bodyParser.urlencoded({extended: true});

// username - username to check if valid
// returns boolean isValid to callback
function validateUsername(candidateUsername, callback) {
  db.findUser({username: candidateUsername}, function(docs){
    let isValid = (docs.length===0);
    
    if(isValid){
      let format = /[\W]/;
      isValid = !format.test(candidateUsername)
    }
    
    callback(isValid);
  });
}

function getSubset(keyArr, obj){
  let subset = validKeys.reduce(function(data, keyString) {
    data[keyString] = obj[keyString];
    return data;
  }, {});
  return subset;
}

function logoutSession(sessionId) {
    db.findUser({sessionId: sessionId}, function(data){
      if(data.length!=1) return;
      let user = data[0];
      
      user.sessionId = '';
      user.save();
    });
}

module.exports = function (app) {
  // checks if username is valid
  // returns true if user with <username> does not exist in database
  app.get('/users/action/available/:username', function(req, res){
    validateUsername(req.params.username, function(isValid){
      res.send({valid: isValid});
    });
  });

  /** Routing for '/signup' **/
  app.get('/signup', function(req, res){
    res.render('home', {actionType: 'signup'});
  });

  app.get('/login', function(req, res){
    res.render('home', {actionType: 'login'});
  });
  
  app.post('/users/action/signup', urlencodedParser, function(req, res){
    
    //check if new username is valid
    validateUsername(req.body.username, function(isValid){
      if(isValid) {
        //generate salt using bcrpyt
        bcrypt.genSalt(saltRounds, function(err, salt){
          //hash password
          bcrypt.hash(req.body.password, salt, function(err, hash){
            //save salt and password
            db.createUser({username: req.body.username,
                          	passwordHash: hash},
                          function(createdUser){
            	res.send('created new user: ' + createdUser.username);
            });
          });
        });
      } else {
        res.status(400).send('invalid username');
      }
    });
  });
  
  // login
  // takes username and password 
  // checks saved passwordhash against input passwordhash
  // returns sessionId to response if valid
  app.post('/users/action/login', urlencodedParser, function(req, res){
    logoutSession(req.sessionID);

    //find user by username
    db.findUser({username: req.body.username}, function(data){
      if(!data[0]) throw {};
      if(data.length>1) throw {};
      let user = data[0];
      //salt is saved with hash in plaintext
      //validate password with bcrypt
      bcrypt.compare(req.body.password, user.passwordHash, function(err, isValid){
        if(err) throw err;
        if(isValid) {
          user.sessionId = req.sessionID;
          user.save();
          console.log('login user: ' + user.username);
          console.log('with sessionId: ' + user.sessionId);
          
          res.send('logged in successfully!');
        } else {
          res.status(400).send('invalid login details');
        }
      });
    });
  });
  
  app.get('/users/action/logout', function(req, res){
    //find user by sessionId
    db.findUser({sessionId: req.req.sessionID}, function(data){
      if(data.length!=1) throw {};
      let user = data[0];
      
      //destroy session
      req.session.destroy(function(){
        user.sessionId = '';
        user.save();
        console.log('user: ' + user.username + ' logged out');
        
        res.send('goodbye!');
      });
    });
  })
  
  app.get('/users/:username/profile', function(req, res){
    console.log('profile request: ' + req.params.username);
    console.log(req.sessionID);
    db.findUser({username: req.params.username}, function(data){
      if(!data[0]) throw {};
      if(data.length>1) throw {};
      let user = data[0];
      
      if(user.sessionId === req.sessionID) {
        res.send('yes');
      } else {
        res.send('no');
      }
    });
  })

}
