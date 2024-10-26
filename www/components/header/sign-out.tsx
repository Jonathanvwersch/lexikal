"use client";

import { DropdownMenuItem } from "../ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { handleSignOut } from "@/utils/auth";

export function SignOut() {
  return (
    <DropdownMenuItem onClick={handleSignOut}>
      <LogOut className="mr-2 h-4 w-4" />
      <span>Log out</span>
    </DropdownMenuItem>
  );
}
