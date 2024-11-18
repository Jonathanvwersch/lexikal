import { useCallback } from "react";
import { Button } from "../../../../components/ui/button";
import { SendHorizontal } from "lucide-react";
import { useKeyPress } from "@/hooks/use-key-press";

type Props = Readonly<{ onSend: () => void; disabled: boolean }>;

export function NotebookChatSendButton({ onSend, disabled }: Props) {
  const handleSend = useCallback(
    (e?: React.MouseEvent | KeyboardEvent) => {
      e?.preventDefault();
      onSend();
    },
    [onSend]
  );

  useKeyPress("Enter", handleSend);

  return (
    <Button
      size="icon"
      variant="outline"
      className="ml-auto gap-1.5"
      onClick={handleSend}
      disabled={disabled}
    >
      <SendHorizontal className="size-3.5" />
    </Button>
  );
}
