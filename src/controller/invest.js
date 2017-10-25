const Base = require('./base.js');

module.exports = class extends Base {
    listAction() {        
        return this.display();
    }
    
    infoAction(){
        console.log(this.get('id'));
        return this.display();
    }
    
};