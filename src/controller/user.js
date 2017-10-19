const Base = require('./base.js');

module.exports = class extend Base {
    loginAction() {
        return this.display();
    }
}
