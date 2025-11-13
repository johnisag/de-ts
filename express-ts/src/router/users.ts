import { Router, Request, Response, NextFunction } from 'express';
import requireAdmin from '../middleware/requestAdmin';

const router = Router();

type User = {
    id: number;
    name: string;
};

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



export default router;