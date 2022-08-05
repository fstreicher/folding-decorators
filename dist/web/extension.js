/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 47:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DecoratorFoldingRangeProvider = void 0;
const vscode_1 = __webpack_require__(1);
class DecoratorFoldingRangeProvider {
    provideFoldingRanges(document) {
        const ranges = [];
        const text = document.getText();
        const decoratorRegex = /(?<![_$[:alnum:]])(?:(?<=\.\.\.)|(?<!\.))\@\w+/g;
        const matches = Array.from(text.matchAll(decoratorRegex));
        for (const match of matches) {
            const position = document.positionAt(match.index);
            const range = document.getWordRangeAtPosition(position);
            const foldingRange = {
                start: 174,
                end: 245
            };
            // if (range) {
            //   ranges.push(foldingRange);
            // }
        }
        const foldingRange = {
            start: 173,
            end: 245,
            kind: vscode_1.FoldingRangeKind.Region
        };
        ranges.push(foldingRange);
        return ranges;
    }
}
exports.DecoratorFoldingRangeProvider = DecoratorFoldingRangeProvider;


/***/ }),

/***/ 1:
/***/ ((module) => {

module.exports = require("vscode");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
const vscode_1 = __webpack_require__(1);
const foldingProvider_1 = __webpack_require__(47);
function activate(context) {
    context.subscriptions.push(vscode_1.commands.registerCommand('folding-decorators.foldAll', () => {
        vscode_1.window.showInformationMessage('Hello World from Folding Decorators in a web extension host!');
    }), vscode_1.commands.registerCommand('folding-decorators.unfoldAll', () => {
        vscode_1.window.showInformationMessage('Hello World from Folding Decorators in a web extension host!');
    }), vscode_1.commands.registerCommand('folding-decorators.foldCustom', () => {
        vscode_1.window.showInformationMessage('Hello World from Folding Decorators in a web extension host!');
    }), vscode_1.commands.registerCommand('folding-decorators.unfoldCustom', () => {
        vscode_1.window.showInformationMessage('Hello World from Folding Decorators in a web extension host!');
    }));
    const decoratorFoldingRangeProvider = new foldingProvider_1.DecoratorFoldingRangeProvider();
    vscode_1.languages.registerFoldingRangeProvider('typescript', decoratorFoldingRangeProvider);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=extension.js.map