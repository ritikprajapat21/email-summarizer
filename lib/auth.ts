"use server";
import { google } from "googleapis";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const oauthClient = async () =>
  new google.auth.OAuth2({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
  });

export const logout = async () => {
  const cookieStore = await cookies();
  console.log("Logging out");
  cookieStore.set("access_token", "");
  redirect("/");
};
