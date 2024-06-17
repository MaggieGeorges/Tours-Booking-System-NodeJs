import { Request, Response, NextFunction } from 'express';
import { ExtendedRequest1 } from './verifyToken';

export const adminMiddleware = (req: ExtendedRequest1, res: Response, next: NextFunction) => {
    if (!req.info?.isAdmin) {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
};
