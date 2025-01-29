import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import LayoutNav from "@/components/custom/nav";
import { ThemeProvider } from "@/components/custom/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gmail Summarizer",
  description: "Summarize and tags your emails",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TooltipProvider>
          <ThemeProvider>
            <ResizablePanelGroup
              direction="horizontal"
              className="h-fit max-h-full flex-1 items-stretch"
            >
              <LayoutNav />
              <ResizableHandle withHandle />

              <ResizablePanel defaultSize={85}>{children}</ResizablePanel>
            </ResizablePanelGroup>
          </ThemeProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
