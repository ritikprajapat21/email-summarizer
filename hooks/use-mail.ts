import { create } from "zustand";

export interface Mail {
  id: string;
  name: string;
  email: string;
  subject: string;
  text: string;
  date: string;
  read: boolean;
  labels: string[];
}

type Config = {
  mailId: string;
  mails: Mail[];
  setMailId: (id: string) => void;
  setMails: (mails: Mail[]) => void;
};

export const useMail = create<Config>((set) => ({
  mailId: "0",
  mails: [] as Mail[],
  setMails: (mails: Mail[]) => set((state) => ({ ...state, mails })),
  setMailId: (id: string) => set((state) => ({ ...state, mailId: id })),
}));
