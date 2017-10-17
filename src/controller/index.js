const Base = require('./base.js');
module.exports = class extends Base {
    async indexAction() {
        var that = this;
         var options = {
            host: think.config('api_url'),
            path: '/product',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };       
        const getApi = think.service("getapi", options);
        await getApi.httpGet().then(function (obj) {
            if (obj.errno == '0') {
                that.assign('getData', obj.data);
            }
        })
        that.assign('myName', '我是测试哦~~~');
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