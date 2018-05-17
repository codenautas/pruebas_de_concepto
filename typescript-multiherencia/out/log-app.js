"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function emergeLogApp(base) {
    return class extends base {
        constructor() {
            super(...arguments);
            this.enabled = false;
        }
        getName() {
            throw new Error('must implemente getName');
        }
        getTables() {
            return super.getTables().concat([
                { name: 'log' }
            ]);
        }
        installPart(part, content) {
            const _super = name => super[name];
            return __awaiter(this, void 0, void 0, function* () {
                console.log('installing part', part, content);
                yield _super("installPart").call(this, part, content);
            });
        }
        install() {
            const _super = name => super[name];
            return __awaiter(this, void 0, void 0, function* () {
                console.log('=====================');
                console.log("INSTALL ", this.getName());
                yield _super("install").call(this);
                yield this.installPart('log-part', 'log part');
                return;
            });
        }
        enableLog(enable) {
            this.enabled = enable;
        }
    };
}
exports.emergeLogApp = emergeLogApp;
//# sourceMappingURL=log-app.js.map