"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import dynamic from "next/dynamic";
import { ContextSideSheetArgs } from "../types";

const PdfViewer = dynamic(
  () => import("@/components/contexts/pdf-viewer").then((mod) => mod.PdfViewer),
  {
    ssr: false,
  }
);

type Props = Readonly<
  {
    isOpen: boolean;
    onClose: () => void;
  } & Partial<ContextSideSheetArgs>
>;

export function ContextSideSheet({
  isOpen,
  onClose,
  url,
  title,
  page,
  originalText,
}: Props) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-[95%] sm:w-[90%] lg:w-[75%] xl:w-[65%] overflow-y-auto !max-w-full"
      >
        {title && (
          <SheetHeader className="mb-4">
            <SheetTitle>{title}</SheetTitle>
          </SheetHeader>
        )}
        {url && (
          <PdfViewer url={url} pageNumber={page} highlightText={originalText} />
        )}
      </SheetContent>
    </Sheet>
  );
}
