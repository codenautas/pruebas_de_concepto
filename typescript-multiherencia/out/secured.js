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
function emergeSecuredApp(base) {
    return class extends base {
        constructor() {
            super(...arguments);
            this.user = 'UNLOGGED';
        }
        getName() {
            throw new Error('must implemente getName');
        }
        getTables() {
            return super.getTables().concat([
                { name: 'secured' },
                { name: 'roles' }
            ]);
        }
        installPart(part, content) {
            const _super = name => super[name];
            return __awaiter(this, void 0, void 0, function* () {
                if (this.hasPermission(this.user, part)) {
                    yield _super("installPart").call(this, part, content);
                }
                else {
                    console.log("ERROR. Not authorized ", part);
                }
            });
        }
        hasPermission(user, part) {
            return user == 'ADMIN';
        }
        install() {
            const _super = name => super[name];
            return __awaiter(this, void 0, void 0, function* () {
                yield _super("install").call(this);
                yield this.installPart('log-part', 'the log');
                return;
            });
        }
        setUser(user) {
            this.user = user;
        }
    };
}
exports.emergeSecuredApp = emergeSecuredApp;
//# sourceMappingURL=secured.js.map