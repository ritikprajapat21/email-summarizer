"use client";
import { useState } from "react";
import { ResizablePanel } from "../ui/resizable";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  Inbox,
  LogOut,
  MessagesSquare,
  Send,
  ShoppingCart,
  Trash2,
  Users2,
} from "lucide-react";
import { Nav } from "./nav-dep";
import ThemeButton from "./theme-button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { buttonVariants } from "../ui/button";
import { logout } from "@/lib/auth";

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
        >
          <div className="flex justify-center" onClick={logout}>
            {isCollapsed ? (
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "h-9 w-9",
                    )}
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="sr-only">Logout</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  Logout
                </TooltipContent>
              </Tooltip>
            ) : (
              <div
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "justify-start",
                )}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </div>
            )}
          </div>
        </div>
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
        <div className="flex justify-start px-2 mx-1">
          <ThemeButton isCollapsed={isCollapsed} />
        </div>
      </ResizablePanel>
    </>
  );
}
