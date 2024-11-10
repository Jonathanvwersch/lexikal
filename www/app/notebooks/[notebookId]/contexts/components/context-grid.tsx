import { ReactNode } from "react";

type Props = Readonly<{
  children: ReactNode;
}>;

export default function ContextGrid({ children }: Props) {
  return (
    <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(192px,1fr))] gap-4 items-center justify-center">
      {children}
    </div>
  );
}
