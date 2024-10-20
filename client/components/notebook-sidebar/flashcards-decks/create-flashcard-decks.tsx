import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { SidebarMenuAction } from "@/components/ui/sidebar";
import { Plus } from "lucide-react";

export function CreateFlashcardDecks() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <SidebarMenuAction>
          <Plus /> <span className="sr-only">Add</span>
        </SidebarMenuAction>
      </DialogTrigger>
      <DialogContent className="md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Flashcard Decks</DialogTitle>
          <DialogDescription>...</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
