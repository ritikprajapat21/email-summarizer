import { TooltipProvider } from "@/components/ui/tooltip";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import LayoutNav from "@/components/custom/nav";
import { ThemeProvider } from "@/components/custom/ThemeProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
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
    </main>
  );
}
