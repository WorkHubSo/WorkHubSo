import dotenv from 'dotenv'
dotenv.config();
export const PORT = process.env.port || 8000;
export const jwt_secret = process.env.jwtTokenSecretKey