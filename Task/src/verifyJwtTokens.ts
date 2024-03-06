import {verify} from "jsonwebtoken";

export default function getCustomerId(authHeader:string){
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7); // Remove 'Bearer ' from the header
        const decodedToken = verify(token, 'secret-key');
        console.log(decodedToken); 
        const customerId:[Number]=decodedToken.customerId;
        return customerId;
    }
}