var Transform = require('stream').Transform;

/**
 * 
 * 
 * 
 * @param req
 * @param resp
 */
function postProcess(req, resp) {
		
	var data = null;
	
	if( 'data' in req.body ){
		data = req.body.data;
	}else{
		resp.sendStatus(408);
	}
	
	console.log(data);
	
	/*var parser = new Transform();
	parser._transform = function(data, encoding, done) {
		console.log( data );
		done();
		//resp.send( done );
	};
	console.log(data);*/
	
	resp.sendStatus( data );
	// no content resp.sendStatus( 204 );
	
		
	 
}

exports.process = postProcess;