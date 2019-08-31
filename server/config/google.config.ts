require("dotenv").config();

export const clientID = process.env.GOOGLE_CLIENT_ID;
export const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
export const callbackURL = "/api/auth/google/redirect";
