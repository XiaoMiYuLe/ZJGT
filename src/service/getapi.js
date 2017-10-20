var superagnet = require('superagent');
var http = require('http');
module.exports = class extends think.Service {
    constructor(options) {
        super();
        this.options = options;
    }
    async httpGet() {
        var that = this;
        return new Promise(function (resolve) {
            http.get(that.options, function (res) {
                res.setEncoding('utf8');
                var statusCode = res.statusCode;
                var getData = '';
                if (statusCode == 200) {
                    res.on('data', function (chunk) {
                        getData += chunk;
                    }).on('end', function () {
                        var obj = JSON.parse(getData);
                        resolve(obj);
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