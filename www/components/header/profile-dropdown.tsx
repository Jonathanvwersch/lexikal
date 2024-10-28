import { memo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { User } from "lucide-react";
import Link from "next/link";
import { SignOut } from "./sign-out";
import { getAuthUser } from "@/utils/user/server";

async function _ProfileDropdown() {
  const userMetadata = await getAuthUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="w-7 h-7">
          <AvatarImage src={userMetadata?.avatar_url} alt={""} />
          <AvatarFallback>{userMetadata?.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-ellipsis overflow-hidden whitespace-nowrap">
            {userMetadata?.name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/settings">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <SignOut />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const ProfileDropdown = memo(_ProfileDropdown);
