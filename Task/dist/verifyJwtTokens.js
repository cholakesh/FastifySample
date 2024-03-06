"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
function getCustomerId(authHeader) {
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7); // Remove 'Bearer ' from the header
        const decodedToken = (0, jsonwebtoken_1.verify)(token, 'secret-key');
        console.log(decodedToken);
        const customerId = decodedToken.customerId;
        return customerId;
    }
}
exports.default = getCustomerId;
