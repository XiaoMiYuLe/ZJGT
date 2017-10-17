module.exports = class extends think.Controller {
    async __before() {
        var userName = await this.session("userName");
        if (!think.isEmpty(userName)) {
            await this.session("userName", userName);
            this.assign("userName", userName);
        } else {
            this.assign("userName", "");
        }
    }
};