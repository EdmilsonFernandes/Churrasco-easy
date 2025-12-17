import 'dotenv/config';

export const env = {
  databaseUrl: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/churrasco',
  port: Number(process.env.PORT) || 3000,
};
