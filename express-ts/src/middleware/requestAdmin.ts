import { Request, Response, NextFunction} from 'express';

export default function requireAdmin(req: Request, res: Response, next: NextFunction): void {
    const isAdmin = req.headers['x-admin'] === '1';      
    if (!isAdmin) {
        res.status(403).send('Forbidden: Admins only');
        return;
    }
    next();
}