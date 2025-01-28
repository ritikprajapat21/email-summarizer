import { Mail } from "@/components/custom/mail";
import { mails } from "@/components/data";

export default function Home() {
  return (
    <Mail
      navCollapsedSize={4}
      defaultLayout={[20, 32, 48]}
      defaultCollapsed={true}
      mails={mails}
    />
  );
  //return (
  //  <div className="max-h-screen font-[family-name:var(--font-geist-sans)]">
  //    <Mail accounts={accounts}
  //      navCollapsedSize={4}
  //      defaultLayout={[20, 32, 48]}
  //      defaultCollapsed={false}
  //      mails={mails}
  //    />
  //  </div>
  //);
}
