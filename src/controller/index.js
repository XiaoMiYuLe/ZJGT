var http = require('http');

const Base = require('./base.js');
module.exports = class extends Base {
    indexAction() {
        var that = this;
        var options = {
            host: 'www.zjgt_dev.com',
            path: '/product',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        http.get(options, function (res) {
            res.setEncoding('utf8');
            var statusCode = res.statusCode;
            var getData = '';
            if (statusCode == 200) {
                res.on('data', function (chunk) {
                    getData += chunk;
                }).on('end', function () {
                    var obj = JSON.parse(getData);
                    console.log(obj);
                });
            } else {
                console.log(statusCode);
            }
        }).on('error', function (e) {

        });
        this.assign('myName', '我是测试哦~~~');
        return this.display();
    }
};