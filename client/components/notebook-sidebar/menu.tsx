import { ScrollArea } from "@/components/ui/scroll-area";

import { SourcesMenuItem } from "./sources-menu-item";
import { FlashcardsMenuItem } from "./flashcards-menu-item";

export function Menu() {
  return (
    <ScrollArea className="[&>div>div[style]]:!block mt-5 flex-grow">
      <nav className="h-full w-full flex flex-col gap-3">
        <SourcesMenuItem />
        <FlashcardsMenuItem />
      </nav>
    </ScrollArea>
  );
}
