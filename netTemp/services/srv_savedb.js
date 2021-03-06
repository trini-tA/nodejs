var tools = require('../tools/utils');

/**
 * 
 * 
 * 
 * @param req
 * @param resp
 */
function postProcess(req, resp) {
    var localTemp = -1;

    if ('body' in req) {
        localTemp = req.body;
        tools.saveTemp(localTemp, function(code) {
            if (code.code == 1) {
                resp.sendStatus(200);
            } else {
                resp.sendStatus(204);
            }
        });
    } else {
        resp.sendStatus(400);
    }


}


exports.process = postProcess;

/*

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mydb.db');
var check;
db.serialize(function() {

  db.run("CREATE TABLE if not exists user_info (info TEXT)");
  var stmt = db.prepare("INSERT INTO user_info VALUES (?)");
  for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
  }
  stmt.finalize();

  db.each("SELECT rowid AS id, info FROM user_info", function(err, row) {
      console.log(row.id + ": " + row.info);
  });
});

db.close(); 
{ currentTemp: obj_currentTemp.temp }
*/