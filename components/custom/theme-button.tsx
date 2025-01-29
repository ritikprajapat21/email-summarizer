"use client";
import React, { useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const ThemeButton = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  const Icon = currentTheme === "dark" ? Sun : Moon;

  return (
    <div
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="flex justify-center"
    >
      {isCollapsed ? (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <div
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9",
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="sr-only">Theme</span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="right" className="flex items-center gap-4">
            Theme
          </TooltipContent>
        </Tooltip>
      ) : (
        <div
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "justify-start",
          )}
        >
          <Icon className="mr-2 h-4 w-4" />
          Theme
        </div>
      )}
    </div>
  );
};

export default ThemeButton;
