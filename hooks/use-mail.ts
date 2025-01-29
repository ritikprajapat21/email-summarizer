import { create } from "zustand";

import { Mail, mails } from "@/components/data";

type Config = {
  mailId: string;
  mails: Mail[];
  setMailId: (id: string) => void;
};

export const useMail = create<Config>((set) => ({
  mailId: "0",
  mails: mails,
  setMailId: (id: string) => set((state) => ({ ...state, mailId: id })),
}));
