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

//listen to port
app.listen(80);
console.log('Notes app listening on port 80');
console.log('FOR DEVELOPMENT SERVER ONLY. LISTEN ON 3000 AND USE A REVERSE PROXY ON A PROUDCTION SERVER')
