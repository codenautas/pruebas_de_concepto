
    class AnimalClass{
        /**
         * @param {string} name
         */
        constructor(name){
            this.hola="hola";
            this.name=name;
        }

        show(){
            console.log(this.name);
        }
    }

    var animal = new AnimalClass("bob");
    animal.show();

