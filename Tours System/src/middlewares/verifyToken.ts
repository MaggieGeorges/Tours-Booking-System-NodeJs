import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { PayLoad } from '../models/authModel';

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export interface ExtendedRequest1 extends Request {
    info?: PayLoad;
}

export function verifyToken(req: ExtendedRequest1, res: Response, next: NextFunction) {
    try {
        // Reading the token from request headers
        const token = req.headers['token'] as string;

        // If no token is provided, return a 401 status
        if (!token) {
            return res.status(401).json({ message: 'Forbidden!!' });
        }

        // Verify the token and extract the payload
        const decodeData = jwt.verify(token, process.env.SECRET as string) as PayLoad;

        // Attach the decoded data to the request object
        req.info = decodeData;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Failed to authenticate token', error });
    }
}
