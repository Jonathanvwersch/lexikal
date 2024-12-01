"use client";

import { Document, Page, pdfjs } from "react-pdf";
import { Loader2 } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { cn } from "@/utils/styles";

if (typeof Promise.withResolvers === "undefined") {
  if (window)
    // @ts-expect-error This does not exist outside of polyfill which this is doing
    window.Promise.withResolvers = function () {
      let resolve, reject;
      const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      return { promise, resolve, reject };
    };
}

// Use worker from the installed package
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function highlightPattern(text: string, pattern?: string) {
  if (!pattern) return text;
  console.log({ text, pattern });
  if (text.includes(pattern)) {
    console.log("YOLO", { text, pattern });
  }
  return text.replace(pattern, (value) => `<mark>${value}</mark>`);
}

type Props = Readonly<{
  url: string;
  pageNumber?: number;
  highlightText?: string;
}>;

export const PdfViewer = ({ url, pageNumber, highlightText }: Props) => {
  const [numPages, setNumPages] = useState<number>();
  const [isLoading, setIsLoading] = useState(true);
  const pdfContainerRef = useRef<HTMLDivElement>(null);
  console.log({ highlightText });
  const handleLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);

    // If a page number is specified, scroll to it after a short delay
    if (pageNumber && pdfContainerRef.current) {
      setTimeout(() => {
        const pageElement = document.querySelector(
          `[data-page-number="${pageNumber}"]`
        );
        if (pageElement) {
          pageElement.scrollIntoView({ behavior: "instant" });
        }
      }, 100);
    }
  };
  const textRenderer = useCallback(
    (textItem: any) => highlightPattern(textItem.str, highlightText),
    [highlightText]
  );

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center h-full w-full">
          <Loader2 className="animate-spin" />
        </div>
      )}
      <div
        ref={pdfContainerRef}
        className={cn("pdf-container", isLoading && "hidden")}
      >
        <Document
          file={url}
          onLoadSuccess={handleLoadSuccess}
          onLoadError={(error) => {
            console.error("Error loading PDF:", error);
          }}
          onSourceError={(error) => {
            console.error("Error loading PDF source:", error);
          }}
          className="flex flex-col items-center"
        >
          {numPages &&
            Array.from(new Array(numPages), (_, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                data-page-number={index + 1}
                width={800}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                customTextRenderer={textRenderer}
              />
            ))}
        </Document>
      </div>
    </>
  );
};
