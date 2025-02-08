import Mail from "@/components/custom/mail";
import { loadMails } from "@/lib/mails/load-mails";

export default async function Home() {
  const mails = await loadMails();

  if (typeof mails === "string") {
    return <p>Try again.</p>;
  }

  return <Mail mails={mails} />;
}
