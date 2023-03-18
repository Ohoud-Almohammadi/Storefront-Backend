import express, { Application, Request, Response } from 'express';
import errorHandler from './middlewares/errorHandler';
import config from './config';
import apiRouter from './api/routes';

// Create global App object
const app: Application = express();
// Set port to 3000
const PORT: string = config.port || '3000';

// Middleware to parse requests
app.use(express.json());
// Error handler middleware
app.use(errorHandler);

// // Create maine endpoint
app.get('/', (_req: Request, res: Response): void => {
  res.send(' Welcome in home pagee!');
});

app.use(apiRouter);

// // Set application to listen on port 3000 and log message to console
app.listen(PORT, (): void => {
  console.log(`Server started at  localhost:${PORT}`);
});
export default app;
