"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const mongoose_1 = __importDefault(require("mongoose"));
const generateJwtToken_1 = require("./generateJwtToken");
const verifyJwtTokens_1 = __importDefault(require("./verifyJwtTokens"));
const model_1 = require("./model");
const fastify = (0, fastify_1.default)();
require('dotenv').config();
// Register plugins for body parsing
// fastify.register(require('fastify-json-body'));
// fastify.register(require('fastify-multipart'));
fastify.listen({ port: 3000 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    else {
        console.log(`Server is running at ${address}`);
    }
});
mongoose_1.default.connect(`${process.env.MONGODB_URI}/myDB`)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Error connecting to MongoDB:', err.message));
fastify.get('/app/authToken/:id', async (req, res) => {
    const customerId = parseInt(req.params.id);
    res.send((0, generateJwtToken_1.generateJwtToken)(customerId));
});
fastify.post('/api/data', async (req, res) => {
    try {
        const token = req.headers.authorization;
        const customerId = (0, verifyJwtTokens_1.default)(token);
        const { accNo, accType } = req.body;
        console.log(accNo);
        const account = await model_1.accountModel.findOne({ AccNo: accNo, AccType: accType, CustId: customerId });
        console.log("Account: " + account);
        if (!account) {
            return res.status(404).send({ code: "FR1", message: "Account not found" });
        }
        const customer = await model_1.customerModel.findOne({ customerId });
        if (!customer) {
            return res.status(404).send({ code: "FR2", message: "Customer not found" });
        }
        if (!account.isActive) {
            return res.status(400).send({ code: "FR3", message: "Account is inactive" });
        }
        res.send({
            isPrimaryOwner: customer.isPrimaryOwner,
            isActive: account.isActive
        });
    }
    catch (err) {
        res.status(500).send({ code: "Internal Server Error", message: err.message });
    }
});
