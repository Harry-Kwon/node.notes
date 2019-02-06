var bodyParser = require('body-parser');
var db = require('./db.js');
var uuidv4 = require('uuid/v4');
var session = require('express-session');

const bcrypt = require('bcrypt');
const saltRounds = 10;

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

function getSubset(keyArr, obj){
  let subset = validKeys.reduce(function(data, keyString) {
    data[keyString] = obj[keyString];
    return data;
  }, {});
  return subset;
}

module.exports = function (app) {
  //use session middleware
  console.log('using a dummy session secret');
  app.use(session({secret: 'DUMMY_SECRET',
                   maxAge: 60000,
                   resave: false,
                   saveUninitialized: false,
                   cookie: {/*secure:true*/}}));
  
  // checks if username is valid
  // returns true if user with <username> does not exist in database
  app.get('/users/available/:username', function(req, res){
    validateUsername(req.params.username, function(isValid){
      res.send({valid: isValid});
    });
  });
  
  app.post('/users/sign-up', urlencodedParser, function(req, res){
    
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
  app.post('/users/login', urlencodedParser, function(req, res){
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
  
  app.get('/users/logout/:username', function(req, res){
    //destroy session
    req.session.destroy(function(){
      db.findUser({username: req.params.username}, function(data){
        if(!data[0]) throw {};
        if(data.length>1) throw {};
        let user = data[0];
        
        //unbind user to sessionId
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