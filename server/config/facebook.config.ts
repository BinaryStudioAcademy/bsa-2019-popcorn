require('dotenv').config();

export const clientID = process.env.FACEBOOK_CLIENT_ID;
export const clientSecret = process.env.FACEBOOK_CLIENT_SECRET;
export const callbackURL = process.env.FACEBOOK_CALLBACK_URL;
