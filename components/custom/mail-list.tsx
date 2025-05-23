import { ComponentProps } from "react";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import Link from "next/link";
import { Mail } from "@/hooks/use-mail";

interface MailListProps {
  items: Mail[];
}

export function MailList({ items }: MailListProps) {
  return (
    <ScrollArea className="h-[calc(100vh-7.625rem)]">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/mails/${item.id}`}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
            )}
          >
            <div className="flex flex-col w-full gap-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{item.name}</div>
                  {/*!item.read && (
                    <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                  )*/}
                </div>
                <div className={cn("ml-auto text-xs text-muted-foreground")}>
                  {formatDistanceToNow(new Date(item.date), {
                    addSuffix: true,
                  })}
                </div>
              </div>
              <div className="text-xs font-medium line-clamp-1">
                {item.subject}
              </div>
            </div>
            <div className="text-xs text-wrap text-muted-foreground break-words">
              {/*item.text.substring(0, 300)*/ item.summary}
            </div>
            {item.tags && item.tags.length ? (
              <div className="flex items-center gap-2 flex-wrap">
                {item?.tags.map((label) => (
                  <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
                    <p className="capitalize">
                      {label.toString().replaceAll('"', "")}
                    </p>
                  </Badge>
                ))}
              </div>
            ) : null}
          </Link>
        ))}
      </div>
    </ScrollArea>
  );
}

function getBadgeVariantFromLabel(
  label: string,
): ComponentProps<typeof Badge>["variant"] {
  if (["work"].includes(label.toLowerCase())) {
    return "default";
  }

  if (["personal"].includes(label.toLowerCase())) {
    return "outline";
  }

  return "secondary";
}
