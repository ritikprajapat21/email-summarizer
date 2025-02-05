"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useMail } from "@/hooks/use-mail";
import { MailList } from "./mail-list";

interface Mail {
  id: string;
  name: string;
  email: string;
  subject: string;
  text: string;
  date: string;
  read: boolean;
  labels: string[];
}

export default function Mail({ mails }: { mails: Mail[] }) {
  //const mails = useMail((state) => state.mails);

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center px-4 py-2">
        <h1 className="text-xl font-bold">Inbox</h1>
        <TabsList className="ml-auto">
          <TabsTrigger value="all" className="text-zinc-600 dark:text-zinc-200">
            All mail
          </TabsTrigger>
          <TabsTrigger
            value="unread"
            className="text-zinc-600 dark:text-zinc-200"
          >
            Unread
          </TabsTrigger>
        </TabsList>
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
      <TabsContent value="all" className="m-0">
        <MailList items={mails} />
      </TabsContent>
      <TabsContent value="unread" className="m-0">
        <MailList items={mails.filter((item) => !item.read)} />
      </TabsContent>
    </Tabs>
  );
}
