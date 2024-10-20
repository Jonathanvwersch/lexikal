import * as React from "react";
import { useCallback, useState } from "react";
import { UploadCloud, X, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Props {
  files: File[];
  onFileChange: (files: File[]) => void;
  acceptedFileTypes?: string[];
  maxFileSize?: number; // in bytes
  maxFiles?: number;
  multiple?: boolean;
}

export default function FileDropzone({
  files,
  onFileChange,
  acceptedFileTypes = ["image/*"],
  maxFileSize = 5 * 1024 * 1024, // 5MB
  maxFiles = 5,
  multiple = true,
}: Props) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(
    (newFiles: FileList | File[]) => {
      setError(null);
      const validFiles: File[] = [];

      Array.from(newFiles).forEach((file) => {
        if (!acceptedFileTypes.some((type) => file.type.match(type))) {
          setError(`File type not accepted: ${file.name}`);
          return;
        }
        if (file.size > maxFileSize) {
          setError(`File too large: ${file.name}`);
          return;
        }
        if (files.length + validFiles.length >= maxFiles) {
          setError(`Maximum number of files reached (${maxFiles})`);
          return;
        }
        validFiles.push(file);
      });

      if (validFiles.length) {
        const newFileList = multiple ? [...files, ...validFiles] : validFiles;
        onFileChange(newFileList);
      }
    },
    [files, acceptedFileTypes, maxFileSize, maxFiles, multiple, onFileChange]
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = "copy";
    }
    setDragActive(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles]
  );

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        handleFiles(e.target.files);
      }
    },
    [handleFiles]
  );

  const removeFile = useCallback(
    (fileToRemove: File) => {
      onFileChange(files.filter((file) => file !== fileToRemove));
    },
    [files, onFileChange]
  );

  return (
    <Card
      className={`mx-auto flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg transition-colors ${
        dragActive ? "border-primary" : "border-input"
      } hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
    >
      <CardContent>
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => document.getElementById("fileInput")?.click()}
          tabIndex={0}
          role="button"
          className="flex items-center flex-col justify-center"
        >
          <UploadCloud className="w-10 h-10 mb-4 text-muted-foreground" />
          <Label
            htmlFor="fileInput"
            className="text-sm text-muted-foreground cursor-pointer"
          >
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </Label>
          <p className="text-xs text-muted-foreground mt-2">
            {acceptedFileTypes.join(", ")} (Max file size:{" "}
            {maxFileSize / 1024 / 1024}MB)
          </p>
          <Input
            id="fileInput"
            type="file"
            multiple={multiple}
            className="hidden"
            onChange={onInputChange}
            accept={acceptedFileTypes.join(",")}
          />
        </div>
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {files.length > 0 && (
          <ScrollArea className="h-32 w-full rounded-md border p-4 mt-4">
            {files.map((file, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="mr-2 mb-2 pr-1.5 text-xs font-normal"
              >
                {file.name}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1 p-0"
                  onClick={() => removeFile(file)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove</span>
                </Button>
              </Badge>
            ))}
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
