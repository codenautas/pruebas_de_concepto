"use strict";
// module BaseApp
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
class BaseApp {
    constructor() {
        this.tables = [{ name: 'usuarios' }];
    }
    getTables() {
        return this.tables;
    }
    installPart(part, content) {
        return __awaiter(this, void 0, void 0, function* () {
            yield fs_extra_1.default.writeFile(`./out/${part}.txt`, content, { encoding: 'utf8' });
            return;
        });
    }
    install() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('INSTALLING', this.getName());
            yield this.installPart('base-part', 'la base');
            yield this.installPart('table-part', JSON.stringify(this.getTables(), null, '    '));
            return;
        });
    }
}
exports.BaseApp = BaseApp;
//# sourceMappingURL=base-app.js.map