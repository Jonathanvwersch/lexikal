import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/utils/styles";

type Props = Readonly<{
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled: boolean;
  className?: string;
}>;

export const ChatInput = ({
  value,
  onChange,
  placeholder,
  className,
  disabled,
}: Props) => {
  return (
    <Textarea
      autoComplete="off"
      name="message"
      className={cn(
        "min-h-10 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0",
        className,
        "max-h-12 px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-full flex items-center h-16"
      )}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};
