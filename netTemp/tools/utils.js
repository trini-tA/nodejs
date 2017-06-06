module.exports = {
    readTemp: function(callback) {

        var fs = require('fs');
        var param = require('../param');
        var codeReturn = {
            "code": -1,
            "msg": 'Error ...',
            "data": {}
        }

        fs.readFile(param.conf.tempFiles.path + param.conf.tempFiles.w1_slave, function(err, data) {

            if (data != undefined) {
                //console.log('w1_slave: ' + data);
                var text = data.toString('utf8');
                array = text.split("t=");
                //parse contentt
                if (array.length == 2) {
                    codeReturn.data = JSON.stringify({ "temp": array[1] / param.conf.convertTemp });
                    codeReturn.code = 1;
                    codeReturn.msg = 'OK';

                } else {
                    codeReturn.code = 0;
                    codeReturn.msg = 'Error parse system file ';
                }



                callback(codeReturn);

            } else {
                codeReturn.code = 0;
                codeReturn.msg = 'Error on read temp file :( ';

                callback(codeReturn);

            }

        });
    },
    saveTemp: function(objTemp, callback) {
        //var sqlite3 = require('sqlite3').verbose();
        var sqlite3 = require('sqlite3');
        var param = require('../param');
        var codeReturn = {
            "code": -1,
            "msg": 'Error ...',
            "data": {}
        }

        var db = new sqlite3.Database(param.conf.db.path + param.conf.db.name);
        var check;
        db.serialize(function() {

            // create table ifnot exists
            db.run("CREATE TABLE if not exists net_temp (timestamp datetime DEFAULT CURRENT_TIMESTAMP NOT NULL, value int NOT NULL, id_piece int NOT NULL)");

            var stmt = db.prepare("INSERT INTO net_temp VALUES (?,?,?)");
            // zone 
            var saveTemp = objTemp.currentTemp * param.conf.convertTemp;
            stmt.run(new Date(), saveTemp, param.conf.zone.devZone);
            stmt.finalize();

        });

        db.close();


        //fixme add try catch !
        codeReturn.code = 1;
        codeReturn.msg = 'OK';

        callback(codeReturn);
    },
    selectData: function(queryParam, orderby, limit, callback) {
        var sqlite3 = require('sqlite3');
        var param = require('../param');
        var codeReturn = {
            code: -1,
            "msg": 'Error ...',
            data: {}
        };
        var netTemp = [];
        var query = "select timestamp, value, id_piece from net_temp";
        if (orderby != undefined) {
            query += " " + orderby;
        }
        if (limit != undefined) {
            query += " " + limit;
        }
        var db = new sqlite3.Database(param.conf.db.path + param.conf.db.name);
        db.serialize(function() {
            db.each(query, function(err, row) {

                    if (err != undefined) {
                        codeReturn.code = 0;
                        codeReturn.msg = err.message;
                        callback(codeReturn);
                    } else {

                        var date = new Date(row.timestamp);

                        netTemp.push({
                            timestamp: date.toISOString(),
                            temp: row.value,
                            id_piece: row.id_piece,
                        });

                    }
                    ///console.log(row.timestamp + ": " + row.value);
                },
                function complete(err, found) {
                    codeReturn.code = 1;
                    codeReturn.msg = 'OK';
                    codeReturn.data = netTemp;

                    callback(codeReturn);
                }
            );


        });
        db.close();



    },

}