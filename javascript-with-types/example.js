
/**
 * @constructor 
 * @param {string} name
 * @this {Animal}
 */
function Animal(name){
    this.name=name;
}

Animal.prototype.show = function show(){
    console.log(this.name);
}

var a = new Animal("bob");
a.show();

