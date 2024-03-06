"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { sign } = jsonwebtoken_1.default;
// Function to generate a JWT token with a specific payload
const generateJwtToken = (customerId) => {
    const secretKey = 'secret-key';
    // JWT payload including the 'channel' key
    const payload = {
        customerId
    };
    // Options for the JWT token (e.g., expiration time)
    const options = {
        expiresIn: '1d'
    };
    // Generate the JWT token
    const token = sign(payload, secretKey, options);
    return token;
};
exports.generateJwtToken = generateJwtToken;
