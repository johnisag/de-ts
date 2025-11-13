import express, { Request, Response } from 'express';
import logger from './middleware/logger';
import userRouter from './router/users';  
import errorHandler from './middleware/errorHandler';

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// parse JSON request body
app.use(express.json());

// application-level middleware
app.use(logger);
app.use('/users', userRouter);

// simple route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Express with TypeScript!');
});

// catch-all 404 handler
app.use((req: Request, res: Response) => {
    res.status(404).send('Not Found');
});

// error handling middleware
app.use(errorHandler);

// start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
