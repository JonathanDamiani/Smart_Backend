import { config } from 'dotenv';

const { parsed } = config();

export const { PORT, MODE, DB_URI } = parsed;
