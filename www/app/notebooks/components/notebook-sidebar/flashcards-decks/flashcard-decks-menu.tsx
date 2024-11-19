"use client";

import { Layers3, StickyNote } from "lucide-react";
import { MenuParentItem } from "../menu/menu-parent-item";
import { MenuItem } from "../menu/menu-item";
import { usePathname } from "next/navigation";
import { CreateFlashcardDecks } from "./create-flashcard-decks";

const mockInitialContexts = [];

export function FlashcardsDecksMenu() {
  const pathname = usePathname();

  return (
    <MenuParentItem
      href={`${pathname}/flashcards-decks`}
      Icon={Layers3}
      label="Flashcard Decks"
      AddComponent={<CreateFlashcardDecks />}
      emptyMessage="No flashcard decks found"
    >
      {mockInitialContexts.length ? (
        <>
          {mockInitialContexts.map((context) => (
            <MenuItem
              key={context.id}
              href={`${pathname}/flashcards-decks/${context.id}`}
              Icon={StickyNote}
              label={context.name}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          ))}
        </>
      ) : null}
    </MenuParentItem>
  );
}
