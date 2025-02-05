import { google } from "googleapis";
import { cookies } from "next/headers";
import { oauthClient } from "../auth";

export async function loadMails() {
  const gmail = google.gmail("v1");
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");

  const oauth = await oauthClient();
  oauth.setCredentials({ access_token: accessToken?.value });

  try {
    const res = await gmail.users.messages.list({
      auth: oauth,
      userId: "me",
    });

    return res.data.messages;
  } catch (error) {
    console.error("list fetch error", error);
  }
}
