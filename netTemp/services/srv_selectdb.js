var tools = require('../tools/utils');

/**
 * 
 * 
 * 
 * @param req
 * @param resp
 */
function postProcess(req, resp) {
    var request = {};

    if ('body' in request) {
        request = req.body;
    } else {
        request = {};
    }

    tools.selectData(undefined, undefined, undefined, function(code) {
        if (code.code == 1) {
            resp.send(code);

        } else {
            resp.sendStatus(204);
        }
    });

    //resp.sendStatus(200);
    //resp.sendStatus(400);

}


exports.process = postProcess;