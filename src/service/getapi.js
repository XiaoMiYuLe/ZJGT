//var superagnet = require('superagent');
var http = require('http');
module.exports = class extends think.Service {
    async httpGet(options) {
        var that = this;
        return new Promise(function (resolve) {
            http.get(options, function (res) {
                res.setEncoding('utf8');
                var statusCode = res.statusCode;
                var getData = '';
                if (statusCode == 200) {
                    res.on('data', function (chunk) {
                        getData += chunk;
                    }).on('end', function () {
                        var obj = JSON.parse(getData);
//                        resolve(obj);
                         resolve(obj.data);
                    });
                } else {
                    console.log(statusCode);
                }
            }).on('error', function (e) {
                console.log(e.message);
            });
        });
    }
};