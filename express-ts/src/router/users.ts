import { Router, Request, Response, NextFunction } from 'express';
import requireAdmin from '../middleware/requestAdmin';
import jwt from 'jsonwebtoken';
import requireAuth from '../middleware/auth';
import validate from '../middleware/validate';
import { body } from 'express-validator';
import asyncHandler from '../utils/asyncHandler';


const router = Router();
const SECRET = process.env.JWT_SECRET ?? 'dev_secret';

// User type definition
type User = {
    id: number;
    name: string;
};

// In-memory user store for demonstration purposes
let users: User[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
];

// Router-level middleware to log requests
router.use((req: Request, res: Response, next) => {
    console.log(`[USER ROUTE] ${req.method} ${req.url}`);
    next();
});

// Get all users
router.get('/', (req: Request, res: Response) => {
    res.json(users);
});

// Post /users
router.post('/', (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    if (!name) {
        res.status(400).send('Name is required');
        return;
    }
    const newUser = {id: users.length + 1, name };   
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT /users/:id
router.put('/:id', requireAdmin, (req: Request, res: Response, next: NextFunction) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    if (!user) {
        res.status(404).send('User not found');
        return;
    }
    user.name = req.body.name ?? user.name;
    res.json(user);
});

// POST /users/login
router.post('/login', 
    [body('name').notEmpty().withMessage('Name is required')],
    validate,
    asyncHandler(async (req: Request, res: Response) => {
        const { name } = req.body;
        const user = users.find(u => u.name === name);
        if (!user) {
            return res.status(401).send('Invalid credentials');
        }
        const token = jwt.sign({ id: user.id, name: user.name }, SECRET, { expiresIn: '1h' });
        res.json({ token });
    })
);

// Get /users/me  - protected route
router.get('/me', requireAuth, (req: Request, res: Response) => {
    // In a real application, you would extract user info from the token
    res.json({ message: 'This is a protected route', user: (req as any).user });
});

export default router;