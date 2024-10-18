import { Zap } from "lucide-react";
import { MenuParentItem } from "./menu-parent-item";

export function FlashcardsMenuItem() {
  return (
    <div>
      <MenuParentItem href="/flashcards" Icon={Zap} label="Flashcard decks" />
      <div className="flex flex-col gap-2"></div>
    </div>
  );
}
