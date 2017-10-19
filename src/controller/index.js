const Base = require('./base.js');
module.exports = class extends Base {
    async indexAction() {
        return this.display();
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