import mongoose,{Document, Model,Schema} from "mongoose";

//MongoDB schemas
interface Account{
    accNo: Number,
    accType: String,
    custId: Number,
    isActive: Boolean 
}
const AccountSchema=new Schema<Account>({
    accNo: Number,
    accType: String,
    custId: Number,
    isActive: Boolean
});

interface Customer{
    customerId: Number,
    customerName: String,
    isPrimaryOwner: Boolean
}

const CustomerSchema=new Schema<Customer>({
    customerId: Number,
    customerName: String,
    isPrimaryOwner: Boolean
});

interface AccountDocument extends Account,Document{}
export const accountModel:Model<AccountDocument>=mongoose.model<AccountDocument>('Account',AccountSchema);

interface CustomerDocument extends Customer,Document{}
export const customerModel:Model<CustomerDocument>=mongoose.model<CustomerDocument>('Customer',CustomerSchema);
