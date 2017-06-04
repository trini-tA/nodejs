/**
 * 
 * 
 * 
 * 
 * // /sys/bus/w1/devices/28-041450fb22ff/w1_slave
 */
exports.conf = {
    tempFiles: {
        path: '',
        w1_slave: 'w1_slave',
    },
    tempTxtFile: {
        path: '',
        filename: 'temp.txt',
    },
    convertTemp: 1000.00,
    db: {
        path: '',
        name: 'netTemp.db',
    },
    zone: {
        devZone: 0,
        garage: 1,
    }

};