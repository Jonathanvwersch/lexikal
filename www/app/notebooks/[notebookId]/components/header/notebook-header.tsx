import {
  HeaderWrapper,
  HeaderLeftWrapper,
  HeaderRightWrapper,
} from "@/components/header/header";
import { ProfileDropdown } from "@/components/header/profile-dropdown";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NotebookBreadcrumbs } from "./notebook-breadcrumbs";

type Props = Readonly<{
  notebookId: string;
}>;

export function NotebookHeader({ notebookId }: Props) {
  return (
    <HeaderWrapper className="py-[18px]">
      <HeaderLeftWrapper>
        <SidebarTrigger size="icon" />
        <NotebookBreadcrumbs notebookId={notebookId} />
      </HeaderLeftWrapper>
      <HeaderRightWrapper>
        <ProfileDropdown />
      </HeaderRightWrapper>
    </HeaderWrapper>
  );
}
