import jwt from 'jsonwebtoken'
import { jwt_secret } from '../config/config.js';
export const employersAuthenticate = (req, res, next) => {
    const token = req.headers.authorization
    try {
        if (!token) {
            return res.status(404).json({
                status: false,
                message: 'un authorized'
            })
        }
        const decoded = jwt.verify(token, jwt_secret)
        req.employer = decoded;
        next();
    } catch (error) {
        console.log('error', error.message);
    }
}