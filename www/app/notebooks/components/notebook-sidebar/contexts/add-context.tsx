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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { SidebarMenuAction } from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import { useCallback } from "react";
import { useState } from "react";
import { usePostContextMetadata } from "@/api/contexts";
import { useParams } from "next/navigation";

export function AddContext() {
  const [files, setFiles] = useState<File[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const params = useParams();
  const notebookId = params.notebookId as string;
  const [uploadingFile, setUploadingFile] = useState(false);

  const { mutate: postContextMetadata, isPending: isUploadingMetadata } =
    usePostContextMetadata({
      onSuccess: async (context) => {
        const signedUploadUrl = context?.signedUploadUrl;
        const file = files[0];

        if (!signedUploadUrl || !file) {
          return;
        }
        setUploadingFile(true);

        try {
          const response = await fetch(signedUploadUrl, {
            method: "PUT",
            headers: {
              "Content-Type": file.type,
            },
            body: file,
          });

          if (!response.ok) {
            throw new Error("File upload failed");
          }

          console.log("File uploaded successfully");
        } catch (error) {
          console.error("Upload error:", error);
        } finally {
          setUploadingFile(false);
          setOpen(false);
        }
      },
    });

  const handleFileChange = useCallback((files: File[]) => {
    setFiles(files);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postContextMetadata({
      path: { notebook_id: notebookId },
      body: {
        name,
        description,
        type: "pdf",
      },
    });
  };

  const isUploading = isUploadingMetadata || uploadingFile;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SidebarMenuAction>
          <Plus /> <span className="sr-only">Add</span>
        </SidebarMenuAction>
      </DialogTrigger>
      <DialogContent className="md:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Contexts</DialogTitle>
            <DialogDescription>
              Contexts allow Lexikal to understand the information you care
              about. You can use our AI to query your contexts and ask questions
              about them, create flashcards, study guides, and more. Examples
              include: notes from your lecture, ebooks, blog posts, research
              papers, etc.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">*Name</Label>
              <Input
                required
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter context name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter context description"
              />
            </div>
            <FileDropzone
              onFileChange={handleFileChange}
              files={files}
              acceptedFileTypes={["application/pdf"]}
            />
          </div>
          <DialogFooter className="mt-4">
            <Button isLoading={isUploading} type="submit">
              Add
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
