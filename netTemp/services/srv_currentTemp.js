var tools = require('../tools/utils');
/**
 * 
 * 
 * @param req
 * @param resp
 */
function postProcess(req, resp) {

    tools.readTemp(function(code) {
        if (code.code == 1) {
            resp.send(code.data); //todo good method ?
        } else {
            resp.sendStatus(204);
        }
    });
}


exports.process = postProcess;