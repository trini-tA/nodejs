/**
 * 
 *  get Temp and save it
 * 
 */
var schedule = require('node-schedule');
var tools = require('./tools/utils');

// all 10 minutes
var j = schedule.scheduleJob('*/10 * * * *', function() {

    tools.readTemp(function(code) {
        if (code.code == 1) {
            obj_currentTemp = JSON.parse(code.data);
            tools.saveTemp({ 'currentTemp': obj_currentTemp.temp }, function(code) {
                if (code.code == 1) {
                    console.log("cron save ok !");
                } else {
                    //send mail ? save log ?
                    console.log("cron save Ko !");
                }
            });
        }
    });


});