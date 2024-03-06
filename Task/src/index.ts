import Fastify from "fastify";
import mongoose from 'mongoose';
import {generateJwtToken} from './generateJwtToken';
import getCustomerId from './verifyJwtTokens';
import { customerModel,accountModel } from "./model";
const fastify= Fastify();
require('dotenv').config();

// Register plugins for body parsing
// fastify.register(require('fastify-json-body'));
// fastify.register(require('fastify-multipart'));

fastify.listen({port:3000},(err,address)=>{
    if(err){
        console.error(err)
        process.exit(1)
    }
    else{
        console.log(`Server is running at ${address}`)
    }
});
mongoose.connect(`${process.env.MONGODB_URI}/myDB`)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('Error connecting to MongoDB:', err.message));



fastify.get('/app/authToken/:id',async(req,res)=>{
    const customerId=parseInt((req.params as {id:string}).id);
    res.send(generateJwtToken(customerId));
})

interface Req {
    accNo: number
    accType: string
}

fastify.post('/api/data',async (req,res)=>{
    try{
        const token: string = (req.headers as { [key: string]: string }).authorization;
        const customerId=getCustomerId(token);
        const {accNo,accType}= req.body as Req;
        console.log(accNo);

        const account= await accountModel.findOne({AccNo:accNo,AccType:accType,CustId:customerId});
        console.log("Account: "+account);
        if(!account){
            return res.status(404).send({code:"FR1",message:"Account not found"});
        }

        const customer=await customerModel.findOne({customerId});
        if(!customer){
            return res.status(404).send({code:"FR2",message:"Customer not found"});
        }

        if(!account.isActive){
            return res.status(400).send({code:"FR3",message:"Account is inactive"});
        }

        res.send({
            isPrimaryOwner:customer.isPrimaryOwner,
            isActive:account.isActive
        });
    }catch(err){
        res.status(500).send({code:"Internal Server Error",message:err.message});
    }
})
