import { useCallback } from "react";
import { Button } from "../../../../components/ui/button";
import { SendHorizontal } from "lucide-react";

type Props = Readonly<{ onSend: () => void }>;

export function NotebookChatSendButton({ onSend }: Props) {
  const handleSend = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      onSend();
    },
    [onSend]
  );

  return (
    <Button
      size="icon"
      variant="outline"
      className="ml-auto gap-1.5"
      onClick={handleSend}
    >
      <SendHorizontal className="size-3.5" />
    </Button>
  );
}
