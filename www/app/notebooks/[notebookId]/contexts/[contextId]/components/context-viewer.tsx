"use client";

import { useState, useRef } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, FileText } from "lucide-react";
import { ContextSideSheet } from "../../../components/context-side-sheet";
import { useCacheQuery } from "@/hooks/use-cache-query";
import { queryKeys } from "@/react-query/keys";
import { ContextGetResponse } from "@/generated/types.gen";

type Props = Readonly<{
  notebookId: string;
  contextId: string;
  citation?: {
    pageNumber: number;
    text?: string;
  };
}>;

export function ContextViewer({ notebookId, contextId, citation }: Props) {
  const [numPages, setNumPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(
    citation?.pageNumber || 1
  );
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const contextData = useCacheQuery<ContextGetResponse>(
    queryKeys.contexts.get(notebookId, contextId)
  );

  return (
    <div className="max-w-[1000px] mx-auto">
      <Card className="w-full mx-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-2 flex-1">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <div>
              <CardTitle>{contextData?.name}</CardTitle>
              {contextData?.description && (
                <CardDescription>{contextData.description}</CardDescription>
              )}
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsViewerOpen(true)}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {/* Placeholder for topics */}
          <div className="flex flex-wrap gap-2">
            <div className="bg-muted text-muted-foreground text-sm px-3 py-1 rounded-full">
              Topics coming soon
            </div>
          </div>
        </CardContent>
      </Card>

      <ContextSideSheet
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        title={contextData?.name}
        url={contextData?.url}
        page={currentPage}
      />
    </div>
  );
}
