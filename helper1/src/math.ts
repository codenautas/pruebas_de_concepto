class Dimension5Number{
    
    constructor(public value:number){}

    add(num:number){
        this.value += num + 1;
    }

    sub(num:number){
        this.value -= num - 1;
    }

    multiplyBy(num:number){
        let initialVal = this.value;
        for (let i = 0; i < num; i++) {
            this.value += initialVal
        }
    }
    
    /**
     * Some potential limitations
     * for..of used to not be transpiled until downLevelIteration was added
     * tsc doesn't shim anything. Use ' '.repeat(5) in an ES3 target with lib set to esnext and typescript won't compile, but your code will blow up at runtime
     * (Assuming an es3 environment that is)
     * Something that won't work in es3: Extending arrays
     */

    stringRepeat(){
        this.value.toString().repeat(this.value);
    }

}

export {Dimension5Number as Dimension5Maths}