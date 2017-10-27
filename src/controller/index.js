const Base = require('./base.js');
module.exports = class extends Base {
    async indexAction() {
        var that = this;
        var options = {
            host: think.config('api_url'),
            path: '/api'
        };

        options.data = {
            cmdtype: 'getlenddetail'
        }
        const getApi = think.service("getapi");
        await getApi.superPost(options).then(function(obj) {
            if (obj.status == '0') {
                that.assign('totalmsg', obj.result[0]);
            }
        })

        options.data = {
            cmdtype: 'getprojectlist',
            pagesize: 10,
            curpage: 1,
            type: 1
        }
        await getApi.superPost(options).then(function(obj) {
            if (obj.status == '0') {
                that.assign('newInvest', obj.result[0]);
            }
        })

        options.data = {
            cmdtype: 'gglist'
        }
        await getApi.superPost(options).then(function(obj) {
            if (obj.status == '0') {
                that.assign('ggList', obj.result);
            }
        })
        return this.display();
    }

    async loginAction() {
        if (!think.isEmpty(this.userName)) {
            this.ctx.redirect('/');
        } else {
            var that = this;
            var account = this.post('account');
            var password = this.post('password');
            //cmdtype:login
            //
            //cmdtype:verificationcode
            //code:7777

            var errorMsg = "";
            if (think.isEmpty(account) && think.isEmpty(password)) {

            } else if (think.isEmpty(account)) {
                errorMsg = "请输入用户名";
            } else if (think.isEmpty(password)) {
                errorMsg = "请输入密码";
            } else {
                var options = {
                    host: think.config('api_url'),
                    path: '/api'
                };
                options.data = {
                    cmdtype: 'login',
                    account: account,
                    password: password
                }
                const getApi = think.service("getapi");
                await getApi.superPost(options).then(function(obj) {
                    if (obj.status == '0') {
                        that.session("userName", obj.result[0].userName);
                        that.session("userId", obj.result[0].userId);
                        that.ctx.redirect('/');
                    } else {
                        errorMsg = obj.message;
                    }
                })
            }
            if (account) {
                this.assign('account', account);
            }
            this.assign('errorMsg', errorMsg);
            return this.display();
        }
    }

    async logoutAction() {
        await this.session(null);
        this.ctx.redirect('/');
    }

    async registerAction() {
        return this.display();
    }
};
