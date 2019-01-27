var http = require('http');
var fs = require('fs');

//create server
var server = http.createServer(function(req, res) {
  console.log('request was made: ' + req.url);
  res.writeHead(200, {'Content-Type': 'text/html'});
  
  var myReadStream = fs.createReadStream(__dirname + '/../../html/index.html');
  myReadStream.pipe(res);
});

server.listen(3000, '0.0.0.0');
console.log('server listening on port 3000');