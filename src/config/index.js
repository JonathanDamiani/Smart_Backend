import { config } from 'dotenv';

const { parsed } = config();

export const { PORT, MODE, DB_URI, JWT_SECRET, JWT_EXPIRES_IN } = parsed;
