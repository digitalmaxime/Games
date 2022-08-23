const Food = require('./food')

class Coco extends Food { 
    constructor(name) {
        super(name);
        this.color = "white";
    }

    toString(){
        return (`${super.toString()}, Food color: ${this.color}`);
    }
}

module.exports = Coco;