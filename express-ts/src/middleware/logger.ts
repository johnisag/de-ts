import { Request, Response, NextFunction} from 'express';

export default function logger(req: Request, res: Response, next: NextFunction): void {
    console.log(`[LOG] ${req.method} ${req.url}`);
    next();
}