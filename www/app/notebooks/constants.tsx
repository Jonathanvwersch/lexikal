import { ContextType } from "@/generated/types.gen";
import { Icon } from "lucide-react";
import {
  FileText,
  Link,
  MessageSquareQuote,
  NotebookTabs,
  Quote,
} from "lucide-react";

export const RESOURCE_ICON_MAP = {
  notebook: NotebookTabs,
  context: {
    parent: MessageSquareQuote,
    child: Quote,
  },
};

export const CONTEXT_TYPE_MAP: Record<ContextType, React.ComponentType<any>> = {
  pdf: FileText,
  external_url: Link,
  free_form_text: FileText,
};
