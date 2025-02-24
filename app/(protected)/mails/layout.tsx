import { TooltipProvider } from "@/components/ui/tooltip";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import LayoutNav from "@/components/custom/nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <TooltipProvider>
        <ResizablePanelGroup
          direction="horizontal"
          className="h-fit max-h-full flex-1 items-stretch"
        >
          {/*<LayoutNav />
          <ResizableHandle withHandle />*/}

          <ResizablePanel defaultSize={100}>{children}</ResizablePanel>
        </ResizablePanelGroup>
      </TooltipProvider>
    </main>
  );
}
