"use server";
import { google } from "googleapis";
import { cookies } from "next/headers";
import { logout, oauthClient } from "../auth";
import { summarizeEmail } from "../summary";

export async function loadMails() {
  const gmail = google.gmail("v1");
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");

  if (!accessToken?.value) {
    logout();
  }

  const oauth = await oauthClient();
  oauth.setCredentials({ access_token: accessToken?.value });

  try {
    const res = await gmail.users.messages.list({
      auth: oauth,
      userId: "me",
      maxResults: 10, // Remove or increase if needed
    });

    if (
      !res ||
      !res.data ||
      !res.data.messages ||
      res.data.messages.length === 0
    ) {
      return []; // Return empty string if no messages
    }

    const messageIds = res.data.messages.map((message) => message.id); // Extract IDs

    const messagePromises = messageIds.map((id) => {
      return gmail.users.messages.get({
        userId: "me",
        id: id,
        auth: oauth,
      });
    });

    const messageDetails = await Promise.all(messagePromises); // Fetch concurrently

    // data.labelIds => labels
    // data.payload.headers[15] -> Date => date
    // headers[16] -> From => email
    // headers[25] -> To
    // headers[19] -> Subject => subject
    // headers[18] -> Message-ID => id
    // decodedBody => text

    const mailPromises = messageDetails.map((msgDetails) =>
      getMailDetails(msgDetails),
    );

    const allMailContent = await Promise.all(mailPromises);

    console.log(allMailContent);
    return allMailContent;
  } catch (error: any) {
    console.error("Error fetching emails:", error);
    console.log(error.error);
    if (error?.code === 401) {
      logout();
    }
    return [];
  }
}

async function getMailDetails(messageDetail: { data: any }) {
  if (!messageDetail || !messageDetail.data) {
    return "";
  }

  const obj: any = {};

  obj.id = messageDetail.data.id;

  if (messageDetail.data.labelIds) {
    obj.labels = messageDetail.data.labelIds;
    if (messageDetail.data.labelIds.includes("UNREAD")) {
      obj.read = false;
    } else {
      obj.read = true;
    }
  }

  if (messageDetail.data.payload.headers) {
    messageDetail.data.payload.headers.forEach(
      (header: { name: string; value: string | number | Date }) => {
        if (header.name === "Date") {
          obj.date = new Date(header.value).toISOString();
        } else if (header.name === "From") {
          obj.email = header.value;
        } else if (header.name === "Subject") {
          obj.subject = header.value;
        }
      },
    );
  }

  const messageData = messageDetail.data;
  let decodedBody = "";

  if (messageData.payload && messageData.payload.parts) {
    messageData.payload.parts.forEach((part) => {
      //if (part.mimeType === "text/plain") {
      const data = part.body.data;
      if (data) {
        decodedBody += Buffer.from(data, "base64").toString();
      }
      //}
    });
  } else if (
    messageData.payload &&
    messageData.payload.body &&
    messageData.payload.body.data
  ) {
    const data = messageData.payload.body.data;
    if (data) {
      decodedBody = Buffer.from(data, "base64").toString();
    }
  }

  const summary = await summarizeEmail(decodedBody);
  console.log(summary);

  return { ...obj, text: decodedBody, ...summary };
}
