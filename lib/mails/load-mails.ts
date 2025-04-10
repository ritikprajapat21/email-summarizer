"use server";
import { google } from "googleapis"; // Keep google import
import type { gmail_v1 } from "googleapis"; // Use import type
import { cookies } from "next/headers";
import { logout, oauthClient } from "../auth";
import { summarizeEmail } from "../summary";
import type { GaxiosPromise } from "gaxios"; // Use import type

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
      return []; // Return empty array if no messages
    }

    // Ensure messageIds are valid strings before proceeding
    const messageIds = res.data.messages
        .map((message) => message.id)
        .filter((id): id is string => typeof id === 'string'); // Filter out null/undefined IDs

    if (messageIds.length === 0) {
        return []; // Return empty if no valid message IDs found
    }

    const messagePromises: GaxiosPromise<gmail_v1.Schema$Message>[] = messageIds.map((id) => {
      // Type the promise array explicitly
      return gmail.users.messages.get({
        userId: "me",
        id: id, // Now guaranteed to be a string
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
    // Process details (extract headers, decode body) - Now faster as summarizeEmail is removed
    // Await the resolution of promises from getMailDetails
    const processedMailPromises = messageDetails.map((msgDetails) =>
      getMailDetails(msgDetails.data), // Pass msgDetails.data directly
    );
    const resolvedMails = await Promise.all(processedMailPromises);

    // Filter out any null results from getMailDetails
    const validProcessedMails = resolvedMails.filter((mail): mail is MailDetails => mail !== null);

    // Summarize emails concurrently
    const summaryPromises = validProcessedMails.map(mail =>
        summarizeEmail(mail.text) // mail is guaranteed to be MailDetails here, so mail.text is safe
    );
    const summaries = await Promise.all(summaryPromises);

    // Combine details with summaries
    const allMailContent = validProcessedMails.map((mail, index) => ({
      ...mail,
      ...(summaries[index] || {}), // Merge summary results, handle potential null summary
    }));

    // console.log(allMailContent);
    return allMailContent;
  } catch (error: unknown) { // Use unknown for better type safety
    console.error("Error fetching emails:", error);
    // Type check before accessing properties
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === 401) {
      logout();
    }
    return [];
  }
}

// Type for the object returned by getMailDetails (before summarization)
type MailDetails = {
  id: string;
  labels: string[];
  read: boolean;
  date?: string;
  email?: string;
  subject?: string;
  text: string; // Body text
};

// Use gmail_v1.Schema$Message for better type safety
async function getMailDetails(messageData: gmail_v1.Schema$Message): Promise<MailDetails | null> {
  if (!messageData || !messageData.id) {
    return null;
  }

  const obj: Partial<MailDetails> = { // Initialize with defaults
      id: messageData.id, // ID is guaranteed by the check above
      read: true,
      labels: [],
  };

  if (messageData.labelIds) {
    obj.labels = messageData.labelIds;
    if (messageData.labelIds.includes("UNREAD")) {
      obj.read = false;
    }
  }

  // Use for...of loop and ensure header.value is string for email/subject
  if (messageData.payload?.headers) {
    for (const header of messageData.payload.headers) {
      if (header.name === "Date" && header.value) {
        // Ensure value exists before creating Date
        obj.date = new Date(header.value).toISOString();
      } else if (header.name === "From" && header.value) {
        obj.email = String(header.value); // Convert to string explicitly
      } else if (header.name === "Subject" && header.value) {
        obj.subject = String(header.value); // Convert to string explicitly
      }
    }
  }

  // Use optional chaining and for...of loop for parts
  let decodedBody = "";
  if (messageData.payload?.parts) {
    for (const part of messageData.payload.parts) {
      // Use optional chaining for part.body?.data
      const data = part.body?.data;
      if (data) {
        decodedBody += Buffer.from(data, "base64").toString("utf-8"); // Specify encoding
      }
    }
  } else if (messageData.payload?.body?.data) { // Use optional chaining
    const data = messageData.payload.body.data;
    decodedBody = Buffer.from(data, "base64").toString("utf-8"); // Specify encoding
  }

  // Remove summarization from this function
  // return { ...obj, text: decodedBody, ...summary };
  return { ...(obj as MailDetails), text: decodedBody }; // Assert final type
}
