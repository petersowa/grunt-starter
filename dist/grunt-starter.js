"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1() {
    return 'hello there 3!';
}
exports.default = default_1;
//# sourceMappingURL=hello.js.map;"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hello_1 = require("./hello");
var appElem = document.getElementById('app');
appElem.innerHTML = hello_1.default();
//# sourceMappingURL=index.js.map