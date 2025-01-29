"use client";

import { MailDisplay } from "@/components/custom/mail-display";
import { useMail } from "@/hooks/use-mail";
import { useParams } from "next/navigation";

export default function MailView() {
  const { id } = useParams();
  const mails = useMail((state) => state.mails);

  return <MailDisplay mail={mails.filter((e) => e.id === id)[0]} />;
}
