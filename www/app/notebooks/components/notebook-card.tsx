import { NotebookGetResponse } from "@/generated/types.gen";
import Link from "next/link";
import { RESOURCE_ICON_MAP } from "../constants";

type Props = Readonly<NotebookGetResponse>;

export function NotebookCard({ name, id, updatedAt, description }: Props) {
  return (
    <Link
      href={`/notebooks/${id}`}
      className="h-48 bg-card rounded-lg shadow-md p-4 border flex flex-col justify-between"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <RESOURCE_ICON_MAP.notebook className="w-[16px] h-[16px] min-h-[16px] min-w-[16px]" />
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
          {/* Last edited {formatDistanceToNow(updatedAt)} ago */}
        </p>
        {/* <DropdownMenu>
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
        </DropdownMenu> */}
      </div>
    </Link>
  );
}
