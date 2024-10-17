import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVerticalIcon, NotebookTabs } from "lucide-react";
import Link from "next/link";
import { useCallback } from "react";
import { formatDistanceToNow } from "date-fns";
import { Notebook } from "@/types/notebooks";

type Props = Readonly<
  {
    onEdit: () => void;
    onDelete: () => void;
  } & Notebook
>;

export function NotebookCard({
  name,
  id,
  onEdit,
  onDelete,
  lastEdited,
  description,
}: Props) {
  const handleEdit = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      onEdit();
    },
    [onEdit]
  );

  const handleDelete = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      onDelete();
    },
    [onDelete]
  );

  return (
    <Link
      href={`/notebooks/${id}`}
      className=" h-48 bg-card rounded-lg shadow-md p-4 border flex flex-col justify-between"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <NotebookTabs className="w-[16px] h-[16px] min-h-[16px] min-w-[16px]" />
          <h3 className="text-md font-medium overflow-hidden text-ellipsis whitespace-nowrap">
            {name}
          </h3>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs text-muted-foreground line-clamp-3	">
            {description}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-[10px] text-muted-foreground">
          Last edited{" "}
          {formatDistanceToNow(new Date(lastEdited), { addSuffix: true })}
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisVerticalIcon className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <Link href={`/notebooks/edit/${id}`}>
                <DropdownMenuItem>Edit</DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Link>
  );
}
