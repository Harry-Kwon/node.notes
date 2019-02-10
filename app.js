var express = require('express');
var notesController = require('./controllers/notesController.js');
var userController = require('./controllers/userActionController.js');

//create express app
var app = express();

//set up ejs template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./assets'));

//fire controllers
notesController(app);
userController(app);

app.use(function(req, res){
  res.status(404).send('page not found');
});

//listen to port
app.listen(3000);
console.log('Notes app listening on port 3000');
