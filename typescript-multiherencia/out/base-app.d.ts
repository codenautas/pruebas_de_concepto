export interface TableDef {
    name: string;
}
export declare abstract class BaseApp {
    tables: TableDef[];
    constructor();
    abstract getName(): string;
    getTables(): TableDef[];
    installPart(part: string, content: string): Promise<void>;
    install(): Promise<void>;
}
