const Base = require('./base.js');

module.exports = class extends Base {
    indexAction() {
        var a = {
            b:'aaa',
            c:'bbb'
        };
        return this.success(a);
    }
};