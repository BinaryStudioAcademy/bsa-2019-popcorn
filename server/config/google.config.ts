require('dotenv').config();

export const clientID = process.env.CLIENT_ID;
export const clientSecret = process.env.CLIENT_SECRET;
export const callbackURL = process.env.CALLBACK_URL;
export const scope = process.env.GOOGLE_SCOPE;