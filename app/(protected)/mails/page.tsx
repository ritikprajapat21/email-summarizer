import Mail from "@/components/custom/mail";
import { loadMails } from "@/lib/mails/load-mails";

export default async function Home() {
  console.log("Mails", await loadMails());

  return <Mail />;
}
