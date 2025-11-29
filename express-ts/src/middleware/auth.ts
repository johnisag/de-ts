import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/appError';

const SECRET = process.env.JWT_SECRET ?? 'dev_secret';

export default function requireAuth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new AppError('Unauthorized: No token provided', 401));
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, SECRET);
        // You can attach the decoded token to the request object if needed
        // req.user = decoded;
        next();
    } catch (err) {
        return next(new AppError('Unauthorized: Invalid token', 401));
    }
}   