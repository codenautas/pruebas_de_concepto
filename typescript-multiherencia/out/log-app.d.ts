import { BaseApp, TableDef } from "./base-app";
export declare type Constructor<T> = new (...args: any[]) => T;
export declare function emergeLogApp<T extends Constructor<BaseApp>>(Base: T): {
    new (...args: any[]): {
        enabled: boolean;
        getName(): string;
        getTables(): TableDef[];
        installPart(part: string, content: string): Promise<void>;
        install(): Promise<void>;
        enableLog(enable: boolean): void;
        tables: TableDef[];
    };
} & T;
