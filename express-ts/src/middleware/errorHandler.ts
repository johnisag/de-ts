import { Request, Response, NextFunction} from 'express';
import { AppError } from '../utils/appError';   
import { error } from 'console';

export default function errorHandler(
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error(`[ERROR]`, (err as any)?.stack || err );

    if (error instanceof AppError) {
        res.status(err.statusCode).json({
            message: err.message
        });
    }

    // Fallback for unhandled errors
    res.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    }); 

}