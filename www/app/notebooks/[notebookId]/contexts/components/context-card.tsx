import { CONTEXT_TYPE_MAP, RESOURCE_ICON_MAP } from "@/app/notebooks/constants";
import { ContextsGetResponse } from "@/generated/types.gen";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = Readonly<ContextsGetResponse["contexts"][number]>;

export function ContextCard({
  name,
  id,
  description,
  originalFileName,
}: Props) {
  const pathname = usePathname();
  return (
    <Link
      href={`${pathname}/${id}`}
      className="h-48 bg-card rounded-lg shadow-md p-4 border flex flex-col justify-between"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <RESOURCE_ICON_MAP.context.child className="w-[16px] h-[16px] min-h-[16px] min-w-[16px]" />
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
        <CONTEXT_TYPE_MAP[type] className="w-[16px] h-[16px] min-h-[16px] min-w-[16px]" />
        <p className="text-[10px] text-muted-foreground">{originalFileName}</p>
      </div>
    </Link>
  );
}
