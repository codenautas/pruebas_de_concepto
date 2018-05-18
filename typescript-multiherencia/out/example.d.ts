declare class Base {
    constructor();
}
declare function createLogClass(base: typeof Base): {
    new (): {
        isLogging(): boolean;
    };
};
declare class Animal extends Base {
    constructor();
}
declare var LoggedAnimal: {
    new (): {
        isLogging(): boolean;
    };
};
declare var lanimal: {
    isLogging(): boolean;
};
declare class BigLoggedAnimal extends LoggedAnimal {
    do(): void;
}
declare var bigLoggedAnimal: BigLoggedAnimal;
declare function createJumpingClass(base: typeof Base): {
    new (): {
        jump(): void;
    };
};
declare var JumpmingLogAnimal: {
    new (): {
        jump(): void;
    };
};
declare var jumpmingLogAnimal: {
    jump(): void;
};
