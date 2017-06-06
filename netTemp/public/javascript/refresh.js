$(document).ready(function() {

    $('#buttRefreshTemp').click(function() {
        var getCurrentTemp = $.post('/services/currentTemp', '', function(obj_currentTemp) {
            obj_currentTemp = JSON.parse(obj_currentTemp);

            if (obj_currentTemp.temp != undefined) {
                $('#lblCurrentTemp').text('Current temp is : ' + obj_currentTemp.temp + '°C');

                // save it
                /* $.ajax({
                    type: 'POST',
                    url: '/services/savedb',
                    //timeout: 15000,
                    data: JSON.stringify({ 'currentTemp': obj_currentTemp.temp }),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    //processData: false,
                    success: function(result) {
                        if (result.code != undefined) {
                            if (result.code == 0) {
                                console.log('Error 2 save db current value');
                            } else {
                                //nothing save is good :)
                            }
                        } else {
                            console.log('Error 1 save db current value');
                        }
                    },
                    error: function(error) {
                        console.log("Error 0 save db current value");
                    }

                });*/
                // save it
            }

        });
    });

});