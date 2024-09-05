import { parseCookies } from "nookies";

export const getPrefLangCookie = (context) => {
  const cookies = parseCookies(context);
  return cookies["googtrans"] || "en";
};
