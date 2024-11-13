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
import omit from "lodash.omit";

import { SidebarMenuAction } from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import { useCallback } from "react";
import { useState } from "react";
import { usePostContextMetadata } from "@/react-query/contexts";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/react-query/keys";
import { ContextsGetResponse } from "@/generated/types.gen";
import { updateContextCache } from "@/react-query/updaters/contexts";
import { postChunkContext } from "@/api/client/contexts";
import { uploadFileToSupabase } from "@/api/client/storage";

export function AddContext() {
  const [files, setFiles] = useState<File[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const params = useParams();
  const notebookId = params.notebookId as string;
  const [uploadingFile, setUploadingFile] = useState(false);
  const queryClient = useQueryClient();

  const handleClose = () => {
    setOpen(false);
    setFiles([]);
    setName("");
    setDescription("");
  };

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
          await uploadFileToSupabase(file, signedUploadUrl);
        } catch (error) {
          console.error("Upload error:", error);
        } finally {
          await postChunkContext({
            path: { notebook_id: notebookId, context_id: context.id },
          });
          updateContextCache(queryClient, notebookId, context);
          setUploadingFile(false);
          handleClose();
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
        originalFileName: files[0].name,
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
              required
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
