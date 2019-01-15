import { Dimension5Maths } from "./math";

class SpecialBehaviour extends Dimension5Maths{
    
    // for of https://basarat.gitbooks.io/typescript/docs/for...of.html
    static forOf(){
        let array = ['a',34, 'd']
        for (var elem of array){
            console.log(elem);
        }
    }
    
    extendingArrays(){
        
    }
    
    destructuring(){
        var rect = { x: 0, y: 10, width: 15, height: 20 };

        // Destructuring assignment
        var {x, y, width, height} = rect;
        console.log(x, y, width, height); // 0,10,15,20

        rect.x = 10;
        ({x, y, width, height} = rect); // assign to existing variables using outer parentheses
        console.log(x, y, width, height); // 10,10,15,20
    }
}