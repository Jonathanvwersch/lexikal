"use client";

import { Layers3, StickyNote } from "lucide-react";
import { MenuParentItem } from "../menu/menu-parent-item";
import { MenuItem } from "../menu/menu-item";
import { useParams, usePathname } from "next/navigation";
import { CreateFlashcardDecks } from "./create-flashcard-decks";
import { NotebookParams } from "@/app/notebooks/[notebookId]/types";

const mockInitialContexts = [];

export function FlashcardsDecksMenu() {
  const params = useParams() as NotebookParams;
  const basePath = `/notebooks/${params.notebookId}/flashcard-decks`;

  return (
    <MenuParentItem
      href={basePath}
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
              href={`${basePath}/${context.id}`}
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
