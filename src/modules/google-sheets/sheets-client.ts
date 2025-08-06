import { google, sheets_v4 } from "googleapis";
import { JWT } from "google-auth-library";

export const auth: JWT = new JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export const sheets: sheets_v4.Sheets = google.sheets({ version: "v4", auth });
