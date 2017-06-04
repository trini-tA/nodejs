var fs = require('fs');
var param = require('../param');

/**
 * 
 * 
 * 
 * @param req
 * @param resp
 */
function postProcess(req, resp) {

    fs.readFile(param.conf.tempTxtFile.path + param.conf.tempTxtFile.filename, function(err, data) {

        if (data != undefined) {

            //FIXME create json structure and return it
            //resp.set({
            //    'content-Type': 'application/json'
            //});
            //resp.send(data);
            //https://stackoverflow.com/questions/19803421/jquery-post-to-node-js-fails
            //??? resp.json(request.body.page);

            //FIXME deprecated
            resp.status(200).send(data);
            //resp.sendStatus( data );
        } else {
            resp.sendStatus(204);
        }

        // no content 


    });
}

/*
 * 
 //console.log( "data trace : "+ data );
		//var data = "";
		//resp.setEncoding('utf8');
	 
		resp.on('data', function(chunk) {
	      data += chunk;
	    });
	 
		resp.on('end', function() {
	      var lines = data.split("\n"), buildTimes = [];
	      lines.forEach(function(line, index) {
	        var columns = line.split(",");
	        if(index != 0 && isEmpty(columns[0]) && isEmpty(columns[1]) ) {
	          buildTimes.push({ timestamp:  columns[0], temp: columns[1]/1000.00});
	        }
	      });
	 
	      console.log( "data trace : "+ buildTimes );
	      
	      resp.contentType('application/json');
	      resp.send(JSON.stringify(buildTimes));			
	    });
 
 * */

exports.process = postProcess;