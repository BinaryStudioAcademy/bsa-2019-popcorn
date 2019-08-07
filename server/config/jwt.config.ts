require('dotenv').config();

export const secret = process.env.SECRET_KEY;
export const expiresIn = '24h';