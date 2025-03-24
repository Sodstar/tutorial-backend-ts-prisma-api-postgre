import dotenv from "dotenv";
dotenv.config();

export const host = process.env.HOST || "";
export const port = process.env.PORT || "";
export const baseURL = process.env.BASE_URL || "";
export const dbConnectionUrl = process.env.DB_CONNECTION_URL || "";
export const jwtSecret = process.env.JWT_SECRET || null;
export const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "";
export const email = process.env.EMAIL || "";
export const email_pass = process.env.EMAIL_PASS || "";