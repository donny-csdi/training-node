"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMathOperations = void 0;
var SMathOperations = function (numA, numB, operation) {
    switch (operation) {
        case "add":
            return numA + numB;
        case "subtract":
            return numA - numB;
        case "multiply":
            return numA * numB;
        case "divide":
            return numB === 0 ? null : numA / numB;
        default:
            throw new Error("Invalid operation");
    }
};
exports.SMathOperations = SMathOperations;
//# sourceMappingURL=math.service.js.map