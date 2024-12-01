import { ChatMessageSource, ContextGetResponse } from "@/generated/types.gen";
import { ContextSideSheetArgs } from "../../../[notebookId]/types";

export function formatMessageWithCitations(
  content: string,
  sources: ChatMessageSource[],
  contexts: ContextGetResponse[],
  onCitationClick: (args: ContextSideSheetArgs) => void
) {
  const parts = content.split(/(\[\d+\])/);
  return parts.map((part, index) => {
    const match = part.match(/\[(\d+)\]/);
    if (match) {
      const citation = parseInt(match[1]);
      const source = sources[citation];
      const context = contexts.find((c) => c.id === source.context_id);
      console.log({ citation, source, context });
      return (
        <button
          key={index}
          onClick={() =>
            onCitationClick({
              url: context?.url ?? "",
              title: context?.name ?? "",
              page: source.metadata.page,
              originalText: source.content,
            })
          }
          className="text-blue-500 hover:text-blue-700 font-medium"
        >
          {part}
        </button>
      );
    }
    return part;
  });
}
