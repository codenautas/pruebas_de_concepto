export interface TableDef {
    name: string;
}
export declare class BaseApp {
    tables: TableDef[];
    constructor();
    getName(): string;
    getTables(): TableDef[];
    installPart(part: string, content: string): Promise<void>;
    install(): Promise<void>;
}
