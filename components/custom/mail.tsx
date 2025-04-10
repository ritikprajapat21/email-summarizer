"use client";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useMail, Mail as MailType } from "@/hooks/use-mail";
import { MailList } from "./mail-list";
import { useActionState, useEffect } from "react";
import { logout } from "@/lib/auth";
import { Button } from "../ui/button";

export default function Mail({ mails }: { mails: MailType[] }) {
  const setMails = useMail((state) => state.setMails);
  const [_, logoutAction, isPending] = useActionState(logout, null);

  useEffect(() => {
    setMails(mails);
  }, [mails]);

  return (
    <div>
      <div className="flex items-center px-4 py-2">
        <h1 className="text-xl font-bold">Inbox</h1>
        {/*<TabsList className="ml-auto">
          <TabsTrigger value="all" className="text-zinc-600 dark:text-zinc-200">
            All mail
          </TabsTrigger>
          <TabsTrigger
            value="unread"
            className="text-zinc-600 dark:text-zinc-200"
          >
            Unread
          </TabsTrigger>
        </TabsList>*/}
        <form action={logoutAction} className="ml-auto">
          <Button disabled={isPending}>Logout</Button>
        </form>
      </div>
      <Separator />
      <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <form>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="pl-8" />
          </div>
        </form>
      </div>
      <MailList items={mails} />
      {/* <TabsContent value="all" className="m-0"> */}
      {/*   <MailList items={mails} /> */}
      {/* </TabsContent> */}
      {/* <TabsContent value="unread" className="m-0"> */}
      {/*   <MailList items={mails.filter((item) => !item.read)} /> */}
      {/* </TabsContent> */}
    </div>
  );
}
