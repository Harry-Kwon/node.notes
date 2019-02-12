var express = require('express');
var notesController = require('./controllers/notesController.js');
var userController = require('./controllers/userController.js');
var session = require('express-session');

//create express app
var app = express();

//set up ejs template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./assets'));

//sessions
app.use(session({secret: 'dummy secret',
                 maxAge: 60000,
                 resave: false,
                 saveUninitialized: true,
                 cookie: {/*secure:true*/}}));



app.get('/', function(req, res){
  res.render('home', {actionType: 'signup'});
});

//fire controllers
notesController(app);
userController(app);

//listen to port
app.listen(80);
console.log('Notes app listening on port 80');
console.log('FOR DEVELOPMENT SERVER ONLY. LISTEN ON 3000 AND USE A REVERSE PROXY ON A PROUDCTION SERVER')
