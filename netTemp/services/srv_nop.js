/**
 * 
 * 
 * 
 * @param req
 * @param resp
 */
function postProcess( req, resp ){
	
	resp.send( 405 );
	
}

exports.process = postProcess;