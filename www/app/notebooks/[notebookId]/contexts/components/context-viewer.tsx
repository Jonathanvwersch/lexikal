"use client";

import { useGetContextFile } from "@/react-query/contexts";
import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Set the worker source
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();
const base64toBlob = (data: string) => {
  const base64WithoutPrefix = data.substr(
    "data:application/pdf;base64,".length
  );

  const bytes = atob(base64WithoutPrefix);
  let length = bytes.length;
  let out = new Uint8Array(length);

  while (length--) {
    out[length] = bytes.charCodeAt(length);
  }

  return new Blob([out], { type: "application/pdf" });
};

type Props = Readonly<{
  notebookId: string;
  contextId: string;
}>;

export function ContextViewer({ notebookId, contextId }: Props) {
  const [numPages, setNumPages] = useState<number>();
  const { data: file, isLoading } = useGetContextFile({
    notebookId,
    contextId,
  });

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  if (isLoading) return <div>Loading...</div>;
  if (!file) return <div>No file found</div>;

  const blob = base64toBlob(file?.content);
  const url = URL.createObjectURL(blob);

  return (
    <div className="w-full h-full overflow-auto">
      <Document
        file={url}
        onLoadSuccess={handleDocumentLoadSuccess}
        className="flex flex-col items-center"
      >
        {numPages &&
          Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={800}
              renderTextLayer={true}
              renderAnnotationLayer={true}
            />
          ))}
      </Document>
    </div>
  );
}
