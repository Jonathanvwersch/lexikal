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
import FileDropzone from "@/components/ui/file-dropzone";

import { SidebarMenuAction } from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import { useCallback } from "react";
import { useState } from "react";

export function AddContext() {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = useCallback((files: File[]) => {
    setFiles(files);
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SidebarMenuAction>
          <Plus /> <span className="sr-only">Add</span>
        </SidebarMenuAction>
      </DialogTrigger>
      <DialogContent className="md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Contexts</DialogTitle>
          <DialogDescription>
            Contexts allow Lexikal to understand the information you care about.
            You can use our AI to query your contexts and ask questions about
            them, create flashcards, study guides, and more. Examples include:
            notes from your lecture, ebooks, blog posts, research papers, etc.
          </DialogDescription>
        </DialogHeader>
        <FileDropzone
          onFileChange={handleFileChange}
          files={files}
          acceptedFileTypes={["application/pdf", "application/text"]}
        />
        <DialogFooter>
          <Button type="submit">Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
