var fs = require('fs');

// Config local
// /sys/bus/w1/devices/28-041450fb22ff/w1_slave
/*
    Example:

    94 01 55 00 7f ff 0c 10 1b : crc=1b YES
    94 01 55 00 7f ff 0c 10 1b t=25250

 */
var conf = {
    file: {
        path: 'w1_slave',
    }
};

/**
 * 
 * 
 * 
 * @param req
 * @param resp
 */
function postProcess(req, resp) {

    fs.readFile(conf.file.path, function(err, data) {

        if (data != undefined) {
            //console.log('w1_slave: ' + data);
            var text = data.toString('utf8');
            array = text.split("t=");
            //parse contentt
            if (array.length == 2) {
                temp = { temp: array[1] / 1000.00 };
            }
            //console.log("data return is: " + temp);
            resp.status(200).send(temp);
            //resp.sendStatus( data );
        } else {
            resp.sendStatus(204);
        }

    });
}


exports.process = postProcess;