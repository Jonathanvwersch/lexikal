import { ContextType } from "@/generated/types.gen";
import {
  FileText,
  Link,
  MessageSquareQuote,
  NotebookTabs,
  Quote,
  LucideIcon,
} from "lucide-react";

export const RESOURCE_ICON_MAP = {
  notebook: NotebookTabs,
  context: {
    parent: MessageSquareQuote,
    child: Quote,
  },
};

export const CONTEXT_TYPE_MAP: Record<ContextType, LucideIcon> = {
  pdf: FileText,
  external_url: Link,
  free_form_text: FileText,
};
