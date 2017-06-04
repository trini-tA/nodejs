(function() {

    var engine = {
        init: function() {
            $('document').ready(engine.main);
        },
        main: function() {
            console.log('Start main program');

            var getCurrentTemp = $.post('/services/currentTemp', '', function(obj_currentTemp) {
                obj_currentTemp = JSON.parse(obj_currentTemp);

                if (obj_currentTemp.temp != undefined) {
                    $('#divCurrentTemp').text('Current temp is: ' + obj_currentTemp.temp + '°C');

                    // save it
                    $.ajax({
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

                    });

                }

            });


            var getData = $.post('/services/temp', '', function(data) {
                //console.log('/services/temp\n' + data);
                if (data != undefined) {

                    // convert data csv to json
                    var dataSet = [];
                    var jsonTemp = [];
                    var postData = data.split("\n"); // convert string to array
                    var countValue = 0;
                    for (var i = 0; i < postData.length; i++) {
                        // id main_table
                        if (i > 0) {

                            // table head
                            var value = postData[i].split(',');

                            /* var newTH = $('<tr class="">');
                            var newTR1 = $('<td class="">');
                            newTR1.text( value[0] );
                            var newTR2 = $('<td class="">');
                            newTR2.text( value[1]/1000.00 );
							
                            newTH.append(newTR1);
                            newTH.append(newTR2);
							
                            $('#main_table').append( newTH );*/
                            dataSet.push([
                                value[0].replace('-', '/').replace('-', '/').replace('-', '/'),
                                value[1] / 1000.00
                            ]);

                            if (i > postData.length - 15) {
                                if (countValue < 13) {
                                    countValue++;
                                    jsonTemp.push(value[1] / 1000.00);
                                }
                            }
                        }
                        //console.log( postData[i]);

                    }

                    $(document).ready(function() {
                        $('#main_table').DataTable({
                            data: dataSet,
                            columns: [
                                { title: "Date" },
                                { title: "Temperature" },
                            ],
                            columnDefs: [{
                                type: 'date-euro',
                                targets: 0,
                                targets: [0],
                                orderData: [0, 1]
                            }, {
                                targets: [1],
                                orderData: [1, 0]
                            }, ]
                        });
                    });

                    $('#container').highcharts({
                        title: {
                            text: 'Monthly Average Temperature',
                            x: -20 //center
                        },
                        subtitle: {
                            text: 'Source: Garage',
                            x: -20
                        },
                        xAxis: {
                            categories: []
                        },
                        yAxis: {
                            title: {
                                text: 'Temperature (°C)'
                            },
                            plotLines: [{
                                value: 0,
                                width: 1,
                                color: '#808080'
                            }]
                        },
                        tooltip: {
                            valueSuffix: '°C'
                        },
                        legend: {
                            layout: 'vertical',
                            align: 'right',
                            verticalAlign: 'middle',
                            borderWidth: 0
                        },
                        series: [{
                            name: 'Garage',
                            data: jsonTemp
                        }, ]
                    });

                } else {
                    console.log('Warning no data present oO');
                }
            });


            /****var comObj = $.post('/services/temp', '', function(data) {
            	console.log('services/temp----> ' + JSON.stringify(data));
            });**/
        },
    };

    engine.init();
})();

/**
 * 
 *  $('#container').highcharts({
        title: {
            text: 'Monthly Average Temperature',
            x: -20 //center
        },
        subtitle: {
            text: 'Source: WorldClimate.com',
            x: -20
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: 'Temperature (°C)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '°C'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'Tokyo',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: 'New York',
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
        }, {
            name: 'Berlin',
            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
        }, {
            name: 'London',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }]
    });
 */