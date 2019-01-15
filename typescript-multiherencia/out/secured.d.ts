import { BaseApp, TableDef } from "./base-app";
export declare type Constructor<T> = new (...args: any[]) => T;
export declare function emergeSecuredApp<T extends Constructor<BaseApp>>(Base: T): {
    new (...rest: any[]): {
        user: string;
        getName(): string;
        getTables(): TableDef[];
        installPart(part: string, content: string): Promise<void>;
        hasPermission(user: string, part: string): boolean;
        install(): Promise<void>;
        setUser(user: string): void;
        tables: TableDef[];
    };
} & T;
