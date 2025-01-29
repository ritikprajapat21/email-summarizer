"use client";
import { useState } from "react";
import { ResizableHandle, ResizablePanel } from "../ui/resizable";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  Inbox,
  MessagesSquare,
  Send,
  ShoppingCart,
  Trash2,
  Users2,
} from "lucide-react";
import { Nav } from "./nav-dep";

export default function LayoutNav() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <>
      <ResizablePanel
        defaultSize={15}
        collapsedSize={5}
        collapsible={true}
        minSize={12}
        maxSize={15}
        onCollapse={() => {
          setIsCollapsed(true);
          //document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
          //  true,
          //)}`;
        }}
        onResize={() => {
          setIsCollapsed(false);
          //document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
          //  false,
          //)}`;
        }}
        className={cn(
          isCollapsed &&
          "min-w-[50px] h-fit transition-all duration-300 ease-in-out",
        )}
      >
        <div
          className={cn(
            "flex h-[52px] items-center justify-center",
            isCollapsed ? "h-[52px]" : "px-2",
          )}
        ></div>
        <Separator />
        <Nav
          isCollapsed={isCollapsed}
          links={[
            {
              title: "Inbox",
              label: "128",
              icon: Inbox,
              variant: "default",
            },
            {
              title: "Drafts",
              label: "9",
              icon: File,
              variant: "ghost",
            },
            {
              title: "Sent",
              label: "",
              icon: Send,
              variant: "ghost",
            },
            {
              title: "Junk",
              label: "23",
              icon: ArchiveX,
              variant: "ghost",
            },
            {
              title: "Trash",
              label: "",
              icon: Trash2,
              variant: "ghost",
            },
            {
              title: "Archive",
              label: "",
              icon: Archive,
              variant: "ghost",
            },
          ]}
        />
        <Separator />
        <Nav
          isCollapsed={isCollapsed}
          links={[
            {
              title: "Social",
              label: "972",
              icon: Users2,
              variant: "ghost",
            },
            {
              title: "Updates",
              label: "342",
              icon: AlertCircle,
              variant: "ghost",
            },
            {
              title: "Forums",
              label: "128",
              icon: MessagesSquare,
              variant: "ghost",
            },
            {
              title: "Shopping",
              label: "8",
              icon: ShoppingCart,
              variant: "ghost",
            },
            {
              title: "Promotions",
              label: "21",
              icon: Archive,
              variant: "ghost",
            },
          ]}
        />
      </ResizablePanel>
    </>
  );
}
