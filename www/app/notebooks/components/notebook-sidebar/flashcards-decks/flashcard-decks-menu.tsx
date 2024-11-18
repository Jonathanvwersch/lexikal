"use client";

import { Layers3, StickyNote } from "lucide-react";
import { MenuParentItem } from "../menu/menu-parent-item";
import { MenuItem } from "../menu/menu-item";
import { usePathname } from "next/navigation";
import { CreateFlashcardDecks } from "./create-flashcard-decks";

const mockInitialContexts = [
  {
    id: "1",
    name: "Flashcard Deck 1",
    type: "url",
  },
  {
    id: "2",
    name: "Flashcard Deck 2",
    type: "file",
  },
  {
    id: "3",
    name: "Flashcard Deck 3",
    type: "text",
  },
];

export function FlashcardsDecksMenu() {
  const pathname = usePathname();

  return (
    <MenuParentItem
      href={`${pathname}/flashcards-decks`}
      Icon={Layers3}
      label="Flashcard Decks"
      AddComponent={<CreateFlashcardDecks />}
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
