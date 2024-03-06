import pkg from 'jsonwebtoken';
const { sign } = pkg;

// Function to generate a JWT token with a specific payload
export const generateJwtToken = (customerId:Number) => {
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