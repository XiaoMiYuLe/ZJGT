const Base = require('./base.js');
module.exports = class extends Base {
    async indexAction() {
        var that = this;
        var options = {
            host: think.config('api_url'),
            path: '/api/totalmsg',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const getApi = think.service("getapi");
        await getApi.httpGet(options).then(function (obj) {
            if (obj.status == '0') {
                that.assign('totalmsg', obj.result[0]);
            }
        })
        
        options.path = "/api/investList";
        await getApi.httpGet(options).then(function (obj) {
            if (obj.status == '0') {
                that.assign('newInvest', obj.result[0]);
            }
        })
        
        options.path = "/api/ggList";
        await getApi.httpGet(options).then(function (obj) {
            if (obj.status == '0') {
                that.assign('ggList', obj.result);
            }
        })
        
        return that.display();
    }

    async loginAction() {
        await this.session("userName", "小茉莉");
        return this.success("OK");
    }

    async logoutAction() {
        await this.session(null);
        return this.success("OK");
    }
};