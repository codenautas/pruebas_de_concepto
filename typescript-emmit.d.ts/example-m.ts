
export type Oxygen = { volume:number }

export class Creature {
    breathe(o: Oxygen):void {
        console.log('breathing', o.volume)
    };
}

export type Constructor<T> = new (...args: any[]) => T;

export function emergeAnimal<T extends Constructor<Creature>>(Base: T) {
    return class Animal extends Base{
        constructor(...args:any[]){ 
            super(args);
        }
        breathe(o: Oxygen): void {
            console.log("breathing like animal")
            super.breathe(o);
        }
    }
}

export var Animal = emergeAnimal(Creature);

var fish = new Animal()

fish.breathe({ volume: 2.1 });

export var Animal2:InstanceType<typeof Animal>;

function emergeDog<T extends Constructor<InstanceType<typeof Animal>>>(Animal: T) {
    return class Dog extends Animal{
        constructor(...args:any[]){ 
            super(args);
        }
    }
}

export var Dog = emergeDog(emergeAnimal(Creature));

var boss = new Dog();
boss.breathe({volume:4});

export function emergePoodle<T extends Constructor<InstanceType<typeof Dog>>>(Dog: T) {
    return class Poodle extends Dog{
        constructor(...args:any[]){ 
            super(args);
        }
        breathe(o: Oxygen) {
            super.breathe(o);
        }
    }
}

export var Poodle = emergePoodle(emergeDog(emergeAnimal(Creature)));

var poodle = new Poodle();
poodle.breathe({ volume: 4 });
