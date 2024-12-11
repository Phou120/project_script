import * as jwt from 'jsonwebtoken';

// Define your secret key. It should be stored in an environment variable for security.
const SECRET_KEY = 'project-secret';

export const generateToken = (payload: object): string => {
  const options = { expiresIn: '5h' }; // Set the token expiration time to 1 hour (customize as needed)
  
  return jwt.sign(payload, SECRET_KEY, options);
};
