class Food {
    constructor(name) {
        this.name = name;
    }

    toString(){
        return (`Name of food: ${this.name}`);
    }
}

export default Food;
// module.exports = Food; // not ES6
