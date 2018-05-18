import { BaseApp, TableDef } from "./base-app";
export declare function emergeSecuredApp(base: typeof BaseApp): {
    new (): {
        user: string;
        getName(): string;
        getTables(): TableDef[];
        installPart(part: string, content: string): Promise<void>;
        hasPermission(user: string, part: string): boolean;
        install(): Promise<void>;
        setUser(user: string): void;
        tables: TableDef[];
    };
};
export declare var SecuredApp: {
    new (): {
        user: string;
        getName(): string;
        getTables(): TableDef[];
        installPart(part: string, content: string): Promise<void>;
        hasPermission(user: string, part: string): boolean;
        install(): Promise<void>;
        setUser(user: string): void;
        tables: TableDef[];
    };
};
export declare class SecuredAppType extends SecuredApp {
}
