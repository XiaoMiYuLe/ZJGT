module.exports = class extends think.Controller {
    async __before() {
        this.userName = await this.session('userName');
        this.userId = await this.session('userId');
        if (!think.isEmpty(this.userName)) {
            await this.session('userName', this.userName);
            await this.session('userId', this.userId);
            this.assign('userName', this.userName);
        } else {
            this.assign('userName', '');
        }
    }
};
