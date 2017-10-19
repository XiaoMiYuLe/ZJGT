const Base = require('./base.js');

module.exports = class extends Base {
    listAction() {
        return this.display();
    }
    
    infoAction(){
        return this.display();
    }
    
};