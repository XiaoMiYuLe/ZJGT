var superagnet = require('superagent');
module.exports = class extends think.Service {
    async superPost(options) {
        var that = this;
        return new Promise(function (resolve) {
            superagnet.post(options.host + options.path)
                .type('application/json')
                .send(options.data)
                .end(function (err, res) {
                    if (err) {
                        console.log(err);
                    } else {
                        var statusCode = res.statusCode;
                        if (statusCode == 200) {
                            resolve(res.body.data);
                        } else {
                            console.log(statusCode);
                        }
                    }
                });
        });
    }
};