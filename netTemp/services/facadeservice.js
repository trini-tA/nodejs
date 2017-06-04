var express = require('express');
var router = express.Router();


global.dicoLoadService = {};

//var srv_echo = require( './srv_echo' );
var srv_nop = require('./srv_nop');

function findService(srvName) {

    if (srvName in global.dicoLoadService) {
        return global.dicoLoadService[srvName];
    }

    var wrkName = './srv_' + srvName.substr(1);
    var wrkModule = null;
    try {
        wrkModule = require(wrkName);
    } catch (err) {
        console.log(wrkModule + err.message);
    }
    if (wrkModule) {
        global.dicoLoadService[wrkName] = wrkModule;
        return wrkModule;
    }

    return srv_nop;

}

router.post('/*', function(req, res, next) {
    // recup url
    var urlWrk = req.url;
    // recherche dans lib des services
    var srvWrk = findService(urlWrk);
    srvWrk.process(req, res);

});

/*router.post('/toto', function(req, res, next) {

	res.send( 'dsfsqdfsdf' );

});*/
module.exports = router;