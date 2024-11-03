import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export function CreateNotebook() {
  return (
    <Link
      href="/notebooks/new"
      className="h-48 rounded-lg shadow-md border flex items-center justify-center flex-col gap-2"
    >
      <Button
        variant="ghost"
        className="rounded-lg flex h-full w-full items-center justify-center flex-col gap-2"
      >
        <PlusIcon className="w-8 h-8" />
        <p className="text-md text-muted-foreground">Create notebook</p>
      </Button>
    </Link>
  );
}
