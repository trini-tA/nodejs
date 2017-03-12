var express = require('express')
var app = express()
var path = require('path');
var facade = require('./services/facadeservice');

app.set('views', './')
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/services', facade);



app.get('/', function(req, res){
  res.render('index.jade', { title: 'Dashboard' });
});

app.get('/go', function (req, res) {
  var fs = require('fs');
  fs.readFile('temp.txt', function(err, data) {
    res.attachment("data.csv");
    res.end(data, 'UTF-8');    
  });

  //res.send('Hello World!')
})

app.get('/go/show', function(req, res) {
  var http = require('http');
  var site = http.createClient(3000, "localhost"); 
  var request = site.request("GET", "/go", {'host' : "localhost"})
  
  request.end();
  request.on('response', function(response) {
    var data = "";
    response.setEncoding('utf8');
 
    response.on('data', function(chunk) {
      data += chunk;
    });
 
    response.on('end', function() {
      var lines = data.split("\n"), buildTimes = [];
      lines.forEach(function(line, index) {
        var columns = line.split(",");
        if(index != 0 && isEmpty(columns[0]) && isEmpty(columns[1]) ) {
          buildTimes.push({ timestamp:  columns[0], temp: columns[1]/1000.00});
        }
      });
 
      res.contentType('application/json');
      res.send(JSON.stringify(buildTimes));			
    });
  });	
});
 
function isEmpty(column) {
  return column !== "" && column !== undefined
}

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
