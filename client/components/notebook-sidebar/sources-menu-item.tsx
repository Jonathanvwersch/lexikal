import { MessageSquareQuote } from "lucide-react";
import { MenuParentItem } from "./menu-parent-item";

export function SourcesMenuItem() {
  return (
    <div>
      <MenuParentItem
        href="/sources"
        Icon={MessageSquareQuote}
        label="Sources"
      />
      <div className="flex flex-col gap-2"></div>
    </div>
  );
}
