var express = require('express');

//create express app
var app = express();

//set up ejs template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./assets'));

//listen to port
app.listen(3000);
console.log('Notes app listening on port 3000');