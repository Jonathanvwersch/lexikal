import { ContextsGetResponse } from "@/generated/types.gen";

import omit from "lodash.omit";

import { queryKeys } from "../keys";
import { QueryClient } from "@tanstack/react-query";

export function updateContextCache(
  queryClient: QueryClient,
  notebookId: string,
  context: ContextsGetResponse["contexts"][number]
) {
  queryClient.setQueryData<ContextsGetResponse>(
    queryKeys.contexts.get(notebookId),
    (oldData) => {
      const newContext = omit(context, "signedUpload");
      return {
        contexts: oldData ? [...oldData.contexts, newContext] : [newContext],
      };
    }
  );
}
