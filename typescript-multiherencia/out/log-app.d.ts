import { BaseApp, TableDef } from "./base-app";
export declare function emergeLogApp(base: typeof BaseApp): {
    new (): {
        enabled: boolean;
        getName(): string;
        getTables(): TableDef[];
        installPart(part: string, content: string): Promise<void>;
        install(): Promise<void>;
        enableLog(enable: boolean): void;
        tables: TableDef[];
    };
};
