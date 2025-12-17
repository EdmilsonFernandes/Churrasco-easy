import express from 'express';
import cors from 'cors';
import router from './routes';
import { initializeDatabase } from './config/database';
import { env } from './config/env';

export const createApp = async () => {
  await initializeDatabase();
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(router);
  return app;
};

export const startServer = async () => {
  const app = await createApp();
  app.listen(env.port, () => console.log(`API running on port ${env.port}`));
};

if (require.main === module) {
  startServer();
}
