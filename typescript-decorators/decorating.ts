function viewClass(target){
    console.log('viewing', target)
}

@viewClass class Viewed{
    constructor(public name:string){
        console.log('constructed', name)
    }
    doing(x:number){
        console.log('doing',x)
    }
}

var view = new Viewed('hi');
view.doing(2);